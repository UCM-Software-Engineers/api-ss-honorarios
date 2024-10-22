import express from 'express';
import { getEstament } from '../controllers/estamentController.js';

const router = express.Router();

/**
 * @swagger
 * /api/estament:
 *   get:
 *     summary: Obtiene la lista de Tipo de Funciones
 *     tags: 
 *       - Tipos de Funciones
 *     responses:
 *       200:
 *         description: Lista de Tipo de Funciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tipo_funcion:
 *                     type: integer
 *                   tipo_funcion:
 *                     type: string
 */


router.get('/estament', getEstament);

export default router;