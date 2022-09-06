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
 *              precio_final:
 *                  type: integer
 *                  description: Precio base del producto
 *              url:
 *                  type: string
 *                  description: URL de la imagen del producto
 *              marca:
 *                  type: string
 *                  description: Marca del producto
 * 
 *          required:
 *              - sku
 *              - nombre
 *              - precio_final
 *              - url
 *              - marca
 * 
 *          example:
 *              sku: 3475
 *              nombre: Gafas de sol
 *              precio: 25000
 *              url: /images/sunglasses.jpg
 *              marca: Generico
 *  
*/

/**
 * @swagger
 * /productos:
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
    let productos_encontrados = [];
    underscore.each(productos, (producto, index) => {
        if(producto.inventario > 0){
            productos_encontrados.push({
                "nombre": producto.nombre,
                "sku": producto.sku,
                "url": producto.url,
                "marca": producto.marca,
                "precio_final": producto.precio - (producto.precio * producto.descuento) + (producto.precio * producto.iva)
            });
        }
    });

    if(productos_encontrados == 0){
        res.status(404).send("No hay productos que coincidan con su busqueda");
    }else{
        res.status(200).json(productos_encontrados);
    }
});

/**
 * @swagger
 * /productos/{sku}:
 *  get:
 *      summary: Regresa un producto
 *      tags: [Producto]
 *      parameters:
 *        - in: path
 *          name: id
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
            404:
                description: Producto no encontrado
*/

router.get('/:sku', (req, res) => {
    const { sku } = req.params;
    let productos_encontrados = [];
    underscore.each(productos, (producto, index) => {
        if(producto.inventario > 0 && producto.sku == sku){
            let producto_encontrado = {
                "nombre": producto.nombre,
                "sku": producto.sku,
                "url": producto.url,
                "marca": producto.marca,
                "precio_final": producto.precio - (producto.precio * producto.descuento) + (producto.precio * producto.iva)
            }
            productos_encontrados.push(producto_encontrado);
        }
    });

    if(productos_encontrados == 0){
        res.status(404).send("No hay productos que coincidan con su busqueda");
    }else{
        res.status(200).json(productos_encontrados);
    }
});

module.exports = router;