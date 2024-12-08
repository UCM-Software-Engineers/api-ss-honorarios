import express from 'express';
import { getMovement } from '../controllers/movementController.js';

const router = express.Router();

/**
 * @swagger
 * /api/movement:
 *   get:
 *     summary: Obtiene la lista de Presupuesto movimiento
 *     tags: 
 *       - Presupuesto movimiento
 *     responses:
 *       200:
 *         description: Lista de Presupuesto movimiento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_movimiento_presupuestario:
 *                     type: integer
 *                   id_concepto:
 *                     type: integer
 *                   id_actividad_presupuestaria: 
 *                     type: integer
 *                   id_region:
 *                     type: integer
 *                   id_asignacion:
 *                     type: integer
 *                   id_area:
 *                     type: integer
 *                   monto:
 *                     type: integer
 *                   glosa:
 *                     type: string
 *                   fecha:
 *                     type: string
 */


router.get('/movement', getMovement);

export default router;