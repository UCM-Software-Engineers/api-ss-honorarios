import express from 'express';
import { getGrade } from '../controllers/gradeController.js';

const router = express.Router();

/**
 * @swagger
 * /api/estament:
 *   get:
 *     summary: Obtiene la lista de Grado académico
 *     tags: 
 *       - Grado académico
 *     responses:
 *       200:
 *         description: Lista de Grado académico
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_nivel_educacional:
 *                     type: integer
 *                   nivel_educacional:
 *                     type: string
 */


router.get('/grade', getGrade);

export default router;