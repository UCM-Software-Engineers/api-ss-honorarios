import express from 'express';
import { getYear } from '../controllers/yearController.js';

const router = express.Router();

/**
 * @swagger
 * /api/years:
 *   get:
 *     summary: Obtiene la lista de periodos presupuestarios
 *     tags: 
 *       - Presupuesto
 *     responses:
 *       200:
 *         description: Lista de periodos presupuestarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_periodo:
 *                     type: integer
 *                   periodo:
 *                     type: string
 *                   fecha_inicio:
 *                     type: string
 *                   fecha_fin:
 *                     type: string
 *                   en_curso:
 *                     type: boolean
 *                   id_institucion_origen:
 *                     type: integer
 * 
 */


router.get('/years', getYear);

export default router;