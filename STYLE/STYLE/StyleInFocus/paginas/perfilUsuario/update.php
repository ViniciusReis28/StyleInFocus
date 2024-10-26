<?php
session_start();
include 'conexao.php'; // Inclua o arquivo de conexão MySQLi

// Verifica se o usuário está logado
$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(['success' => false, 'error' => 'Usuário não está logado.']);
    exit();
}

// Carregar dados do usuário
$query = "SELECT username, email, profile_image FROM users WHERE user_id = ?";
$stmt = $conexao->prepare($query);
$stmt->bind_param("i", $user_id); // 'i' para indicar que o parâmetro é um inteiro

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // Verificar se o usuário existe
    if (!$user) {
        header("Location: login.php"); // Redirecionar para login se o usuário não for encontrado
        exit();
    }

    // Armazenar os dados em variáveis
    $username = htmlspecialchars($user['username']);
    $email = htmlspecialchars($user['email']);
    $profile_image = !empty($user['profile_image']) ? htmlspecialchars($user['profile_image']) : '../../img/usuarioDefault.jpg';
}


// Atualizar dados do usuário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $senhaAtual = $_POST['senhaAtual'];
    $novaSenha = !empty($_POST['novaSenha']) ? password_hash($_POST['novaSenha'], PASSWORD_BCRYPT) : null;

    // Verificar senha atual
    $stmt = $conexao->prepare("SELECT password FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!$user || !password_verify($senhaAtual, $user['password'])) {
        echo json_encode(['success' => false, 'error' => 'Senha atual incorreta!']);
        exit();
    }

    // Atualizar a imagem de perfil se uma nova imagem for enviada
    if (!empty($_FILES['foto']['name'])) {
        $target_dir = "uploads/"; // Diretório onde as imagens serão salvas
        $target_file = $target_dir . basename($_FILES['foto']['name']);
        $uploadOk = 1;

        // Verifica se a imagem é realmente uma imagem
        $check = getimagesize($_FILES['foto']['tmp_name']);
        if ($check === false) {
            echo json_encode(['success' => false, 'error' => 'O arquivo não é uma imagem.']);
            $uploadOk = 0;
        }

        // Verifica se houve erro no upload
        if ($_FILES['foto']['error'] !== UPLOAD_ERR_OK) {
            echo json_encode(['success' => false, 'error' => 'Erro ao fazer upload da imagem.']);
            $uploadOk = 0;
        }

        // Se tudo estiver ok, tenta fazer o upload da imagem
        if ($uploadOk) {
            if (move_uploaded_file($_FILES['foto']['tmp_name'], $target_file)) {
                $profile_image = $target_file; // Atualiza o caminho da imagem
            } else {
                echo json_encode(['success' => false, 'error' => 'Desculpe, houve um erro ao fazer o upload da imagem.']);
                exit();
            }
        }
    }

    // Atualizar informações no banco
    $query = "UPDATE users SET username = ?, email = ?, profile_image = ?";
    if ($novaSenha) {
        $query .= ", password = ?";
    }
    $query .= " WHERE user_id = ?";

    $stmt = $conexao->prepare($query);

    // Vincula os parâmetros
    if ($novaSenha) {
        $stmt->bind_param("ssssi", $username, $email, $profile_image, $novaSenha, $user_id); // 'ssssi' indica string, string, string, string, integer
    } else {
        $stmt->bind_param("ssi", $username, $email, $profile_image, $user_id); // 'ssi' indica string, string, integer
    }

    if ($stmt->execute()) {
        // Redireciona para a página userEditado.html
        header("Location: userEditado.html");
        exit(); // Importante
    } else {
     
        echo json_encode(['success' => false, 'error' => 'Erro ao atualizar informações.']);
    }
    
    exit();
}
?>
