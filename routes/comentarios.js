const express = require('express');
const router = express.Router();
const Comentario = require('../models/comentario');
const { validarCampo } = require('../middleware/validarCampo');
const { check } = require('express-validator');
const { crearComentario, getComentario } = require('../controller/comentarios');

router.get('/',[],getComentario);


router.post('/',[
    check('email',' El campo email es requerido').not().isEmpty(),
    check('contenido',' El campo contenido es requerido').not().isEmpty(),
    validarCampo,
],crearComentario);

module.exports = router