import express from 'express';
import { getRegion } from '../controllers/regionController.js';

const router = express.Router();

/**
 * @swagger
 * /api/region:
 *   get:
 *     summary: Obtiene la lista de Regiones
 *     tags: 
 *       - Regiones
 *     responses:
 *       200:
 *         description: Lista de Regiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_region:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */


router.get('/region', getRegion);

export default router;