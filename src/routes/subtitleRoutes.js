import express from 'express';
import { getSubtitle } from '../controllers/subtitleController.js';

const router = express.Router();

/**
 * @swagger
 * /api/subtitle:
 *   get:
 *     summary: Obtiene la lista de subtitulos de presupuesto
 *     tags: 
 *       - Presupuesto Subtitulo
 *     responses:
 *       200:
 *         description: Lista de subtitulos de presupuesto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_subtitulo:
 *                     type: integer
 *                   id_periodo:
 *                     type: integer
 *                   cod_subtitulo:
 *                     type: string
 *                   subtitulo:
 *                     type: string
 */


router.get('/subtitle', getSubtitle);

export default router;


