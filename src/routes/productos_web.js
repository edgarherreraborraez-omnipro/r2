const { Router } = require('express');
const router = Router();
const productos = require('../productos.json');
const underscore = require('underscore');

/**
 * @swagger
 * components:
 *  schemas:
 *      Producto:
 *          type: object
 *          properties:
 *              sku:
 *                  type: string
 *                  description: Código de inventario para producto
 *              nombre:
 *                  type: string
 *                  description: Nombre del producto
 *              precio:
 *                  type: integer
 *                  description: Precio base del producto
 *              url:
 *                  type: string
 *                  description: URL de la imagen del producto
 *              marca:
 *                  type: string
 *                  description: Marca del producto
 *              descripcion:
 *                  type: string
 *                  description: descripcion del producto
 *              iva:
 *                  type: number
 *                  description: porcentaje de iva del producto
 *              descuento:
 *                  type: number
 *                  description: porcentaje de descuento del producto
 *              inventario:
 *                  type: integer
 *                  description: cantidad de unidades en existencia del producto
 *              fecha_creacion:
 *                  type: string
 *                  description: fecha de creacion del producto
 * 
 *          required:
 *              - sku
 *              - nombre
 *              - precio
 *              - url
 *              - marca
 *              - descripcion
 *              - iva
 *              - descuento
 *              - inventario
 *              - fecha_creacion
 * 
 *          example:
 *              sku: 3475
 *              nombre: Gafas de sol
 *              precio: 25000
 *              url: /images/sunglasses.jpg
 *              marca: Generico
 *              descripcion: Para protegerte del sol incluso en días muy soleados
 *              iva: 0.18
 *              descuento: 0
 *              inventario: 20
 *              fecha_creacion: 2022-09-04
 *              
 *  
*/

/**
 * @swagger
 * /admin/productos:
 *  get:
 *      summary: Regresa todos los productos
 *      tags: [Producto]
 *      responses:
 *          200:
 *              description: Todos los productos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Producto'
 *          404:
 *              description: Productos no encontrados
 */

router.get('/', (req, res) => {
    if(productos.lenght == 0){
        res.status(404).send("No hay productos");
    }else{
        res.status(200).json(productos);
    }
});

/**
 * @swagger
 * /admin/productos/{sku}:
 *  get:
 *      summary: Regresa un producto
 *      tags: [Producto]
 *      parameters:
 *        - in: path
 *          name: sku
 *          schema:
 *              type: string
 *          required: true
 *          description: SKU del producto
 *      responses:
 *          200:
 *              description: Producto con el SKU indicado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Producto'
 *          404:
 *              description: Producto no encontrado
*/

router.get('/:sku', (req, res) => {
    const { sku } = req.params;
    let productos_encontrados = [];
    underscore.each(productos, (producto, index) => {
        if(producto.sku == sku){
            productos_encontrados.push(producto);
        }
    });

    if(productos_encontrados.lenght == 0){
        res.status(404).send("No hay productos que coincidan con su busqueda");
    }else{
        res.status(200).json(productos_encontrados);
    }
});


/**
 * @swagger
 * /admin/productos:
 *  post:
 *      summary: Crea un nuevo producto
 *      tags: [Producto]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Producto'
 *      responses:
 *          201:
 *              description: Nuevo producto creado
 *          400:
 *              description: Hubo un error en la creación del objeto
 */

 router.post('/', (req, res) => {
    const {sku, nombre, precio, url, marca, descripcion, iva, descuento, inventario, fecha_creacion} = req.body;
    let existencias = 0;
    if(sku && nombre && precio && url && marca && descripcion && iva && inventario && fecha_creacion){
        
        underscore.each(productos, (producto, index) => {
            if(producto.sku == sku){
                existencias = existencias + 1;
            }
        });

        if(existencias>0){
            res.status(500).send("Ya existe un producto con ese SKU");
        }else if(typeof precio != "number" || typeof iva != "number" || typeof descuento != "number" || typeof inventario != "number"){
            res.status(500).send("Hubo un error en los tipos de datos");
        }else if(typeof sku != "string" || typeof nombre != "string" || typeof url != "string" || typeof marca != "string" || typeof descripcion != "string" || typeof fecha_creacion != "string"){
            res.status(500).send("Hubo un error en los tipos de datos");
        }else if(precio < 1 || iva < 0 || iva > 1 || descuento < 0 || descuento > 1 || inventario < 0){
            res.status(500).send("Hubo un error en los valores numéricos");
        }else{
            const nuevo_producto = {...req.body}
            productos.push(nuevo_producto);
            res.status(201).send("Se insertó el producto satisfactoriamente");
        }
    }else{
        res.status(400).send("Hubo un error en la creación del objeto");
    }
});

/**
 * @swagger
 * /admin/productos/{sku}:
 *  put:
 *      summary: Actualiza un producto
 *      tags: [Producto]
 *      parameters:
 *        - in: path
 *          name: sku
 *          schema:
 *              type: string
 *          required: true
 *          description: SKU del producto
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Producto'
 *      responses:
 *          200:
 *              description: Producto con el SKU indicado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Producto'
 *          400:
 *              description: Hubo un error en la creación del objeto
 *          404:
 *              description: Producto not found
*/

router.put('/:sku', (req, res) => {
    const { sku } = req.params;
    const { nombre, precio, url, marca, descripcion, iva, descuento, inventario, fecha_creacion } = req.body;
    let existencias = 0;
    

    if(nombre && precio && url && marca && descripcion && iva && descuento && inventario && fecha_creacion){
        
        underscore.each(productos, (producto, index) => {
            if(producto.sku == sku){
                existencias = existencias + 1;
            }
        });

        if(existencias==0){
            res.status(404).send("No existe un producto con ese SKU");
        }else if(typeof precio != "number" || typeof iva != "number" || typeof descuento != "number" || typeof inventario != "number"){
            res.status(400).send("Hubo un error en los tipos de datos");
        }else if(typeof sku != "string" || typeof nombre != "string" || typeof url != "string" || typeof marca != "string" || typeof descripcion != "string" || typeof fecha_creacion != "string"){
            res.status(400).send("Hubo un error en los tipos de datos");
        }else if(precio < 1 || iva < 0 || iva > 1 || descuento < 0 || descuento > 1 || inventario < 0){
            res.status(400).send("Hubo un error en los valores numéricos");
        }else{
            underscore.each(productos, (producto, index) => {
                if(producto.sku == sku){
                    producto.nombre = nombre;
                    producto.precio = precio;
                    producto.url = url;
                    producto.marca = marca;
                    producto.descripcion = descripcion;
                    producto.iva = iva;
                    producto.descuento = descuento;
                    producto.inventario = inventario;
                    producto.fecha_creacion = fecha_creacion;
                }
            });
            res.status(201).send("Se actualizó el producto satisfactoriamente");
        }
    }else{
        res.status(400).send("Hubo un error en la creación del objeto");
    }
});
