import express from 'express';
import { getPrevision } from '../controllers/previsionController.js';

const router = express.Router();

/**
 * @swagger
 * /api/prevision:
 *   get:
 *     summary: Obtiene la lista de previsiones
 *     tags: 
 *       - Previsiones
 *     responses:
 *       200:
 *         description: Lista de previsiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_plan_saludd:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */


router.get('/prevision', getPrevision);

export default router;