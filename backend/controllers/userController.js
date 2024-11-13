const User = require('../models/userModel'); // Importa o modelo User

exports.updateProfile = async (req, res) => {
    const { username, email, senhaAtual, novaSenha, confirmacaoNovaSenha } = req.body;
    const userId = req.session.userId;

    // Verifica se o usuário está autenticado
    if (!userId) {
        return res.status(401).json({ success: false, message: "Não autenticado." });
    }

    try {
        // Buscar os dados do usuário com base no ID
        const userResult = await User.findById(userId);
        const user = userResult.rows[0];

        // Verifica se a senha atual está correta
        const isPasswordMatch = await bcrypt.compare(senhaAtual, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Senha atual incorreta." });
        }

        // Se a nova senha for fornecida e for válida, atualiza a senha
        if (novaSenha && novaSenha === confirmacaoNovaSenha) {
            const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
            await User.updatePassword(userId, hashedNewPassword); // Chama o método do modelo para atualizar a senha
        }

        // Atualiza a imagem de perfil, se houver uma nova
        let profileImage = user.profile_image; // Caso não haja imagem, mantém a imagem atual
        if (req.file) {
            profileImage = 'uploads/' + req.file.filename;
            await User.updateProfile(userId, username, email, profileImage); // Atualiza dados e imagem no banco
            req.session.profileImage = profileImage; // Atualiza a imagem na sessão
        }

        // Atualiza o nome de usuário e o e-mail
        await User.updateProfile(userId, username, email, profileImage);
        req.session.username = username;

        // Redireciona o usuário para uma página de sucesso
        res.redirect('/login/userEdited.html');
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ success: false, message: "Erro ao atualizar perfil." });
    }
};

exports.getUser = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ success: false, message: 'Erro ao buscar usuário.' });
    }
};
    

