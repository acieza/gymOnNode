const express = require('express');
const Clase = require('../models/clase');
const {validationResult} = require('express-validator');
const usuario = require('../models/usuario');


const getClases = async (req,res)=>{
    try{
        const clase = await Clase.find();
        res.json(clase);
    }catch(err){
        res.send("Error" + err)
    }
}
const leerClase = async(req,res)=>{
    try{
        const clase = await Clase.findById(req.params.id);
        res.json(clase);
    }catch(err){
        res.send("Error" + err)
    }
}
// const leerUser = async(req,res)=>{
//     try{
//         const usuario = await Usuarios.findById(req.params.id);
//         res.json(usuario);
//     }catch(err){
//         res.send("Error" + err)
//     }
// }

const crearClases = async(req,res)=>{

      const{nombre} = req.body;

    try{
        
        //Comprobar Titulo//

         const hayClase = await Clase.findOne({nombre});

        if( hayClase ){
            return res.status(400).json({
                ok:false,
                msg:"La clase ya existe"
            });
        }

        //Guardar la Clase//

        const clase = new Clase(req.body)

        await clase.save();

        res.json({
            ok:true,
            clase
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("Error de Servidor")
        })
}

}

const getClasesPopulate = async (req,res)=>{
    try{
        const clase = await Clase.find()
        .select("_id nombre descripcion")
        .populate("ejercicios","nombre link detalle" )
        .exec()
        .then()
        res.json(clase);
    }catch(err){
        res.send("Error" + err)
    }
}

const getClasesPopulateId = async (req, res) => {
    
    try{
         const clase = await Clase.findById(req.params.id)
        .select("_id nombre descripcion")
        .populate("ejercicios", "nombre link detalle")
        .exec()
        .then()
    res.json(clase);
    }catch(err){
        res.send("Error" + err)
    }
}

const getClasesPopulateMovilId = async (req, res) => {
    
    try{
         const clase = await Clase.findById(req.params.id)
        // .select("_id nombre descripcion")
        .populate("ejercicios", "nombre link detalle")
        .exec()
        .then()
    res.json(clase.ejercicios);
    }catch(err){
        res.send("Error" + err)
    }
}

const borrarClase = async (req, res)=>{
    try{
        const clase = await Clase.findById(req.params.id)
        const c1 = await clase.deleteOne()
        res.json(c1)
    }catch (error){
        res.send('Error')
    }
    }

    const modificarclase = async(req,res) =>{
        try{
            const {nombre} =req.body
            
            const clase = await Clase.findById(req.params.id);
    
            if(clase.nombre != req.body.nombre){
               
          
                 const haynombre = await Clase.findOne({nombre});
    
                if( haynombre ){
                        return res.status(400).json({
                            ok:false,
                            msg:"La Clase ya existe"
                        });
            }
        }
            clase.nombre = req.body.nombre
            clase.imagen = req.body.imagen
            clase.descripcion = req.body.descripcion
            clase.diaS = req.body.diaS
            clase.hora = req.body.hora
           
    
            const clase1 = await clase.save();
    
            res.json({
                ok:true,
                clase
            })
        }catch (err){
            res.send("Error " + err);
        }
    }

    

    




module.exports = {
    getClases,
    crearClases,
    getClasesPopulate,
    borrarClase,
    modificarclase,
    leerClase,
    getClasesPopulateId,
    getClasesPopulateMovilId,
}