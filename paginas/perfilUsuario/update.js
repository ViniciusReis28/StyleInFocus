const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Certifique-se de que está configurado para usar o @neondatabase/serverless
const router = express.Router();

router.post('/update', async (req, res) => {
    const userId = req.session.user_id;
    const { username, email, senhaAtual, novaSenha } = req.body;
    const profileImage = req.files?.foto; // Verifique como está lidando com o upload

    try {
        // Busca o usuário e a senha atual no banco de dados
        const result = await db.query('SELECT password, profile_image FROM users WHERE user_id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, error: 'Usuário não encontrado.' });
        }

        const currentPasswordHash = result.rows[0].password;
        const currentProfileImage = result.rows[0].profile_image;

        // Verifica a senha atual, se necessário
        if (senhaAtual && !bcrypt.compareSync(senhaAtual, currentPasswordHash)) {
            return res.status(401).json({ success: false, error: 'Senha atual incorreta.' });
        }

        // Configura o novo hash da senha se uma nova senha for fornecida
        let passwordUpdateQuery = '';
        const updates = [username, email];
        if (novaSenha) {
            const newPasswordHash = bcrypt.hashSync(novaSenha, 10);
            updates.push(newPasswordHash);
            passwordUpdateQuery = ', password = $3';
        }

        // Atualiza a imagem de perfil, se houver uma nova
        let imagePath = currentProfileImage;
        if (profileImage) {
            const filePath = `uploads/${profileImage.name}`; // Salva o caminho desejado
            await profileImage.mv(filePath); // Salva o arquivo no diretório desejado
            imagePath = filePath;
        }

        // Atualiza os dados no banco de dados
        const query = `UPDATE users SET username = $1, email = $2${passwordUpdateQuery}, profile_image = $4 WHERE user_id = $5`;
        const finalUpdates = [...updates, imagePath, userId];

        await db.query(query, finalUpdates);

        req.session.profile_image = imagePath;
        res.json({ success: true, redirect: '/profile' });

    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ success: false, error: 'Erro ao atualizar perfil.' });
    }
});

module.exports = router;
