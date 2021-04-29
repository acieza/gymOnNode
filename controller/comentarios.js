
const express = require('express');
const Comentario = require('../models/comentario');

const getComentario = async (req,res)=>{
    try{
        const comen = await Comentario.find();
        res.json(comen);
    }catch(err){
        res.send("Error" + err)
    }
}


const crearComentario = async(req,res)=>{

  try{

      //Guardar el Comentario//

      const comen = new Comentario(req.body)

      await comen.save();

      res.json({
          ok:true,
          comen
      })
  }catch(err){
      res.status(500).json({
          ok:false,
          msg:("Error de Servidor")
      })
}

}
module.exports = {
    crearComentario,
    getComentario
}