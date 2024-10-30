const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../../config/db'); // Certifique-se de que o caminho está correto
const router = express.Router();

// Rota de registro
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Verificações básicas
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Preencha todos os campos." });
    }

    try {
        // Verifica se o usuário já existe
        const existingUser = await new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
                if (error) return reject(error);
                resolve(results.rows);
            });
        });

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "E-mail já cadastrado." });
        }

        // Criptografa a senha do usuário
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', 
                [username, email, hashedPassword],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });

        res.json({ success: true, message: "Usuário cadastrado com sucesso." });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ success: false, message: "Erro ao cadastrar." });
    }
});

// Rota de login
// Rota de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT * FROM users WHERE email = $1', [email], async (err, results) => {
        if (err || results.rows.length === 0) {
            return res.status(401).json({ success: false, errors: { email: 'E-mail inválido.' } });
        }

        const user = results.rows[0];
        if (bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.user_id;
            return res.json({ success: true, message: "Login bem-sucedido!", redirect: 'userLogado.html' });
        } else {
            return res.status(401).json({ success: false, errors: { password: 'Senha incorreta.' } });
        }
    });
});


module.exports = router;
