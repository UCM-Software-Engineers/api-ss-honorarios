import express from 'express';
import { getWorker } from '../controllers/workerController.js';

const router = express.Router();


/**
 * @swagger
 * /api/worker:
 *   get:
 *     summary: Obtiene a un funcionario
 *     tags: 
 *       - Funcionario
 *     parameters:
 *       - name: rut
 *         in: query
 *         description: RUT del funcionario a buscar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Obtiene a un funcionario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_funcionario:
 *                   type: integer
 *                 id_pais:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 rut_funcionario:
 *                   type: integer
 *                 sexo:
 *                   type: string
 *                 fecha_nacimiento:
 *                   type: string
 *                 
 *       400:
 *         description: El parámetro rut es obligatorio o es inválido
 *       404:
 *         description: Funcionario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/worker', getWorker);

export default router;


