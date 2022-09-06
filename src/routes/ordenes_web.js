const { Router } = require('express');
const router = Router();
const ordenes = require('../ordenes.json');
const underscore = require('underscore');

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
 * /admin/ordenes:
 *  get:
 *      summary: Regresa todas las ordenes
 *      tags: [Orden]
 *      responses:
 *          200:
 *              description: Todas las ordenes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Orden'
 *          404:
 *              description: Ordenes no encontradas
 */

router.get('/', (req, res) => {
    if(ordenes.lenght == 0){
        res.status(404).send("No hay ordenes");
    }else{
        res.status(200).json(ordenes);
    }
});

module.exports = router;