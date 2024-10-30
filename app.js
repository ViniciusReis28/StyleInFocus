const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const authRouter = require('./paginas/login/auth');
const pool = require('./config/db');
const path = require('path'); // Adicione esta linha


const app = express();
const PORT = 3000;

// Configurações do express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(session({
    secret: 'seu_segredo',
    resave: false,
    saveUninitialized: false,
}));
app.get('/perfilUsuario/script.js', (req, res) => {
    console.log('Requisição recebida para script.js');
    res.sendFile(path.join(__dirname, 'paginas', 'perfilUsuario', 'script.js'));
});
// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'paginas')));
app.use('/auth', authRouter);

// Rota para obter dados do perfil
app.get('/api/profile', (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ success: false, error: 'Usuário não autenticado.' });
    }

    pool.query('SELECT username, email, profile_image FROM users WHERE user_id = $1', [userId], (error, results) => {
        if (error || results.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
        }

        const user = results.rows[0];
        res.json({ success: true, user });
    });
});


// Rota para atualizar perfil
app.post('/api/profile', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ success: false, error: 'Usuário não autenticado.' });
    }

    const { username, email } = req.body;
    let profileImage = '';

    // Verifica se há um arquivo para upload
    if (req.files && req.files.inputFoto) {
        const fotoPerfil = req.files.inputFoto;
        profileImage = '/perfilUsuario/uploads/' + fotoPerfil.name; // Ajuste para o caminho correto

        // Mover o arquivo para a pasta uploads
        fotoPerfil.mv(path.join(__dirname, 'paginas', 'perfilUsuario', 'uploads', fotoPerfil.name), (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: 'Erro ao salvar imagem.' });
            }
        });
    } else {
        // Caso não tenha uma nova imagem, mantenha a imagem atual do banco de dados
        profileImage = './perfilUsuario/uploads/usuarioDefault.jpg';
    }

    // Atualiza o banco de dados com os dados fornecidos
    pool.query(
        'UPDATE users SET username = $1, email = $2, profile_image = $3 WHERE user_id = $4',
        [username, email, profileImage, userId],
        (error, results) => {
            if (error) {
                return res.status(500).json({ success: false, error: 'Erro ao atualizar perfil.' });
            } else {
                return res.json({ 
                    success: true, 
                    message: "Perfil atualizado com sucesso!", 
                    user: { username, email, profile_image: profileImage }, 
                    redirect: 'userEdited.html' 
                });
            }
        }
    );
});

// Rota para servir o arquivo profile.html
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'paginas', 'perfilUsuario', 'profile.html'));
});
// Outras rotas de páginas
app.get('/userEdited.html', (req, res) => {
    res.sendFile(__dirname + '/paginas/perfilUsuario/userEdited.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/paginas/login/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/paginas/login/login.html');
});

app.get('/userLogado.html', (req, res) => {
    res.sendFile(__dirname + '/paginas/login/userLogado.html');
});

app.get('/userCadastrado.html', (req, res) => {
    res.sendFile(__dirname + '/paginas/login/userCadastrado.html');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
