<?php
session_start(); // Inicia a sessão
require_once 'conexao.php';

$errors = [
    'password' => '',
    'general' => ''
];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $senhaAtual = trim($_POST['senhaAtual']);
    $novaSenha = trim($_POST['novaSenha']);
    $userId = $_SESSION['user_id']; // Obtém o ID do usuário da sessão

    if (empty($senhaAtual) || empty($novaSenha)) {
        $errors['password'] = "Todos os campos são obrigatórios.";
    }

    if (empty($errors['password'])) {
        // Verifica se a senha atual está correta
        $sql = "SELECT password FROM users WHERE user_id = ?";
        $stmt = $conexao->prepare($sql);

        if ($stmt === false) {
            $errors['general'] = "Erro ao preparar a consulta: " . $conexao->error;
        } else {
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                if (password_verify($senhaAtual, $user['password'])) {
                    // Atualiza a senha no banco de dados
                    $senhaHash = password_hash($novaSenha, PASSWORD_BCRYPT);

                    $sqlUpdate = "UPDATE users SET password = ? WHERE user_id = ?";
                    $stmtUpdate = $conexao->prepare($sqlUpdate);
                    $stmtUpdate->bind_param("si", $senhaHash, $userId);
                    $stmtUpdate->execute();

                    echo json_encode(['success' => true]);
                    exit();
                } else {
                    $errors['password'] = "A senha atual está incorreta.";
                }
            }

            $stmt->close();
        }
    }

    $conexao->close();
}

echo json_encode(['success' => false, 'errors' => $errors]);

?>