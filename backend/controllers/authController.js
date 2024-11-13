const UserModel = require('../models/authModel');
const multer = require('multer');
const path = require('path');

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Registro de usuário
async function register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Preencha todos os campos." });
    }

    try {
        const existingUser = await UserModel.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({ success: false, message: "E-mail já cadastrado." });
        }

        const profileImage = req.file ? 'uploads/' + req.file.filename : null;

        await UserModel.createUser(username, email, password, profileImage);

        res.json({ success: true, message: "Usuário cadastrado com sucesso." });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ success: false, message: "Erro ao cadastrar." });
    }
}

// Login de usuário
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findByEmail(email);

        if (!user) {
            return res.status(401).json({ success: false, errors: { email: 'E-mail inválido.' } });
        }

        const match = await UserModel.comparePassword(password, user.password);

        if (match) {
            req.session.userId = user.user_id;
            req.session.username = user.username;
            req.session.profileImage = user.profile_image;

            const profileImagePath = user.profile_image ? `/uploads/${user.profile_image}` : '/uploads/usuarioDefault.jpg';
            
            return res.json({ 
                success: true, 
                message: "Login bem-sucedido!", 
                redirect: 'userLogado.html', 
                profileImagePath,
                username: user.username
            });
        } else {
            return res.status(401).json({ success: false, errors: { password: 'Senha incorreta.' } });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ success: false, message: "Erro ao fazer login." });
    }
}

// Atualização de perfil de usuário
const updateProfile = async (req, res) => {
    console.log(req.body); // Verifique os dados recebidos no backend
    const { senhaAtual, novaSenha, confirmacaoNovaSenha, username, email } = req.body;

    if (!senhaAtual) {
        return res.status(400).json({ success: false, message: "Senha atual não fornecida." });
    }

    if (novaSenha && novaSenha !== confirmacaoNovaSenha) {
        return res.status(400).json({ success: false, message: "As senhas não coincidem." });
    }

    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado." });
        }

        const match = await bcrypt.compare(senhaAtual, user.senha);
        if (!match) {
            return res.status(400).json({ success: false, message: "Senha atual incorreta." });
        }

        if (novaSenha) {
            const hashedPassword = await bcrypt.hash(novaSenha, 10);
            user.senha = hashedPassword;
        }

        if (username) {
            user.username = username;
        }

        if (email) {
            user.email = email;
        }

        await user.save();

        res.status(200).json({ success: true, message: "Perfil atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro ao atualizar o perfil." });
    }
};



// Recuperação de senha
async function forgotPassword(req, res) {
    const { email } = req.body;

    try {
        const user = await UserModel.findByEmail(email);

        if (!user) {
            return res.status(400).json({ success: false, message: 'E-mail não encontrado.' });
        }

        // Gerar token de reset de senha e enviar email
        const token = await UserModel.generateResetToken(user);
        res.json({ success: true, message: 'Instruções de recuperação enviadas para o e-mail.' });

        // Enviar email com token (não implementado aqui, mas pode ser feito com nodemailer)
    } catch (error) {
        console.error('Erro ao recuperar senha:', error);
        res.status(500).json({ success: false, message: 'Erro ao recuperar senha.' });
    }
}

// Redefinir senha
async function resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
        const user = await UserModel.findByResetToken(token);

        if (!user) {
            return res.status(400).json({ success: false, message: 'Token inválido ou expirado.' });
        }

        await UserModel.updatePassword(user.user_id, newPassword);
        await UserModel.clearResetToken(token);

        res.json({ success: true, message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
        res.status(500).json({ success: false, message: 'Erro ao redefinir senha.' });
    }
}

module.exports = { register, login, updateProfile, forgotPassword, resetPassword, upload };
