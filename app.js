const express = require('express');
const cors = require('cors');

const pruebaRoutes = require('./routes/pruebaRoutes');
const usuariosRoute = require('./routes/usuariosRoute');
const productosRoute = require('./routes/productosRoute');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use('/', pruebaRoutes);
app.use('/', usuariosRoute);
app.use('/', productosRoute);

app.listen(PORT, (error) => {
    if (error) {
        console.log('No se pudo iniciar el servidor:', error.message);
        return;
    }
    console.log('Servidor en ejecución en http://localhost:' + PORT);
});