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
  host            : 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
  user            : 'bsale_test',
  password        : 'bsale_test',
  database        : 'bsale_test',
});


module.exports = pool;
```


### Endpoint de productos
En este Endpoint realizamos la conexión a la base de datos y le decimos que queremos obtener todos los productos que se encuentren en la categoría.
 
También podemos configurar o establecer la ruta que queremos darle a la API.

```javascript
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

```


### Endpoint de categorias
En este Endpoint realizamos la conexión a la base de datos y le decimos que queremos obtener todos los productos que se encuentren en las categorías.
 
También podemos configurar o establecer la ruta que queremos darle a la API.

```javascript
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
```
## API Reference

#### Endpoint para obtener todos los datos de productos

```http
  GET /allproduct
```

| Type     | Description                                  |
| :------- | :--------------------------------------------|
| `string` | https://backsale.herokuapp.com/allproduct    |

#### Que obtendremos al ejecutar lo anterior
###### Un ejemplo del objeto que obtendremos

```json
    {
        "id": 5,
        "name": "ENERGETICA MR BIG",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
        "price": 1490,
        "discount": 20,
        "category": 1
    }
```

#### Enpoint para obtener todos los datos de las categorias

```http
  GET /category
```

| Type     | Description                                |
| :------- | :------------------------------------------|
| `string` | https://backsale.herokuapp.com/category    |

#### Que obtendremos al ejecutar lo anterior
###### Un ejemplo del objeto que obtendremos

```json
    {
        "id": 1,
        "name": "bebida energetica"
    }
```
