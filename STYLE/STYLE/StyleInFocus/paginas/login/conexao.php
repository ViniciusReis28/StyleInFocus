<?php
$localhost = "localhost";
$usuario = "root";
$senha = "";
$db = "login";

// Conexão ao banco de dados
$conexao = new mysqli($localhost, $usuario, $senha, $db);

// Verificar conexão
if ($conexao->connect_error) {
    die("Erro de Conexão: " . $conexao->connect_error);
}
?>