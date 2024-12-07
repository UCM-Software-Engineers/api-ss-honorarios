import express from 'express';
import { getNationality } from '../controllers/nationalityController.js';

const router = express.Router();

/**
 * @swagger
 * /api/nationality:
 *   get:
 *     summary: Obtiene la lista de Nacionalidades
 *     tags: 
 *       - Nacionalidades
 *     responses:
 *       200:
 *         description: Lista de Nacionalidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_pais:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */


router.get('/nationality', getNationality);

export default router;