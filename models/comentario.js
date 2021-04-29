const mongoose  = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    contenido:{
        type:String,
        required:true,
    }

})

module.exports = mongoose.model("Comentario", comentarioSchema);