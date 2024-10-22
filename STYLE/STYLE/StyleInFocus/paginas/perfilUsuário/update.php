<?php
// Conexão com o banco de dados
include 'conexao.php'; // arquivo que contém a conexão com o banco

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebendo os dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];

    // Aqui você pode usar o ID do usuário logado, por exemplo, através de uma sessão
    $id_usuario = 1; // Apenas como exemplo

    // Atualizando os dados no banco de dados
    $sql = "UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $nome, $email, $telefone, $id_usuario);

    if ($stmt->execute()) {
        echo "Dados atualizados com sucesso!";
        // Redireciona para a página de perfil atualizada
        header("Location: perfil.php");
        exit();
    } else {
        echo "Erro ao atualizar os dados: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>