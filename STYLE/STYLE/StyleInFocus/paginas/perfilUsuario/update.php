<?php
session_start();
include 'db.php';

$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    header("Location: login.php");
    exit();
}

// Carregar dados do usuário
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT username, email, profile_image FROM users WHERE user_id = :user_id");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
}

// Atualizar dados do usuário
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $senhaAtual = $_POST['senhaAtual'];
    $novaSenha = !empty($_POST['novaSenha']) ? password_hash($_POST['novaSenha'], PASSWORD_BCRYPT) : null;

    // Verificar senha atual
    $stmt = $conn->prepare("SELECT password FROM users WHERE user_id = :user_id");
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!password_verify($senhaAtual, $user['password'])) {
        echo "Senha atual incorreta!";
        exit();
    }

    // Atualizar imagem de perfil
    $profile_image = $user['profile_image'];
    if (!empty($_FILES['foto']['name'])) {
        $imagePath = 'uploads/' . basename($_FILES['foto']['name']);
        if (move_uploaded_file($_FILES['foto']['tmp_name'], $imagePath)) {
            $profile_image = $imagePath;
        }
    }

    // Atualizar informações no banco
    $query = "UPDATE users SET username = :username, email = :email, profile_image = :profile_image";
    if ($novaSenha) {
        $query .= ", password = :password";
    }
    $query .= " WHERE user_id = :user_id";

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':profile_image', $profile_image);
    if ($novaSenha) {
        $stmt->bindParam(':password', $novaSenha);
    }
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();

    echo "Informações atualizadas com sucesso!";
    header("Location: edit_profile.php"); // Redireciona para recarregar os dados
}
?>
