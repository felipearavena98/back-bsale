const express = require('express');
// const Sequelize = require('sequelize');
const pool = require('../db/connection');
const router = express.Router();


const resultsPerPage = 20;

module.exports = function() {
    // Funcion para probar el servidor
    router.get('/', (req, res) => {
        res.send('inicio')
    });

    // Consulta BD Para extraer la informacion de todos los productos
    // Consulta para todos los productos incluyendo los que les falta la imagen
    router.get('/allproduct/', (req, res) =>{
      let sql = `SELECT * FROM product`;
      try {
        pool.query(sql, (err, result) => {
          if(err) throw err;
          const numOfResults = result.length;
          const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
          let page = req.query.page ? Number(req.query.page) : 1;
          if(page > numberOfPages) {
            res.redirect('/?page='+encodeURIComponent(numberOfPages));
          } else if (page < 1) {
            
            res.redirect('/?page='+encodeURIComponent('1'));
          }
          const startingLimit = (page - 1) * resultsPerPage;
          sql = `SELECT * FROM product LIMIT ${startingLimit}, ${resultsPerPage}`;
          pool.query(sql, (err, result) => {
            if(err) throw err;
            let iterator = (page - 5) < 1 ? 1 : page - 5;
            let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
            if(endingLink < (page + 4)){
              iterator -= (page + 4) - numberOfPages;
            }
            res.json({data: result, page, iterator, endingLink, numberOfPages});
          });
        });
      } catch (error) {
        throw error;
      }

    });

    // Filtro de busqueda
    router.get('/producto/:nombre', (req, res) =>{
      const { nombre } = req.params
      pool.getConnection(function(err, connection) {

          connection.query( `SELECT * FROM product WHERE name LIKE concat('%',?,'%') `, [nombre] ,function(err, rows) {
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




