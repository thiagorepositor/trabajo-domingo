const mysql = require('mysql2');

let conectar = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Almendra",
    database: "taller_api",
    port: 3306
});

conectar.connect((error) => {
    if (error) {
        console.log('Error al conectar con MySQL:', error.message);
    } else {
        console.log('Conexión a MySQL realizada correctamente');
    }
});

conectar.on('error', (error) => {
    console.log('Problema con la conexión a MySQL:', error.message);
});