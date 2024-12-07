import express from 'express';
import { getBudget, createBudget, deleteBudget, updateBudget } from '../controllers/budgetController.js';

const router = express.Router();

/**
 * @swagger
 *  tags:
 *   - name: Presupuestos
 *     description: Endpoints de presupuestos
 * 
 * /api/budgets:
 *   get:
 *     summary: Obtener todos los presupuestos
 *     tags:
 *       - Presupuestos
 *     responses:
 *       200:
 *         description: Lista de presupuestos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_movimiento_presupuestario:
 *                     type: integer
 *                   tipo_movimiento:
 *                     type: string
 *                   subtitulo:
 *                     type: string
 *                   item:
 *                     type: string
 *                   asignacion:
 *                     type: string
 *                   monto:
 *                     type: number
 *                   motivo:
 *                     type: string
 *                   fecha_registro:
 *                     type: string
 *                     format: date
 *                   region:
 *                     type: string
 *
 *
 * /api/create-budget:
 *   post:
 *     summary: Crear un nuevo presupuesto
 *     tags:
 *       - Presupuestos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               año:
 *                 type: string
 *                 format: date
 *               id_region:
 *                 type: integer
 *               monto:
 *                 type: number
 *               id_asignacion:
 *                 type: integer
 *               id_subtitulo:
 *                 type: integer
 *               id_item:
 *                 type: integer
 *               id_concepto:
 *                 type: integer
 *               motivo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Presupuesto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *
 * /api/delete-budget:
 *   delete:
 *     summary: Eliminar un presupuesto
 *     tags:
 *       - Presupuestos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_movimiento_presupuestario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Presupuesto eliminado exitosamente
 *       400:
 *         description: Error de validacion
 *       500:
 *         description: Error al eliminar el presupuesto
 *
 *
 * /api/update-budget:
 *   put:
 *     summary: Actualizar un presupuesto existente
 *     tags:
 *       - Presupuestos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_movimiento_presupuestario:
 *                 type: integer
 *               año:
 *                 type: string
 *                 format: date
 *               id_region:
 *                 type: integer
 *               monto:
 *                 type: number
 *               id_asignacion:
 *                 type: integer
 *               id_subtitulo:
 *                 type: integer
 *               id_item:
 *                 type: integer
 *               id_concepto:
 *                 type: integer
 *               motivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Presupuesto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error de validacion
 *       500:
 *         description: Error al actualizar el presupuesto
 */



router.get('/budget', getBudget);
router.post('/create-budget', createBudget);
router.delete('/delete-budget', deleteBudget);
router.put('/update-budget', updateBudget);

export default router;
