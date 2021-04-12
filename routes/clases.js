  
const express = require('express');
const router = express.Router();
const Clase = require('../models/clase');
//const {getUsuarios, crearUsuarios} = require('../controller/usuarios');
const { check } = require('express-validator');
const { getClases, crearClases, getCursosPopulate, borrarClase, modificarclase, leerUser, getCursosPopulateId } = require('../controller/clases');
const { validarCampo } = require('../middleware/validarCampo');
const { validarJWT } = require('../middleware/validarJWT');

router.get('/',[],getClases);

//router.get('/total', getCursosPopulate);

//router.get('/total/:id', getCursosPopulateId);

//router.get('/:id', validarJWT, leerUser)
router.delete('/:id', validarJWT, borrarClase);

router.put('/:id',[
    validarJWT, 
    check('imagen',' El campo imagen es requerido').not().isEmpty(),
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('descripcion',' El campo descripcion es requerido').not().isEmpty(),
    check('diaS',' El campo diaS es requerido').not().isEmpty(),
    check('hora',' El campo hora es requerido').not().isEmpty(),
    validarCampo,   
], modificarclase );

router.post('/',[
    validarJWT,
    check('imagen',' El campo imagen es requerido').not().isEmpty(),
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('descripcion',' El campo descripcion es requerido').not().isEmpty(),
    check('diaS',' El campo diaS es requerido').not().isEmpty(),
    check('hora',' El campo hora es requerido').not().isEmpty(),
    validarCampo,
],crearClases);

module.exports = router