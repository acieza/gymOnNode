const express = require('express');
const Ejercicio = require('../models/ejercicio');
const {validationResult} = require('express-validator');
const Clase = require('../models/clase');

const getEjercicios = async (req,res)=>{
    try{
        const ejercicio = await Ejercicio.find();
        res.json(ejercicio);
    }catch(err){
        res.send("Error" + err)
    }
}

const crearEjercicio = async ( req,res)=>{
    
    const{nombre} = req.body;

    try{
        
        //Comprobar Titulo//

         const hayEj = await Ejercicio.findOne({nombre});

        if( hayEj ){
            return res.status(400).json({
                ok:false,
                msg:"El ejercicio ya existe"
            });
        }
        //Guardar el Curso//

        const ejercicio = new Ejercicio(req.body)

        await ejercicio.save();

        //  const valorId = req.params.id;
        // / const valorClase = clase._id;
        //  const clase = await Clase.findById(valorId);

        //  clase.ejercicios.push(ejercicios.id);
        // await clase.save();
        res.json({
            // valorClase,
            // valorId,
            // ok:true,
            ejercicio
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("Error de Servidor")
        })
}

}
const createEjercicio = async ( req,res)=>{
    
    const{nombre} = req.body;

    try{
        
        //Comprobar Titulo//

        const hayEj = await Ejercicio.findOne({nombre});

        if( hayEj ){
            return res.status(400).json({
                ok:false,
                msg:"El ejercicio ya existe"
            });
        }
        //Guardar el Curso//

        const ejercicio = new Ejercicio(req.body)

        await ejercicio.save();

         const valorId = req.params.id;
        // / const valorClase = clase._id;
         const clase = await Clase.findById(valorId);

         clase.ejercicios.push(ejercicio.id);
        await clase.save();
        res.json({
            // valorClase,
            // valorId,
            // ok:true,
            ejercicio
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("Error de Servidor")
        })
}

}

module.exports = {
    getEjercicios,
    crearEjercicio,
    createEjercicio
}