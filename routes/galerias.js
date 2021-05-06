const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { validarCampo } = require('../middleware/validarCampo');
const multer = require('multer');
const {getGaleria, crearGaleria} = require('../controller/galerias');


router.get('/',getGaleria);

router.post('/',[
    check('imagen',' El campo imagen es requerido').not().isEmpty(),
    check('titulo',' El campo titulo es requerido').not().isEmpty(),
    check('descripcion',' El campo descripcion es requerido').not().isEmpty(),
    validarCampo,
],crearGaleria);

module.exports = router