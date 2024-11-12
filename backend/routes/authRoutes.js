const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Rota POST para registro de usuário
router.post('/register', authController.register);

// Rota POST para login de usuário
router.post('/login', authController.login);

// Rota POST para atualizar informações do usuário
router.post('/update', authController.update);

// Rota POST para solicitar redefinição de senha
router.post('/forgot-password', authController.forgotPassword);

// Rota POST para redefinir a senha
router.post('/reset-password', authController.resetPassword);

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/paginas/login/register.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/paginas/login/login.html'));
});

module.exports = router;
