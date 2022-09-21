const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');


//Crear el servidor de express
const app = express();

//configurar cors
app.use(cors());

//base de datos
dbConnection();

//MEAN_USER1
//jMdyqSL51WMGFF0G

//Rutas
app.get( '/', (req, resp) => {

    resp.json({
        ok: true,
        msg: 'Hola mundo'
    });

});


app.listen( process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT )
} );