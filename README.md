# Besale Backend - Prueba

El siguiente documento tiene el propósito de explicar el funcionamiento del backend.
## Autor

- [@felipearavena98](https://github.com/felipearavena98)



## Estructura
El backend fue desarrollado en nodejs.
![App Screenshot](https://github.com/felipearavena98/imagenes/blob/main/img-proyecto-bsale/parte1BACK.png?raw=true)
- db: En esta carpeta se encuentra la función que realiza la conexión a la base de datos.
- routes: En esta carpeta se encuentra la configuración de las rutas y los respectivos filtros para la base de datos que levantan la api.
- index: contiene las configuraciones principales para levantar el backend.

## Configuraciones
Esta es la función que representa a la conexión de la base de datos, la cual nos permite acceder a los productos y categorías, los que posteriormente servirán para desarrollar las consultas y armar la API.
### Conexion a base de datos
```javascript
const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : '**********************************',
  user            : '**********',
  password        : '**********',
  database        : '**********',
});


module.exports = pool;
```


### Endpoint de productos
En este Endpoint realizamos la conexión a la base de datos y le decimos que queremos obtener todos los productos que se encuentren en la categoría, ademas de esto, definimos los filtros y las consultas que nos ayudaran para hacer la páginacion en el front, le podremos pasar parametros como el número de la página.

También podemos configurar o establecer la ruta que queremos darle a la API.

```javascript
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
```


### Endpoint filtro de productos
En este Endpoint realizamos la conexión a la base de datos y le decimos que queremos obtener todos los productos que tengan un nombre parecido al que le damos por parametros.

El injecctión sql según la documentación de https://www.npmjs.com/package/mysql#escaping-query-values se ejecuta en este punto, este tipo de declaracion en la query, permite que no se pueda ingresar backslash

También podemos configurar o establecer la ruta que queremos darle a la API.

```javascript
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
```
## API Reference

#### Endpoint para obtener todos los datos de productos

```http
  GET /allproduct
```

| Type     | Description                                  |
| :------- | :--------------------------------------------|
| `string` | https://backsale.herokuapp.com/allproduct?page=${numeroPagina}   |

#### Que obtendremos al ejecutar lo anterior
###### Un ejemplo del objeto que obtendremos
###### Al final de este endpoint obtendremos la página en la que estamos, la página final y la cantidad total de páginas segun los productos que queramos ver en ella.

```json
{
    "data": [
        {
            "id": 5,
            "name": "ENERGETICA MR BIG",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
            "price": 1490,
            "discount": 20,
            "category": 1
        },
        {
            "id": 6,
            "name": "ENERGETICA RED BULL",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
            "price": 1490,
            "discount": 0,
            "category": 1
        },
        {
            "id": 7,
            "name": "ENERGETICA SCORE",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
            "price": 1290,
            "discount": 0,
            "category": 1
        },
        {
            "id": 8,
            "name": "PISCO ALTO DEL CARMEN 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto8532.jpg",
            "price": 7990,
            "discount": 10,
            "category": 2
        },
        {
            "id": 9,
            "name": "PISCO ALTO DEL CARMEN 40º ",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/alto408581.jpg",
            "price": 5990,
            "discount": 0,
            "category": 2
        },
        {
            "id": 10,
            "name": "PISCO ARTESANOS 35º ",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/artesanos8818.jpg",
            "price": 3990,
            "discount": 0,
            "category": 2
        },
        {
            "id": 11,
            "name": "PISCO BAUZA 40º ",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/bauza408831.jpg",
            "price": 4990,
            "discount": 0,
            "category": 2
        },
        {
            "id": 12,
            "name": "PISCO CAMPANARIO 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario8845.jpg",
            "price": 2990,
            "discount": 20,
            "category": 2
        },
        {
            "id": 13,
            "name": "PISCO CAMPANARIO 40º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario408881.jpg",
            "price": 3990,
            "discount": 20,
            "category": 2
        },
        {
            "id": 14,
            "name": "PISCO ESPIRITU DEL ELQUI 40º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/espiritu8936.jpg",
            "price": 5990,
            "discount": 20,
            "category": 2
        },
        {
            "id": 15,
            "name": "PISCO ESPIRITU DEL ELQUI 45º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/espiritu8957.jpg",
            "price": 6990,
            "discount": 5,
            "category": 2
        },
        {
            "id": 16,
            "name": "PISCO HORCON QUEMADO 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/horcon359049.jpg",
            "price": 6990,
            "discount": 20,
            "category": 2
        },
        {
            "id": 17,
            "name": "PISCO HORCON QUEMADO 40º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/horcon409062.jpg",
            "price": 7990,
            "discount": 20,
            "category": 2
        },
        {
            "id": 18,
            "name": "PISCO HORCON QUEMADO 46º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/horcon469075.jpg",
            "price": 8990,
            "discount": 20,
            "category": 2
        },
        {
            "id": 19,
            "name": "PISCO MISTRAL 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/mistral359200.jpg",
            "price": 4990,
            "discount": 20,
            "category": 2
        },
        {
            "id": 20,
            "name": "PISCO MISTRAL 40º ",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/mistral409215.jpg",
            "price": 4990,
            "discount": 20,
            "category": 2
        },
        {
            "id": 21,
            "name": "PISCO TRES ERRES 35º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/rrr359305.jpg",
            "price": 4590,
            "discount": 20,
            "category": 2
        },
        {
            "id": 22,
            "name": "PISCO TRES ERRES 40º",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/rrr409319.jpg",
            "price": 4990,
            "discount": 20,
            "category": 2
        },
        {
            "id": 23,
            "name": "RON BACARDI AÑEJO",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/bacardi9450.jpg",
            "price": 4990,
            "discount": 0,
            "category": 3
        },
        {
            "id": 24,
            "name": "RON BACARDI 8 AÑOS",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/bacardianejo9463.jpg",
            "price": 5990,
            "discount": 0,
            "category": 3
        }
    ],
    "page": 1,
    "iterator": -1,
    "endingLink": 3,
    "numberOfPages": 3
}
```

#### Enpoint para filtrar productos

```http
  GET /category
```

| Type     | Description                                |
| :------- | :------------------------------------------|
| `string` | https://backsale.herokuapp.com/producto/${texto}    |

#### Que obtendremos al ejecutar lo anterior
###### Un ejemplo del objeto que obtendremos

```json
[
    {
        "id": 5,
        "name": "ENERGETICA MR BIG",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
        "price": 1490,
        "discount": 20,
        "category": 1
    },
    {
        "id": 6,
        "name": "ENERGETICA RED BULL",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
        "price": 1490,
        "discount": 0,
        "category": 1
    },
    {
        "id": 7,
        "name": "ENERGETICA SCORE",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png",
        "price": 1290,
        "discount": 0,
        "category": 1
    },
    {
        "id": 34,
        "name": "ENERGETICA MONSTER RIPPER",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/mosterriper0436.jpg",
        "price": 1990,
        "discount": 0,
        "category": 1
    },
    {
        "id": 35,
        "name": "ENERGETICA MAKKA DRINKS",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/makka-drinks-250ml0455.jpg",
        "price": 1190,
        "discount": 0,
        "category": 1
    },
    {
        "id": 36,
        "name": "ENERGETICA MONSTER VERDE",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/monsterverde0476.jpg",
        "price": 1990,
        "discount": 0,
        "category": 1
    },
    {
        "id": 77,
        "name": "ENERGETICA MONSTER RIPPER",
        "url_image": "",
        "price": 1990,
        "discount": 0,
        "category": 1
    },
    {
        "id": 79,
        "name": "ENERGETICA MONSTER VERDE",
        "url_image": "",
        "price": 1990,
        "discount": 0,
        "category": 1
    }
]
```
