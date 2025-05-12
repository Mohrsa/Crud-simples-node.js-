const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'projeto'
});

conexao.connect((erro) => {
    if (erro) throw erro;
    console.log('Conexão efetuada com sucesso.');
});

module.exports = conexao;