<?php
session_start(); // Inicia a sessão
require_once 'conexao.php'; // Inclui a conexão com o banco de dados

$errors = ['email' => '', 'password' => '', 'general' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $senhaAtual = trim($_POST['senhaAtual']);
    $novaSenha = trim($_POST['novaSenha']);
    $userId = $_SESSION['user_id']; // Obtém o ID do usuário da sessão

    // Validação
    if (empty($username)) {
        $errors['general'] = "O campo de nome é obrigatório.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Por favor, insira um endereço de e-mail válido.";
    }
    if (empty($senhaAtual)) {
        $errors['password'] = "O campo de senha atual é obrigatório.";
    }

    // Verifica se existem erros
    if (empty(array_filter($errors))) {
        // Verifica se a senha atual está correta
        $sql = "SELECT password FROM users WHERE user_id = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($senhaAtual, $user['password'])) {
                // Atualiza o nome e o email
                $sqlUpdate = "UPDATE users SET username = ?, email = ? WHERE user_id = ?";
                $stmtUpdate = $conexao->prepare($sqlUpdate);
                $stmtUpdate->bind_param("ssi", $username, $email, $userId);
                $stmtUpdate->execute();

                // Atualiza a senha se nova senha for fornecida
                if (!empty($novaSenha)) {
                    $senhaHash = password_hash($novaSenha, PASSWORD_BCRYPT);
                    $sqlUpdatePassword = "UPDATE users SET password = ? WHERE user_id = ?";
                    $stmtUpdatePassword = $conexao->prepare($sqlUpdatePassword);
                    $stmtUpdatePassword->bind_param("si", $senhaHash, $userId);
                    $stmtUpdatePassword->execute();
                }

                echo json_encode(['success' => true]);
                exit();
            } else {
                $errors['password'] = "A senha atual está incorreta.";
            }
        }
    }

    $conexao->close();
}

echo json_encode(['success' => false, 'errors' => $errors]);
?>
