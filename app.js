const express = require('express');
const bcrypt = require('bcrypt'); // Para verificar a senha (com hash)
const jwt = require('jsonwebtoken'); // Para criar o token JWT
const User = require('./backend/models/authModel'); // Modelo do banco de dados para o usuário
const path = require('path'); // Para verificar a senha (com hash)
const client = require('./backend/config/database'); // Importando a configuração do banco de dados

const app = express();
app.use(express.json()); // Para que o servidor possa processar JSON no corpo da requisição

// Endpoint de login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar o usuário no banco de dados
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);

        // Verifica se o usuário existe
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const user = result.rows[0];

        // Verificar se a senha fornecida é correta
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'secretaChave', // Sua chave secreta
            { expiresIn: '1h' } // Expiração do token em 1 hora
        );

        // Retornar o token como resposta
        res.status(200).json({ message: 'Usuário autenticado', token });
    } catch (err) {
        console.error('Erro ao processar o login:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Rota padrão para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/login.html')); // Redireciona para login.html
});

// Inicia o servidor na porta 5000
app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
