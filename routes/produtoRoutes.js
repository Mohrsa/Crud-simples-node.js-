const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtoController');

router.get('/', controller.listar);
router.get('/:situacao', controller.listarComSituacao);
router.post('/cadastrar', controller.cadastrar);
router.get('/remover/:codigo&:imagem', controller.remover);
router.get('/formularioEditor/:codigo', controller.mostrarFormularioEdicao);
router.post('/editar', controller.editar);

module.exports = router;