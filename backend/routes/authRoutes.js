const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const pool = require('../config/database'); // Verifique o caminho correto do seu arquivo db


// Rota de registro
router.post('/register', authController.upload.single('profileImage'), authController.register);

// Rota de login
router.post('/login', authController.login);

// Rota para recuperar a senha
router.post('/forgot-password', authController.forgotPassword);

// Rota para redefinir a senha
router.post('/reset-password', authController.resetPassword);


router.post('/update', authController.updateProfile);

router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        return res.json({
            authenticated: true, // Retorna que o usuário está autenticado
            user: {
                username: req.session.username,
                profileImage: req.session.profileImage
            }
        });
    } else {
        return res.status(401).json({
            authenticated: false, // Retorna que o usuário não está autenticado
            message: 'Usuário não autenticado.'
        });
    }
});

router.get('/api/user', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: "Usuário não autenticado" });
    }

    pool.query('SELECT username, email, profile_image FROM users WHERE user_id = $1', [req.session.userId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Erro ao buscar dados do usuário" });
        }

        if (results.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }

        const user = results.rows[0];
        res.json({
            success: true,
            username: user.username,
            email: user.email,
            profile_image: user.profile_image
        });
    });
});

module.exports = router;
