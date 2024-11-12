const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const authRouter = require('./paginas/login/auth');
const pool = require('./config/db');
const path = require('path');

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

app.use('/uploads', express.static(path.join(__dirname, 'paginas/login/uploads')));

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'paginas'))); // Altere para o diretório correto

app.use('/auth', authRouter);



// Rotas
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/paginas/login/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/paginas/login/login.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '/paginas/index/index.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '/paginas/index/index.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, '/paginas/login/forgot-password.html'));
});

app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, '/paginas/login/reset-password.html'));
});


app.get('/userLogado.html', (req, res) => {
    // Verifica se o usuário está logado
    if (!req.session.userId) {
        return res.redirect('/login'); // Redireciona para login se não estiver autenticado
    }
    // Envia o arquivo userLogado.html diretamente
    res.sendFile(path.join(__dirname, '/paginas/login/userLogado.html'));
});


app.get('/userCadastrado.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/paginas/login/userCadastrado.html'));
});

// Rota para a página de perfil
app.get('/profile', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); 
    }
    // Envia o arquivo profile.html diretamente
    res.sendFile(path.join(__dirname, '/paginas/login/profile.html'));
});

app.get('/api/user', async (req, res) => {
    // Verifica se o usuário está autenticado
    if (!req.session.userId) {
        return res.status(401).json({ message: "Não autenticado." });
    }

    try {
        const userId = req.session.userId;
        const user = await new Promise((resolve, reject) => {
            pool.query('SELECT username, email, profile_image FROM users WHERE user_id = $1', [userId], (error, results) => {
                if (error) return reject(error);
                resolve(results.rows[0]);
            });
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        // Retorna os dados do usuário como JSON
        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ message: "Erro ao buscar informações do usuário." });
    }
});
// Tratamento de erro 404
app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
