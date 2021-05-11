const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const url = 'mongodb://localhost:27017/gymOn'

const app = express();

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
})

const conexion = mongoose.connection;

conexion.on('open', () =>{
    console.log('Conectado con éxito a la base de datos');
})

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const usuariosRouter = require('./routes/usuarios')
app.use('/usuarios', usuariosRouter)

const clasesRouter = require('./routes/clases')
app.use('/clases', clasesRouter)

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const SubirRouter = require('./routes/subir');
app.use('/subir', SubirRouter);

const comentariosRouter = require('./routes/comentarios');
app.use('/comentarios', comentariosRouter);

const galeriasRouter = require('./routes/galerias');
app.use('/galerias', galeriasRouter);

const ejerciciosRouter = require('./routes/ejercicios');
app.use('/ejercicios', ejerciciosRouter);

app.listen(3000, ()=>{
    console.log('SERVER ON...');
})