const pool = require('../config/database'); // Importa a conexão com o banco de dados

const ComentarioModel = {
    // Adicionar um comentário
    adicionarComentario: async (roupaId, nome, email, comentario) => {
        const query = `
            INSERT INTO comentarios (roupa_id, nome, email, comentario) 
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [roupaId, nome, email, comentario];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // Buscar todos os comentários de uma peça de roupa
    buscarComentariosPorRoupa: async (roupaId) => {
        const query = `
            SELECT id, roupa_id, nome, email, comentario, data_criacao 
            FROM comentarios 
            WHERE roupa_id = $1
            ORDER BY data_criacao DESC`;
        const result = await pool.query(query, [roupaId]);
        return result.rows;
    }
};

module.exports = ComentarioModel;