import express from 'express';
import { getCity } from '../controllers/cityController.js';

const router = express.Router();

/**
 * @swagger
 * /api/city:
 *   get:
 *     summary: Obtiene la lista de Ciudades
 *     tags: 
 *       - Ciudades
 *     responses:
 *       200:
 *         description: Lista de Ciudades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_comuna:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */

router.get('/city', getCity);

export default router;