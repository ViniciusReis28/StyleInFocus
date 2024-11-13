const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./backend/routes/authRoutes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de sessões
app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true
}));
app.use(authRoutes);

// Configuração de arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '/frontend/paginas/login/uploads')));
app.use(express.static(path.join(__dirname, 'frontend')));

// Rota padrão para a página inicial ou outras páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/'));  // Redireciona para a página de login
});
// Usar as rotas de autenticação
app.use('/auth', authRoutes);

// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
