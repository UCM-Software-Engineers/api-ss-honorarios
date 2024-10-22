import express from 'express';
import { getItem } from '../controllers/itemController.js';

const router = express.Router();

/**
 * @swagger
 * /api/item:
 *   get:
 *     summary: Obtiene la lista de Presupuesto Item
 *     tags: 
 *       - Presupuesto
 *     responses:
 *       200:
 *         description: Lista de Presupuesto Item
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_item:
 *                     type: integer
 *                   id_subtitulo:
 *                     type: integer
 *                   cod_item:
 *                     type: string
 *                   item:
 *                     type: string
 */


router.get('/item', getItem);

export default router;