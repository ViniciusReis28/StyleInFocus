const pool = require('../config/database'); // Certifique-se de que o caminho está correto
const bcrypt = require('bcrypt');

class UserModel {
// Adicionar no UserModel
static async findById(userId) {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return result.rows[0]; // Retorna o usuário ou undefined
}


    // Encontrar usuário pelo e-mail
    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];  // Retorna o primeiro usuário encontrado ou undefined
    }

    // Criar um novo usuário
    static async createUser(username, email, password, profileImage) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (username, email, password, profile_image) VALUES ($1, $2, $3, $4)', 
            [username, email, hashedPassword, profileImage]
        );
    }

    static async comparePassword(password, hashedPassword) {
        if (!password || !hashedPassword) {
            throw new Error('Senha ou hash ausentes');
        }
    
        return bcrypt.compare(password, hashedPassword);
    }


 static async updateProfile(userId, username, email, profileImage, currentPassword, newPassword, confirmNewPassword) {
    const currentUser = await pool.query('SELECT password, profile_image FROM users WHERE user_id = $1', [userId]);
    const existingProfileImage = currentUser.rows[0]?.profile_image || null;
    const storedPassword = currentUser.rows[0]?.password; // Senha atual armazenada

    // Se a nova imagem for fornecida, usaremos ela, caso contrário mantemos a imagem existente
    const updatedProfileImage = profileImage || existingProfileImage;

    // Se a senha atual foi fornecida, vamos verificar se ela está correta
    if (newPassword) {
        const isPasswordMatch = await bcrypt.compare(currentPassword, storedPassword); // Verifica a senha atual fornecida

        if (!isPasswordMatch) {
            throw new Error('Senha atual incorreta.');
        }

        // Verifica se a nova senha e a confirmação da senha coincidem
        if (newPassword !== confirmNewPassword) {
            throw new Error('As senhas não coincidem.');
        }

        // Se a senha for válida, atualizamos a senha no banco de dados
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query(
            'UPDATE users SET password = $1 WHERE user_id = $2',
            [hashedPassword, userId]
        );
    }

    // Atualizando o nome de usuário e email, se fornecidos
    await pool.query(
        'UPDATE users SET username = $1, email = $2, profile_image = $3 WHERE user_id = $4',
        [username, email, updatedProfileImage, userId]
    );
}


    // Recuperar token de redefinição de senha
    static async updateResetToken(email, token, expiration) {
        await pool.query(
            'UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3',
            [token, expiration, email]
        );
    }

    // Validar o token de redefinição de senha
    static async validateResetToken(token) {
        const result = await pool.query(
            'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiration > $2', 
            [token, new Date()]
        );
        return result.rows[0]; // Retorna o usuário se o token for válido
    }

    // Limpar o token de redefinição
    static async clearResetToken(token) {
        await pool.query(
            'UPDATE users SET reset_token = NULL, reset_token_expiration = NULL WHERE reset_token = $1',
            [token]
        );
    }
}

module.exports = UserModel;
