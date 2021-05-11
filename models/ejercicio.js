const mongoose  = require('mongoose');

const ejercicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    detalle: {
        type: String
    }

})

module.exports = mongoose.model("Ejercicio", ejercicioSchema);