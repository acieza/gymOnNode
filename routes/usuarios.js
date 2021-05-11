const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { validarCampo } = require('../middleware/validarCampo');
const multer = require('multer');
const {getUsuarios, crearUsuario, modificarUsuario, borrarUser, buscarUser, buscarProfesor,
modificarUsuariorole, getUsuariosPopulateId, getUsuariosPopulate} = require('../controller/usuarios');
const { validarJWT } = require('../middleware/validarJWT');



router.get('/',getUsuarios);

router.post('/',[
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
    check('password',' El campo password es requerido').not().isEmpty(),
    validarCampo,
],crearUsuario);

router.patch('/:id',[
    validarJWT, 
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),  
    validarCampo,
], modificarUsuario );

router.put('/:id',[
    validarJWT, 
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(), 
    validarCampo, 
], modificarUsuario );

router.put('/user/:id',[
    validarJWT, 
    check('nombre',' El campo nombre es requerido').not().isEmpty(),
    check('email',' El campo email es requerido').not().isEmpty(),
    check('role',' El campo role es requerido').not().isEmpty(),
    validarCampo,
   
], modificarUsuariorole );

router.delete('/:id', validarJWT, borrarUser);

router.get('/user', buscarUser);

router.get('/profesor', buscarProfesor);

router.get('/total', getUsuariosPopulate);

router.get('/total/:id', getUsuariosPopulateId);

module.exports = router