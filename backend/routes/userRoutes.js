// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();
router.post('/update', upload.single('inputFoto'), userController.updateProfile);

module.exports = router;
