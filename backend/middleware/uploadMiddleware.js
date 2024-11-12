// middlewares/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Configuração do storage do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define o diretório onde os arquivos serão salvos
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Define o nome do arquivo para evitar conflitos
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);  // Nome único para cada arquivo
    }
});

// Filtro para permitir apenas imagens (se necessário)
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
        return cb(null, true);
    } else {
        cb(new Error('Formato de arquivo inválido. Apenas imagens são permitidas.'));
    }
};

// Inicializa o multer com as configurações
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limita o tamanho do arquivo para 5MB
});

module.exports = upload;
