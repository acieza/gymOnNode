const mongoose  = require('mongoose');

const claseSchema = new mongoose.Schema({
    imagen:{
        type:String,
    },
    nombre:{
        type:String,
        required:true,
    },
    descripcion:{
        type:String,
        required:true
    },
    diaS:{
        type:String,
        required:true
    },
    hora:{
        type:String,
        required:true
    },
    ejercicios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ejercicio"
    }],

})

module.exports = mongoose.model("Clase", claseSchema);