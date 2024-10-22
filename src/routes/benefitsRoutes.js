import express from 'express';
import { getBenefits } from '../controllers/benefitsController.js';

const router = express.Router();

/**
 * @swagger
 * /api/benefits:
 *   get:
 *     summary: Obtiene la lista de Beneficios
 *     tags: 
 *       - Beneficios
 *     responses:
 *       200:
 *         description: Lista de Beneficios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_beneficio:
 *                     type: integer
 *                   beneficio:
 *                     type: string
 */

router.get('/benefits', getBenefits);

export default router;