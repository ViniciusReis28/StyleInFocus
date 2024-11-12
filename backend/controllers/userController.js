// controllers/userController.js
const bcrypt = require('bcrypt');
const pool = require('../config/database');

exports.updateProfile = async (req, res) => {
    const { username, email, senhaAtual, novaSenha, confirmacaoNovaSenha } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: "Não autenticado." });
    }

    try {
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        const isPasswordMatch = await bcrypt.compare(senhaAtual, user.rows[0].password);

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Senha atual incorreta." });
        }

        if (novaSenha && novaSenha === confirmacaoNovaSenha) {
            const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
            await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedNewPassword, userId]);
        }

        const profileImage = req.file ? 'uploads/' + req.file.filename : user.rows[0].profile_image;
        if (req.file) {
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
};
