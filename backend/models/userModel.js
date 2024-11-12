const pool = require('../config/database');

const User = {
    findByEmail: (email) => {
        return pool.query('SELECT * FROM users WHERE email = $1', [email]);
    },
    createUser: (username, email, password, profileImage) => {
        return pool.query(
            'INSERT INTO users (username, email, password, profile_image) VALUES ($1, $2, $3, $4)',
            [username, email, password, profileImage]
        );
    },
    updateProfile: (userId, username, email, profileImage) => {
        return pool.query(
            'UPDATE users SET username = $1, email = $2, profile_image = $3 WHERE user_id = $4',
            [username, email, profileImage, userId]
        );
    },
    setResetToken: (email, token, expiration) => {
        return pool.query(
            'UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE email = $3',
            [token, expiration, email]
        );
    },
    resetPassword: (hashedPassword, token) => {
        return pool.query(
            'UPDATE users SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE reset_token = $2',
            [hashedPassword, token]
        );
    },
};

module.exports = User;