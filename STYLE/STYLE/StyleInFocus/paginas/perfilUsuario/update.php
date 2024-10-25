<?php
session_start();
require_once 'conexao.php';

if (!isset($_SESSION['user_id'])) {
    die("Usuário não autenticado");
}

$userId = $_SESSION['user_id'];
$username = $_POST['username'];
$email = $_POST['email'];
$novaSenha = $_POST['novaSenha'];
$senhaAtual = $_POST['senhaAtual'];

// Verifique a senha atual antes de atualizar
$sql = "SELECT password FROM users WHERE user_id = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user || !password_verify($senhaAtual, $user['password'])) {
    die(json_encode(['success' => false, 'errors' => ['password' => 'Senha atual incorreta.']]));
}

// Se a nova senha estiver preenchida, atualize-a
if (!empty($novaSenha)) {
    $novaSenhaHash = password_hash($novaSenha, PASSWORD_DEFAULT);
    $sql = "UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("sssi", $username, $email, $novaSenhaHash, $userId);
} else {
    $sql = "UPDATE users SET username = ?, email = ? WHERE user_id = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("ssi", $username, $email, $userId);
}

// Executar a atualização
if ($stmt->execute()) {
    // Processar o upload da foto de perfil
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] == 0) {
        $foto = $_FILES['foto'];
        $fotoPath = 'perfilUsuario/uploads/' . basename($foto['name']);
        
        // Mover o arquivo para o diretório de uploads
        if (move_uploaded_file($foto['tmp_name'], $fotoPath)) {
            // Atualiza o caminho da foto no banco de dados
            $sqlFoto = "UPDATE users SET foto_perfil = ? WHERE user_id = ?";
            $stmtFoto = $conexao->prepare($sqlFoto);
            $stmtFoto->bind_param("si", $fotoPath, $userId);
            $stmtFoto->execute();
        }
    }

    // Responder ao cliente
    $response = [
        'success' => true,
        'message' => "Informações atualizadas com sucesso!"
    ];
    echo json_encode($response);
} else {
    // Resposta de erro
    $response = [
        'success' => false,
        'message' => "Erro ao atualizar informações."
    ];
    echo json_encode($response);
}
?>