import express from 'express';
import { getConcept } from '../controllers/conceptController.js';

const router = express.Router();

/**
 * @swagger
 * /api/concept:
 *   get:
 *     summary: Obtiene la lista de Conceptos
 *     tags: 
 *       - Conceptos
 *     responses:
 *       200:
 *         description: Lista de Conceptos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_concepto:
 *                     type: integer
 *                   concepto:
 *                     type: string
 */

router.get('/concept', getConcept);

export default router;