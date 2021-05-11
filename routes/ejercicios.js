
const express = require('express');
const router = express.Router();
const Ejercicio = require('../models/ejercicio');
const { check } = require('express-validator');
const { getEjercicios, crearEjercicio } = require('../controller/ejercicios');
const { validarCampo } = require('../middleware/validarCampo');
const { validarJWT } = require('../middleware/validarJWT');


router.get('/',getEjercicios);

router.post('/',[
    // validarJWT,
    check('nombre','El campo nombre es requerido').not().isEmpty(),
    // check('nombreTema','El campo nombreTema es requerido').not().isEmpty(),
    // check('link','El campo link es requerido').not().isEmpty(),
    validarCampo,
],crearEjercicio);

module.exports = router