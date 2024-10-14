import express from 'express';
import { getAfp } from '../controllers/afpController.js';

const router = express.Router();
/**
 * @swagger
 * /api/afp:
 *   get:
 *     summary: Obtiene la lista de AFPs
 *     tags: 
 *       - AFP
 *     responses:
 *       200:
 *         description: Lista de AFPs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */

router.get('/afp', getAfp);

export default router;