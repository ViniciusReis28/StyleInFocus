<?php
$localhost = "localhost";
$usuario = "u940333450_info2023g1";
$senha = "M4C4C0-L0Ko";
$db = "u940333450_bdstyleinfocus";

// Conexão ao banco de dados
$conexao = new mysqli($localhost, $usuario, $senha, $db);

// Verificar conexão
if ($conexao->connect_error) {
    die("Erro de Conexão: " . $conexao->connect_error);
}
?>