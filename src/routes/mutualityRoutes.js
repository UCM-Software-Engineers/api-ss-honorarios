import express from 'express';
import { getMutuality } from '../controllers/mutualityController.js';

const router = express.Router();

/**
 * @swagger
 * /api/mutuality:
 *   get:
 *     summary: Obtiene la lista de mutualidades
 *     tags: 
 *       - Mutualidades
 *     responses:
 *       200:
 *         description: Lista de mutualidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_mutual:
 *                     type: integer
 *                   mutual:
 *                     type: string
 */


router.get('/mutuality', getMutuality);

export default router;