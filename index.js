const express = require('express');
const routes = require('./routes');
const cors = require('cors');
// Crear el servidor
const app = express();

//Rutas de la app
app.use(cors({origin: '*'}));
app.use('/', routes());

// Puerto
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
