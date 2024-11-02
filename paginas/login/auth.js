const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const pool = require('../../config/db'); // Certifique-se de que o caminho está correto
const router = express.Router();



// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../paginas/login/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Rota de registro
router.post('/register', upload.single('profileImage'), async (req, res) => {
    const { username, email, password } = req.body;

    // Verificações básicas
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "Preencha todos os campos." });
    }

    try {
        // Verifica se o usuário já existe
        const existingUser = await new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
                if (error) return reject(error);
                resolve(results.rows);
            });
        });

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "E-mail já cadastrado." });
        }

        // Criptografa a senha do usuário
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const profileImage = req.file ? 'uploads/' + req.file.filename : null;

        await new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO users (username, email, password, profile_image) VALUES ($1, $2, $3, $4)', 
                [username, email, hashedPassword, profileImage],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });

        res.json({ success: true, message: "Usuário cadastrado com sucesso." });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ success: false, message: "Erro ao cadastrar." });
    }
});

// Rota de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT * FROM users WHERE email = $1', [email], async (err, results) => {
        if (err || results.rows.length === 0) {
            return res.status(401).json({ success: false, errors: { email: 'E-mail inválido.' } });
        }

        const user = results.rows[0];
        
        // Compare a senha fornecida com o hash armazenado
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userId = user.user_id; // Armazena o ID do usuário na sessão
            req.session.profileImage = user.profile_image; // Armazena a imagem do perfil na sessão

            const profileImagePath = user.profile_image ? `/login/uploads/${user.profile_image}` : '../login/uploads/usuarioDefault.jpg';
            
            return res.json({ 
                success: true, 
                message: "Login bem-sucedido!", 
                redirect: '/userLogado.html', 
                profileImagePath 
            });
        } else {
            return res.status(401).json({ success: false, errors: { password: 'Senha incorreta.' } });
        }
    });
});


// Rota de atualização do perfil
router.post('/update', async (req, res) => {
    const { username, email, senhaAtual, novaSenha, confirmacaoNovaSenha } = req.body;

    // Verifique se o usuário está autenticado
    if (!req.session.userId) {
        return res.status(401).json({ success: false, message: "Não autenticado." });
    }

    try {
        const userId = req.session.userId;

        // Verifique se a senha atual está correta
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        const isPasswordMatch = await bcrypt.compare(senhaAtual, user.rows[0].password);

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Senha atual incorreta." });
        }

        // Se uma nova senha for fornecida, faça a validação
        if (novaSenha && novaSenha === confirmacaoNovaSenha) {
            const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
            await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedNewPassword, userId]);
        }

        // Processar a imagem, se estiver presente
        if (req.files && req.files.inputFoto) {
            const perfilImage = req.files.inputFoto;

            // Salve a imagem no servidor
            const uploadPath = path.join(__dirname, '/uploads', perfilImage.name); // Altere o caminho conforme necessário
            await perfilImage.mv(uploadPath);
            // Atualize o caminho da imagem no banco de dados, se necessário
            await pool.query('UPDATE users SET profile_image = $1 WHERE user_id = $2', [perfilImage.name, userId]);
        }

        // Atualize o banco de dados com os novos dados do usuário
        await pool.query('UPDATE users SET username = $1, email = $2 WHERE user_id = $3', [username, email, userId]);

        res.json({ success: true, message: "Perfil atualizado com sucesso." });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ success: false, message: "Erro ao atualizar perfil." });
    }
});


router.get('/check-session', (req, res) => {
    if (req.session.userId) {
        const profileImagePath = req.session.profileImage 
            ? `/login/uploads/${req.session.profileImage}` 
            : '/login/uploads/usuarioDefault.jpg';
        
        return res.json({ isAuthenticated: true, profileImagePath });
    } else {
        return res.json({ isAuthenticated: false });
    }
});
module.exports = router;