const express = require('express');
const conectarDB = require('./config/db.js');
const cors = require('cors');

// Crear un servidor
const app = express();

// Conectar la BD
conectarDB();

// Habilitar CORS
const opcionesCors =
{
    origin:'https://node-send-cliente-5k4ohbw46-majogobla.vercel.app', 
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(opcionesCors));

// Puerto de la app
const port = process.env.PORT || 4000;

// Habilitar leer los valores de un body
app.use(express.json());

// Habilitar carpeta publica
app.use(express.static('uploads'));

// Rutas de la APP
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

// Arrancar el servidor
app.listen(port, '0.0.0.0', () =>
{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})