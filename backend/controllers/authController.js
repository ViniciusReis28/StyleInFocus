const bcrypt = require('bcrypt');
const pool = require('../config/database');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');

const authController = {
    register: async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Preencha todos os campos." });
        }

        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ success: false, message: "E-mail já cadastrado." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const profileImage = req.file ? 'uploads/' + req.file.filename : null;

            await User.createUser(username, email, hashedPassword, profileImage);

            res.json({ success: true, message: "Usuário cadastrado com sucesso." });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ success: false, message: "Erro ao cadastrar." });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findByEmail(email);
            if (user.rows.length === 0) {
                return res.status(400).json({ message: "Usuário não encontrado." });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: "Senha incorreta." });
            }

            req.session.userId = user.rows[0].user_id;
            res.json({ success: true, message: "Login bem-sucedido." });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ message: "Erro no login." });
        }
    },

    update: async (req, res) => {
        const { userId } = req.session;
        const { username, email, profileImage } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Não autenticado." });
        }

        try {
            await User.updateProfile(userId, username, email, profileImage);
            res.json({ success: true, message: "Perfil atualizado com sucesso." });
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            res.status(500).json({ message: "Erro ao atualizar perfil." });
        }
    },

    forgotPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const result = await User.findByEmail(email);

            if (result.rows.length === 0) {
                return res.status(400).send('E-mail não encontrado');
            }

            const token = crypto.randomBytes(20).toString('hex');
            const expiration = new Date(Date.now() + 3600000); // 1 hora

            await User.setResetToken(email, token, expiration);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'styleinfocuscontact@gmail.com',
                    pass: 'eihb vqrf byzw qzyt',
                },
            });

            const resetLink = `http://localhost:3000/reset-password?token=${token}`;
            const mailOptions = {
                to: email,
                subject: 'Recuperação de Senha',
                text: `Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha: \n\n${resetLink}`,
            };

            await transporter.sendMail(mailOptions);

            res.send('E-mail enviado com instruções para recuperação de senha');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao processar a solicitação');
        }
    },

    resetPassword: async (req, res) => {
        const { token, newPassword } = req.body;

        try {
            const result = await pool.query('SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiration > $2', [token, new Date()]);

            if (result.rows.length === 0) {
                return res.status(400).send('Token inválido ou expirado');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await User.resetPassword(hashedPassword, token);

            res.send('Senha alterada com sucesso');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao processar a solicitação');
        }
    },
};

module.exports = authController;
