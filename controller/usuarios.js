const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
//const emailer = require('../helpers/emailer');
const fs = require('fs');
//const csv = require('csv-parser');
const { pipeline } = require('stream');


const getUsuarios = async (req,res)=>{
    try{
        const usuario = await Usuario.find();
        res.json(usuario);
    }catch(err){
        res.send("Error" + err);
    }
}

const crearUsuario = async(req,res)=>{
    
    const {email,password} = req.body;

    try{
        // COMPROBAR EMAIL //
        const hayEmail = await Usuario.findOne({email});

        if( hayEmail ){
            return res.status(400).json({
                ok:false,
                msg:"El correo ya existe"
            });
        }
        // GUARDAR USUARIO //
        const usuario = new Usuario(req.body);
        //Encriptar Contraseña de Usuario//
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();

        res.json({
            ok:true,
            usuario
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("ERROR EN EL SERVIDOR")
        })
    }
}

const modificarUsuario = async(req,res) =>{
    try{
        const {email} =req.body
        
        const usuario = await Usuario.findById(req.params.id);

        if(usuario.email != req.body.email){
           
      
            const hayEmail = await Usuario.findOne({email});

            if( hayEmail ){
                    return res.status(400).json({
                        ok:false,
                        msg:"El correo ya existe"
                    });
        }
    }
    if(req.body.img){
        usuario.img = req.body.img
    }
        usuario.email = req.body.email       
        usuario.nombre = req.body.nombre
        //usuario.role = req.body.role
      

        const usuario1 = await usuario.save();

        res.json({
            ok:true,
            usuario
        })
        //res.json(usuario1);
    }catch (err){
        res.send("Error " + err);
    }
}
const borrarUser = async (req, res)=>{
    try{
        const user = await Usuario.findById(req.params.id)
        const u1 = await user.deleteOne()
        res.json(u1)
    }catch (error){
        res.send('Error')
    }
    }
    const buscarUser = async(req,res)=>{
        try{
            const user = await Usuario.find({role: "user"});
            res.json(user);
        }catch{
            res.send("Error " + err);
        }
    }
    const buscarProfesor = async(req,res)=>{
        try{
            const profe = await Usuario.find({role: "profesor"});
            res.json(profe);
        }catch{
            res.send("Error " + err);
        }
    }

    const modificarUsuariorole = async(req,res) =>{
        try{
            const {email} =req.body
            
            const usuario = await Usuario.findById(req.params.id);
    
            if(usuario.email != req.body.email){
               
          
                const hayEmail = await Usuario.findOne({email});
    
                if( hayEmail ){
                        return res.status(400).json({
                            ok:false,
                            msg:"El correo ya existe"
                        });
            }
        }
            usuario.email = req.body.email
            usuario.nombre = req.body.nombre
            usuario.role = req.body.role
            usuario.clases= req.body.clases
          
    
            const usuario1 = await usuario.save();
    
            res.json({
                ok:true,
                usuario
            })
            //res.json(usuario1);
        }catch (err){
            res.send("Error " + err);
        }
    }
    const getUsuariosPopulateId = async (req,res)=>{
        try{
            const usuario = await Usuario.findById(req.params.id)
            .select("nombre email role img")
            .populate("clases","nombre descripcion diaS hora" )
            .exec()
            .then()
            res.json(usuario);
        }catch(err){
            res.send("Error" + err)
        }
    }


module.exports = {
    getUsuarios,
    crearUsuario,
    modificarUsuario,
    borrarUser,
    buscarUser,
    buscarProfesor,
    modificarUsuariorole,
    getUsuariosPopulateId
}