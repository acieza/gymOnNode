const express = require('express');
const Clase = require('../models/clase');
const {validationResult} = require('express-validator');


const getClases = async (req,res)=>{
    try{
        const clase = await Clase.find();
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

// const getCursosPopulate = async (req,res)=>{
//     try{
//         const curso = await Curso.find()
//         .select("_id titulo descripcion")
//         .populate("clases","nombre temas.nombreTema temas.link temas.detalle" )
//         .exec()
//         .then()
//         res.json(curso);
//     }catch(err){
//         res.send("Error" + err)
//     }
// }

// const getCursosPopulateId = async (req, res) => {
    
//     try{
//          const curso = await Curso.findById(req.params.id)
//         .select("_id titulo descripcion")
//         .populate("clases", "nombre temas.nombreTema temas.link temas.detalle")
//         .exec()
//         .then()
//     res.json(curso);
//     }catch(err){
//         res.send("Error" + err)
//     }
// }

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
            curso.nombre = req.body.nombre
            curso.imagen = req.body.imagen
            curso.descripcion = req.body.descripcion
            curso.diaS = req.body.diaS
            curso.hora = req.body.hora
           
    
            const clase1 = await clase.save();
    
            res.json({
                ok:true,
                clase
            })
            //res.json(usuario1);
        }catch (err){
            res.send("Error " + err);
        }
    }

    




module.exports = {
    getClases,
    crearClases,
    // getCursosPopulate,
    borrarClase,
    modificarclase,
    // leerUser,
    // getCursosPopulateId
}