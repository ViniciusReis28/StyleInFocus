const pool = require('../config/database');

const authMiddleware = async (req, res, next) => {
    // Verifique se há um ID de usuário na sessão (se você estiver usando sessões)
    const { userId } = req.session;

    if (!userId) {
        return res.status(401).json({ message: "Não autenticado." });
    }

    // Verifique se o usuário existe no banco de dados
    try {
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Usuário não encontrado." });
        }

        // Passar o usuário para o próximo middleware ou controlador
        req.user = user.rows[0];
        next();
    } catch (error) {
        console.error("Erro ao verificar usuário autenticado:", error);
        res.status(500).json({ message: "Erro ao verificar autenticação." });
    }
};

module.exports = authMiddleware;
