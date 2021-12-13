const express = require('express');
const pool = require('../db/connection');
const router = express.Router();


module.exports = function() {
    // Funcion para probar el servidor
    router.get('/', (req, res) => {
        res.send('inicio')
    });

    // Consulta BD Para extraer la informacion de todos los productos
    // Consulta para todos los productos incluyendo los que les falta la imagen
    router.get('/allproduct', (req, res) =>{
        pool.getConnection(function(err, connection) {
            connection.query( 'SELECT * FROM product', function(err, rows) {
              if(!err) {
                console.log(pool._freeConnections.indexOf(connection)); // -1
                connection.release();
                res.json(rows);
              } else {
                connection.release();        
                console.log(pool._freeConnections.indexOf(connection)); // 0
              }
        
           });
        });
    })

    // Consulta para obtener los datos de las categorias
    router.get('/category', (req, res) =>{
        pool.getConnection(function(err, connection) {
            connection.query( 'SELECT * FROM category', function(err, rows) {
              if(!err) {
                console.log(pool._freeConnections.indexOf(connection)); // -1
                connection.release();
                res.json(rows);
              } else {
                connection.release();        
                console.log(pool._freeConnections.indexOf(connection)); // 0
              }
        
           });
        });
    })

    return router;
}






