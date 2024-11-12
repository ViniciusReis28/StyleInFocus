const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const authController = require('./backend/controllers/authController'); // Importe o controlador de autenticação

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'frontend')));

app.use(express.json()); // Middleware para parsing de JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(session({
    secret: 'seu_segredo',
    resave: false,
    saveUninitialized: false,
}));

// Configuração para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'paginas/login/uploads')));
app.use(express.static(path.join(__dirname, 'paginas')));

// Importar rotas
const authRoutes = require('./backend/routes/authRoutes');
app.use('/auth', authRoutes);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/paginas/login/login.html'));
});

// Rota GET para outras páginas
app.get('/index', (req, res) => res.sendFile(path.join(__dirname, 'frontend/paginas/index/index.html')));
app.get('/userLogado.html', (req, res) => res.sendFile(path.join(__dirname, 'frontend/paginas/login/userLogado.html')));

// Rota POST para login e registro
app.post('/register', authController.register);
app.post('/login', authController.login);

// Tratamento de erro 404
app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
