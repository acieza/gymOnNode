const mongoose = require('mongoose');

const galeriaSchema = new mongoose.Schema({

    imagen:{
        type:String,
        required:true
    },
    titulo:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
})

// usuarioSchema.method('toJSON', function(){
//     const{__v, password, ...object} = this.toObject();
   
//    return object;
// })

module.exports = mongoose.model("Galeria", galeriaSchema);