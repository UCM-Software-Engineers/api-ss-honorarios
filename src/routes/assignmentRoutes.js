import express from 'express';
import { getAssignment } from '../controllers/assignmentController.js';

const router = express.Router();

/**
 * @swagger
 * /api/assignment:
 *   get:
 *     summary: Obtiene la lista de Asignaciones
 *     tags: 
 *       - Asignaciones
 *     responses:
 *       200:
 *         description: Lista de Asignaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_asignacion:
 *                     type: integer
 *                   id_item:
 *                     type: integer
 *                   asignacion:
 *                     type: string
 */

router.get('/assignment', getAssignment);

export default router;