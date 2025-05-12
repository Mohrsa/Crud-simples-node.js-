const db = require('../db');

module.exports = {
    listarTodos(callback) {
        db.query('SELECT * FROM produtos', callback);
    },

    buscarPorCodigo(codigo, callback) {
        db.query(`SELECT * FROM produtos WHERE codigo = ${codigo}`, callback);
    },

    inserir(produto, callback) {
        const sql = `INSERT INTO produtos (nome, valor, imagem) VALUES (?, ?, ?)`;
        db.query(sql, [produto.nome, produto.valor, produto.imagem], callback);
    },

    remover(codigo, callback) {
        db.query(`DELETE FROM produtos WHERE codigo = ${codigo}`, callback);
    },

    atualizar(produto, callback) {
        const sql = `UPDATE produtos SET nome = ?, valor = ?, imagem = ? WHERE codigo = ?`;
        db.query(sql, [produto.nome, produto.valor, produto.imagem, produto.codigo], callback);
    },

    atualizarSemImagem(produto, callback) {
        const sql = `UPDATE produtos SET nome = ?, valor = ? WHERE codigo = ?`;
        db.query(sql, [produto.nome, produto.valor, produto.codigo], callback);
    }
};