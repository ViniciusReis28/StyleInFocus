// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../middleware/uploadMiddleware'); // Agora o middleware está correto

const router = express.Router();

router.post('/update', upload.single('inputFoto'), userController.updateProfile);  // Middleware para upload de imagem
router.get('/api/user', userController.getUser);

module.exports = router;
