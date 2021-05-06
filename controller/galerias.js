const Galeria = require('../models/galeria');
//const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
//const emailer = require('../helpers/emailer');
const fs = require('fs');
//const csv = require('csv-parser');
const { pipeline } = require('stream');


const getGaleria = async (req,res)=>{
    try{
        const galeria = await Galeria.find();
        res.json(galeria);
    }catch(err){
        res.send("Error" + err);
    }
}

const crearGaleria = async(req,res)=>{
    
    const {titulo} = req.body;

    try{
        // COMPROBAR Titulo //
        const hayGaleria = await Galeria.findOne({titulo});

        if( hayGaleria ){
            return res.status(400).json({
                ok:false,
                msg:"La foto ya existe"
            });
        }
        // GUARDAR GALERIA //
        const galeria = new Galeria(req.body);
     

        await galeria.save();

        res.json({
            ok:true,
            galeria
        })
    }catch(err){
        res.status(500).json({
            ok:false,
            msg:("ERROR EN EL SERVIDOR")
        })
    }
}

module.exports = {
    getGaleria,
    crearGaleria
}