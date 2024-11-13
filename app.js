const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const authController = require('./backend/controllers/authController');

const app = express();
const PORT = 3000;

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'frontend/paginas/login/uploads')));


const userRoutes = require('./backend/routes/userRoutes'); // Ajuste o caminho conforme necessário
app.use(userRoutes);

app.use(session({
    secret: 'seu_segredo',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Se estiver usando HTTP, defina como false, em HTTPS defina como true.
}));

app.use(express.json()); // Parsing de JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parsing de dados URL-encoded
app.use(fileUpload()); // Manipulação de uploads de arquivos


// Importar e usar as rotas de autenticação
const authRoutes = require('./backend/routes/authRoutes');
app.use('/auth', authRoutes);

// Tratamento de erro 404 para páginas não encontradas
app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});


app.post('/register', authController.register);
app.post('/login', authController.login);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
