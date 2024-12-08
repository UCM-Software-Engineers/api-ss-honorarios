import express from 'express';
import { getArea } from '../controllers/areaController.js';

const router = express.Router();

/**
 * @swagger
 * /api/area:
 *   get:
 *     summary: Obtiene la lista de Areas
 *     tags: 
 *       - Areas
 *     responses:
 *       200:
 *         description: Lista de Areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_region:
 *                    type: integer
 *                   nombre:
 *                     type: string
 */

router.get('/area', getArea);

export default router;