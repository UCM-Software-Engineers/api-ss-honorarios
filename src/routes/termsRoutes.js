import express from 'express';
import { getTerms, createTerm, deleteTerm, updateTerm } from '../controllers/termsController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Terminos de referencia
 *     description: (Está en desarrollo aún)
 *
 * /api/terms:
 *   get:
 *     summary: Obtiene la lista de términos de referencia
 *     tags:
 *       - Terminos de referencia
 *     responses:
 *       200:
 *         description: Lista de términos de referencia
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_termino_referencia:
 *                     type: integer
 *                   id_funcionario:
 *                     type: integer
 *                   id_plan_salud:
 *                     type: integer
 *                   id_mutual:
 *                     type: integer
 *                   id_afp:
 *                     type: integer
 *                   id_comuna:
 *                     type: integer
 *                   id_region:
 *                     type: integer
 *                   id_asignacion:
 *                     type: integer
 *                   rut_prestador:
 *                     type: string
 *                   agente_publico:
 *                     type: boolean
 *                   monto_consultoria:
 *                     type: number
 *                     format: float
 *                   contrato_otra_institucion:
 *                     type: boolean
 *                   objetivo_contrato:
 *                     type: string
 *                   calle_direccion:
 *                     type: string
 *                   numero_direccion:
 *                     type: string
 *                   numero_departamento_direccion:
 *                     type: string
 *                   fecha_termino_contrato:
 *                     type: string
 *                     format: date-time
 *                   fecha_inicio_contrato:
 *                     type: string
 *                     format: date-time
 *
 * /api/create-term:
 *   post:
 *     summary: Crea un nuevo término de referencia
 *     tags:
 *       - Terminos de referencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_funcionario:
 *                 type: integer
 *               id_plan_salud:
 *                 type: integer
 *               id_mutual:
 *                 type: integer
 *               id_afp:
 *                 type: integer
 *               id_comuna:
 *                 type: integer
 *               id_region:
 *                 type: integer
 *               id_asignacion:
 *                 type: integer
 *               rut_prestador:
 *                 type: string
 *               agente_publico:
 *                 type: boolean
 *               monto_consultoria:
 *                 type: number
 *                 format: float
 *               contrato_otra_institucion:
 *                 type: boolean
 *               objetivo_contrato:
 *                 type: string
 *               calle_direccion:
 *                 type: string
 *               numero_direccion:
 *                 type: string
 *               numero_departamento_direccion:
 *                 type: string
 *               fecha_termino_contrato:
 *                 type: string
 *                 format: date-time
 *               fecha_inicio_contrato:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Término de referencia creado
 *
 * /api/delete-term:
 *   delete:
 *     summary: Elimina un término de referencia
 *     tags:
 *       - Terminos de referencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Término de referencia eliminado
 *
 * /api/update-term:
 *   put:
 *     summary: Actualiza un término de referencia
 *     tags:
 *       - Terminos de referencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               id_funcionario:
 *                 type: integer
 *               id_plan_salud:
 *                 type: integer
 *               id_mutual:
 *                 type: integer
 *               id_afp:
 *                 type: integer
 *               id_comuna:
 *                 type: integer
 *               id_region:
 *                 type: integer
 *               id_asignacion:
 *                 type: integer
 *               rut_prestador:
 *                 type: string
 *               agente_publico:
 *                 type: boolean
 *               monto_consultoria:
 *                 type: number
 *                 format: float
 *               contrato_otra_institucion:
 *                 type: boolean
 *               objetivo_contrato:
 *                 type: string
 *               calle_direccion:
 *                 type: string
 *               numero_direccion:
 *                 type: string
 *               numero_departamento_direccion:
 *                 type: string
 *               fecha_termino_contrato:
 *                 type: string
 *                 format: date-time
 *               fecha_inicio_contrato:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Término de referencia actualizado
 */

router.get('/terms', getTerms);
router.post('/create-term', createTerm);
router.delete('/delete-term', deleteTerm);
router.put('/update-term', updateTerm);

export default router;
