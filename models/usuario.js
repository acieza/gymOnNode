const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({

    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    role:{
        type:String,
        enum: ['admin','profesor','user'],
        default:"user"
    },
    altura:{
        type: Number,
    },
    peso:{
        type: Number
    },
    clases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clase"
    }],

})

usuarioSchema.method('toJSON', function(){
    const{__v, password, ...object} = this.toObject();
   
   return object;
})

module.exports = mongoose.model("Usuario", usuarioSchema);