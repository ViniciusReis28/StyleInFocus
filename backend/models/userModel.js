const pool = require('../config/database');

const User = {
    // Encontrar um usuário pelo e-mail
    findByEmail: (email) => {
        return pool.query('SELECT * FROM users WHERE email = $1', [email]);
    },

    // Criar um novo usuário
    createUser: (username, email, password, profileImage) => {
        return pool.query(
            'INSERT INTO users (username, email, password, profile_image) VALUES ($1, $2, $3, $4)',
            [username, email, password, profileImage]
        );
    },

    // Atualizar as informações de um usuário (nome, e-mail, senha e imagem de perfil)
    updateProfile: (userId, username, email, profileImage) => {
        return pool.query(
            'UPDATE users SET username = $1, email = $2, profile_image = $3 WHERE user_id = $4',
            [username, email, profileImage, userId]
        );
    },

    // Verificar e atualizar a senha de recuperação de um usuário (para a recuperação de senha)
    setResetToken: (email, token, expiration) => {
        return pool.query(
            'UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3',
            [token, expiration, email]
        );
    },

    // Redefinir a senha do usuário após a recuperação
    resetPassword: (hashedPassword, token) => {
        return pool.query(
            'UPDATE users SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE reset_token = $2',
            [hashedPassword, token]
        );
    },

    // Buscar o usuário pelo ID
    findById: (userId) => {
        return pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    }
};

module.exports = User;
