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
