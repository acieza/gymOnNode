const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { validarCampo } = require('../middleware/validarCampo');
const multer = require('multer');
const {getUsuarios, crearUsuario, modificarUsuario, borrarUser, buscarUser, buscarProfesor} = require('../controller/usuarios');
const { validarJWT } = require('../middleware/validarJWT');



router.get('/',getUsuarios);

router.post('/',[
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
    check('password',' El campo password es requerido').not().isEmpty(),
    validarCampo,
],crearUsuario);

router.put('/:id',[
    validarJWT, 
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
   
    validarCampo,
   
], modificarUsuario );
router.delete('/:id', validarJWT, borrarUser);
router.get('/user', buscarUser);
router.get('/profesor', buscarProfesor);

module.exports = router