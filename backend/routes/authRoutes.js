// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../../config/multer'); // Aqui você pode definir o upload no arquivo de configuração

router.post('/register', upload.single('profileImage'), authController.register);
router.post('/login', authController.login);
router.post('/update', upload.single('inputFoto'), authController.updateProfile);
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password', authController.resetPassword);

module.exports = router;
