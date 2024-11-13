// src/controllers/authController.js
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');

const authController = {
    async register(req, res) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Preencha todos os campos." });
        }

        try {
            const existingUser = await userModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ success: false, message: "E-mail já cadastrado." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const profileImage = req.file ? 'uploads/' + req.file.filename : null;

            await userModel.createUser(username, email, hashedPassword, profileImage);
            res.json({ success: true, message: "Usuário cadastrado com sucesso." });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ success: false, message: "Erro ao cadastrar." });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, errors: { email: 'E-mail inválido.' } });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userId = user.user_id;
            req.session.username = user.username;
            req.session.profileImage = user.profile_image;

            const profileImagePath = user.profile_image ? `/login/uploads/${user.profile_image}` : '/login/uploads/usuarioDefault.jpg';

            return res.json({
                success: true,
                message: "Login bem-sucedido!",
                redirect: '/userLogado.html',
                profileImagePath,
                username: user.username
            });
        } else {
            return res.status(401).json({ success: false, errors: { password: 'Senha incorreta.' } });
        }
    },

    async updateProfile(req, res) {
        const { username, email, senhaAtual, novaSenha, confirmacaoNovaSenha } = req.body;
        if (!req.session.userId) {
            return res.status(401).json({ success: false, message: "Não autenticado." });
        }

        try {
            const userId = req.session.userId;
            const user = await userModel.findByEmail(email);

            const isPasswordMatch = await bcrypt.compare(senhaAtual, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ success: false, message: "Senha atual incorreta." });
            }

            await userModel.updateUser(userId, username, email, novaSenha, req.file ? 'uploads/' + req.file.filename : null);
            req.session.username = username;
            req.session.profileImage = req.file ? 'uploads/' + req.file.filename : user.profile_image;

            res.redirect('/login/userEdited.html');
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            res.status(500).json({ success: false, message: "Erro ao atualizar perfil." });
        }
    },

    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const result = await userModel.findByEmail(email);
            if (!result) {
                return res.status(400).send('E-mail não encontrado');
            }

            const token = await userModel.generateResetToken(email);
            const resetLink = `http://localhost:3000/reset-password?token=${token}`;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'styleinfocuscontact@gmail.com',
                    pass: 'eihb vqrf byzw qzyt',
                },
            });

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

    async resetPassword(req, res) {
        const { token, newPassword } = req.body;

        try {
            const user = await userModel.validateResetToken(token);
            if (!user) {
                return res.status(400).send('Token inválido ou expirado');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await pool.query('UPDATE users SET password = $1, reset_token = NULL, reset_token_expiration = NULL WHERE reset_token = $2', [hashedPassword, token]);

            res.send('Senha alterada com sucesso');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao processar a solicitação');
        }
    }
};

module.exports = authController;
