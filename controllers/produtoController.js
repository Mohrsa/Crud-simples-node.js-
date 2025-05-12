const Produto = require('../models/produtoModel');
const fs = require('fs');
const path = require('path');

module.exports = {
    listar(req, res) {
        Produto.listarTodos((erro, produtos) => {
            if (erro) throw erro;
            res.render('formulario', {produtos});
        });
    },

    listarComSituacao(req, res) {
        Produto.listarTodos((erro, produtos) => {
            if (erro) throw erro;
            res.render('formulario', {produtos, situacao: req.params.situacao});
        });
    },

    cadastrar(req, res) {
        try {
            const { nome, valor } = req.body;
            const imagem = req.files?.imagem;

            if (nome || valor || isNaN(valor)) return res.redirect('/falhaCadastro');

            const produto = { nome, valor, imagem: imagem.name };

            Produto.inserir(produto, (erro) => {
                if (erro) throw erro;
                imagem.mv(path.join(__dirname, '..', 'public', 'imagens', imagem.name));
                res.redirect('/ok');
            });
        } catch {
            res.redirect('/falhaCadastro');
        }
    },

    remover(req, res) {
        try {
            const { codigo, imagem } = req.params;

            Produto.remover(codigo, (erro) => {
                if (erro) throw erro;
                fs.unlink(path.join(__dirname, '..', 'public', 'imagens', imagem), () => {});
                res.redirect('/');
            });
        } catch {
            res.redirect('/falhaRemover');
        }
    },

    mostrarFormularioEdicao(req, res) {
        Produto.buscarPorCodigo(req.params.codigo, (erro, retorno) => {
            if (erro) throw erro;
            res.render('formularioEditor', { produto: retorno[0] });
        });
    },

    editar(req, res) {
        const { nome, valor, codigo, nomeImagem } = req.body;

        if (!nome || !valor || isNaN(valor)) return res.redirect('/falhaEdicao');

        try {
            const imagem = req.files?.imagem;

            if (imagem) {
                const produto = { nome, valor, imagem: imagem.name, codigo };

                Produto.atualizar(produto, (erro) => {
                    if (erro) throw erro;
                    fs.unlink(path.join(__dirname, '..', 'public', 'imagens', nomeImagem), () => {});
                    imagem.mv(path.join(__dirname, '..', 'public', 'imagens', imagem.name));
                    res.redirect('/okEdicao');
                });
            } else {
                Produto.atualizarSemImagem({ nome, valor, codigo }, (erro) => {
                    if (erro) throw erro;
                    res.redirect('/okEdicao');
                });
            }
        } catch {
            res.redirect('/falhaEdicao');
        }
    }
};