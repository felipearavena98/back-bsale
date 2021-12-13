# Besale Front - Prueba

El siguiente documento tiene el proposito de explicar el codigo y como se interactua con la pagina


## Autor

- [@felipearavena98](https://github.com/felipearavena98)



## API Reference

#### Enpoint para obtener todos los datos de productos

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
