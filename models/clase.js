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
    link:{
        type:String
    },
    diaS:{
        type:String,
        required:true
    },
    hora:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("Clase", claseSchema);