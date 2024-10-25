<?php
session_start();
require_once 'conexao.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuário não autenticado']);
    exit();
}

$userId = $_SESSION['user_id'];
$sql = "SELECT username, email, foto FROM users WHERE user_id = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    echo json_encode([
        'success' => true,
        'username' => $user['username'],
        'email' => $user['email'],
        'foto' => $user['foto'] // Retorna o caminho da foto
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuário não encontrado']);
}

$conexao->close();
?>
