const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const pool = require('../../config/db'); // Certifique-se de que o caminho está correto
const router = express.Router();

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../paginas/login/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Rota de registro
router.post('/register', upload.single('profileImage'), async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Preencha todos os campos." });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ success: false, message: "E-mail já cadastrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const profileImage = req.file ? 'uploads/' + req.file.filename : null;

        await pool.query(
            'INSERT INTO users (username, email, password, profile_image) VALUES ($1, $2, $3, $4)', 
            [username, email, hashedPassword, profileImage]
        );

        res.json({ success: true, message: "Usuário cadastrado com sucesso." });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ success: false, message: "Erro ao cadastrar." });
    }
});

// Rota de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT * FROM users WHERE email = $1', [email], async (err, results) => {
        if (err || results.rows.length === 0) {
            return res.status(401).json({ success: false, errors: { email: 'E-mail inválido.' } });
        }

        const user = results.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.userId = user.user_id;
            req.session.username = user.username;
            req.session.profileImage = user.profile_image;

            const profileImagePath = user.profile_image ? `/login/uploads/${user.profile_image}` : '/login/uploads/usuarioDefault.jpg';
            
            return res.json({ 
                success: true, 
                message: "Login bem-sucedido!", 
                redirect: '/userLogado.html', 
                profileImagePath,
                username: user.username
            });
        } else {
            return res.status(401).json({ success: false, errors: { password: 'Senha incorreta.' } });
        }
    });
});

// Rota de atualização do perfil
router.post('/update', upload.single('inputFoto'), async (req, res) => {
    const { username, email, senhaAtual, novaSenha, confirmacaoNovaSenha } = req.body;

    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: "Não autenticado." });
    }

    try {
        const userId = req.session.userId;

        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        const isPasswordMatch = await bcrypt.compare(senhaAtual, user.rows[0].password);

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Senha atual incorreta." });
        }

        if (novaSenha && novaSenha === confirmacaoNovaSenha) {
            const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
            await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedNewPassword, userId]);
        }

        let profileImage = user.rows[0].profile_image;
        if (req.file) {
            profileImage = 'uploads/' + req.file.filename;
            await pool.query('UPDATE users SET profile_image = $1 WHERE user_id = $2', [profileImage, userId]);
            req.session.profileImage = profileImage;
        }

        await pool.query('UPDATE users SET username = $1, email = $2 WHERE user_id = $3', [username, email, userId]);
        req.session.username = username;

        res.redirect('/login/userEdited.html');
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ success: false, message: "Erro ao atualizar perfil." });
    }
});

// Rota de verificação de sessão
router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        const profileImagePath = req.session.profileImage 
            ? `/login/uploads/${req.session.profileImage}` 
            : '/login/uploads/usuarioDefault.jpg';

        return res.json({ 
            isAuthenticated: true, 
            profileImagePath,
            username: req.session.username 
        });
    } else {
        return res.json({ isAuthenticated: false });
    }
});

module.exports = router;
