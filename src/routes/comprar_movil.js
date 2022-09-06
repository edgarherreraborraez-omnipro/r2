const { Router } = require('express');
const router = Router();
const underscore = require('underscore');
const ordenes = require('../ordenes.json');
const productos = require('../productos.json');

/**
 * @swagger
 * components:
 *  schemas:
 *      Orden:
 *          type: object
 *          properties:
 *              sku:
 *                  id: string
 *                  description: Identificación de orden
 *              nombre:
 *                  type: string
 *                  description: Nombre del comprador
 *              apellido:
 *                  type: string
 *                  description: Apellido del comprador
 *              total:
 *                  type: integer
 *                  description: Valor total de la orden
 *              productos:
 *                  type: Map[String]
 *                  description: Lista de SKUs de productos a comprar
 * 
 *          required:
 *              - id
 *              - nombre
 *              - apellido
 *              - total
 *              - productos
 * 
 *          example:
 *              sku: 3
 *              nombre: Edgar
 *              apellido: Herrera
 *              total: 25000
 *              productos: ["9327"]
 *  
*/

/**
 * @swagger
 * /comprar:
 *  post:
 *      summary: Crea una nueva orden
 *      tags: [Orden]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Orden'
 *      responses:
 *          201:
 *              description: Nueva orden creada
 *          400:
 *              description: Hubo un error en la creación del objeto
 */

router.post('/', (req, res) => {
    const { skus, nombre, apellido } = req.body;
    if(skus && nombre && apellido){
        if(Array.isArray(skus) == false || typeof nombre != "string" || typeof apellido != "string"){
            res.status(400).send("Hubo un error en los tipos de datos");
        }else if(skus.lenght>0){
            let orden = {
                "id":ordenes.lenght+1,
                "nombre": nombre,
                "apellido": apellido,
                "total":0,
                "productos":[]
            }
            underscore.each(productos, (producto, index) => {
                if(skus.include(producto.sku)){
                    orden.productos.push(producto.sku);
                    orden.total = orden.total + producto.precio - (producto.precio * producto.descuento) + (producto.precio * producto.iva)
                }
           });
            if(orden.total == 0){
                res.status(400).send("El valor total de la compra es cero. Se ha cancelado la transacción");
            }else{
                ordenes.push(orden);
                res.status(201).send("Se ha realizado la transacción. Su ID es"+orden.id);
            }
            
        }
    }else{
        res.status(400).send("Hubo un error en la creación del objeto");
    }
});

module.exports = router;
