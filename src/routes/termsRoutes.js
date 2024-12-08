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
 *                     description: ID del término de referencia
 *                   id_funcionario:
 *                     type: integer
 *                     description: ID del funcionario asociado
 *                   id_plan_salud:
 *                     type: integer
 *                     description: ID del plan de salud asociado
 *                   id_mutual:
 *                     type: integer
 *                     description: ID de la mutualidad asociada
 *                   id_afp:
 *                     type: integer
 *                     description: ID de la AFP asociada
 *                   id_comuna:
 *                     type: integer
 *                     description: ID de la comuna del domicilio
 *                   id_region:
 *                     type: integer
 *                     description: ID de la región del domicilio
 *                   id_asignacion:
 *                     type: integer
 *                     description: ID de la asignación presupuestaria
 *                   agente_publico:
 *                     type: boolean
 *                     description: Indica si el funcionario es agente público
 *                   monto_consultoria:
 *                     type: number
 *                     format: float
 *                     description: Monto total de la consultoría
 *                   contrato_otra_institucion:
 *                     type: boolean
 *                     description: Indica si el funcionario tiene contrato con otra institución
 *                   objetivo_contrato:
 *                     type: string
 *                     description: Objetivo del contrato
 *                   calle_direccion:
 *                     type: string
 *                     description: Calle del domicilio
 *                   numero_direccion:
 *                     type: string
 *                     description: Número de la dirección
 *                   numero_departamento_direccion:
 *                     type: string
 *                     nullable: true
 *                     description: Número del departamento, si aplica
 *                   fecha_termino_contrato:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de término del contrato
 *                   fecha_inicio_contrato:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de inicio del contrato
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error

 *
* /api/create-term:
 *   post:
 *     summary: Crea un nuevo término de referencia
 *     tags:
 *        - Terminos de referencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_pais
 *               - email
 *               - agente_publico
 *               - contrato_otra_institucion
 *               - id_afp
 *               - id_plan_salud
 *               - id_mutual
 *               - id_region
 *               - id_comuna
 *               - calle_direccion
 *               - numero_direccion
 *               - antecedentes_academicos
 *               - id_tipo_funcion
 *               - id_area
 *               - resumen_funcion
 *               - objetivo_contrato
 *               - monto_consultoria
 *               - productos
 *               - id_subtitulo
 *               - id_item
 *               - id_asignacion
 *               - fecha_inicio_contrato
 *               - fecha_termino_contrato
 *               - beneficios
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 description: ID del usuario asociado al término de referencia
 *               id_pais:
 *                 type: integer
 *                 description: ID del país asociado al funcionario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo institucional del funcionario
 *               agente_publico:
 *                 type: boolean
 *                 description: Indica si el funcionario es agente público
 *               contrato_otra_institucion:
 *                 type: boolean
 *                 description: Indica si el funcionario tiene contrato con otra institución
 *               id_afp:
 *                 type: integer
 *                 description: ID de la AFP asociada
 *               id_plan_salud:
 *                 type: integer
 *                 description: ID del plan de salud asociado
 *               id_mutual:
 *                 type: integer
 *                 description: ID de la mutualidad asociada
 *               id_region:
 *                 type: integer
 *                 description: ID de la región del domicilio del funcionario
 *               id_comuna:
 *                 type: integer
 *                 description: ID de la comuna del domicilio del funcionario
 *               calle_direccion:
 *                 type: string
 *                 description: Calle del domicilio del funcionario
 *               numero_direccion:
 *                 type: string
 *                 description: Número de la dirección del domicilio
 *               numero_departamento_direccion:
 *                 type: string
 *                 nullable: true
 *                 description: Número del departamento del domicilio, si aplica
 *               antecedentes_academicos:
 *                 type: array
 *                 description: Lista de antecedentes académicos del funcionario
 *                 items:
 *                   type: object
 *                   properties:
 *                     gradoAcademico:
 *                       type: integer
 *                       description: ID del grado académico
 *                     finalizado:
 *                       type: boolean
 *                       description: Indica si el grado académico fue finalizado
 *                     institucion:
 *                       type: string
 *                       description: Institución donde se cursó el grado académico
 *                     fechaTitulo:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de titulación
 *                     duracion:
 *                       type: string
 *                       description: Duración del programa
 *                     nombreCarrera:
 *                       type: string
 *                       description: Nombre de la carrera
 *               id_tipo_funcion:
 *                 type: integer
 *                 description: ID del tipo de función del funcionario
 *               id_area:
 *                 type: integer
 *                 description: ID del área asociada a las funciones
 *               resumen_funcion:
 *                 type: string
 *                 description: Resumen de las funciones desempeñadas
 *               objetivo_contrato:
 *                 type: string
 *                 description: Objetivo del contrato
 *               monto_consultoria:
 *                 type: number
 *                 format: float
 *                 description: Monto total de la consultoría
 *               productos:
 *                 type: array
 *                 description: Lista de productos esperados de la consultoría
 *                 items:
 *                   type: object
 *                   properties:
 *                     descripcionProducto:
 *                       type: string
 *                       description: Descripción del producto
 *               id_subtitulo:
 *                 type: integer
 *                 description: ID del subtítulo presupuestario
 *               id_item:
 *                 type: integer
 *                 description: ID del ítem presupuestario
 *               id_asignacion:
 *                 type: integer
 *                 description: ID de la asignación presupuestaria
 *               fecha_inicio_contrato:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de inicio del contrato
 *               fecha_termino_contrato:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de término del contrato
 *               beneficios:
 *                 type: array
 *                 description: Array indicando los beneficios seleccionados
 *                 items:
 *                   type: boolean
 *     responses:
 *       201:
 *         description: Término de referencia creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la operación
 *                 id:
 *                   type: integer
 *                   description: ID del término de referencia creado
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *
 * /api/delete-term:
 *   delete:
 *     summary: Elimina un término de referencia
 *     tags:
 *        - Terminos de referencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del término de referencia a eliminar
 *     responses:
 *       200:
 *         description: Término de referencia eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la operación
 *       404:
 *         description: Término de referencia no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       400:
 *         description: Error de validación de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error

 *
* /api/update-term:
 *   put:
 *     summary: Actualiza un término de referencia
 *     tags:
 *        - Terminos de referencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_termino_referencia
 *             properties:
 *               id_termino_referencia:
 *                 type: integer
 *                 description: ID del término de referencia a actualizar
 *               id_funcionario:
 *                 type: integer
 *                 description: ID del funcionario asociado
 *               id_plan_salud:
 *                 type: integer
 *                 description: ID del plan de salud asociado
 *               id_mutual:
 *                 type: integer
 *                 description: ID de la mutualidad asociada
 *               id_afp:
 *                 type: integer
 *                 description: ID de la AFP asociada
 *               id_comuna:
 *                 type: integer
 *                 description: ID de la comuna del domicilio del funcionario
 *               id_region:
 *                 type: integer
 *                 description: ID de la región del domicilio del funcionario
 *               id_asignacion:
 *                 type: integer
 *                 description: ID de la asignación presupuestaria
 *               agente_publico:
 *                 type: boolean
 *                 description: Indica si el funcionario es agente público
 *               contrato_otra_institucion:
 *                 type: boolean
 *                 description: Indica si el funcionario tiene contrato con otra institución
 *               monto_consultoria:
 *                 type: number
 *                 format: float
 *                 description: Monto total de la consultoría
 *               objetivo_contrato:
 *                 type: string
 *                 description: Objetivo del contrato
 *               calle_direccion:
 *                 type: string
 *                 description: Calle del domicilio del funcionario
 *               numero_direccion:
 *                 type: string
 *                 description: Número de la dirección del domicilio
 *               numero_departamento_direccion:
 *                 type: string
 *                 nullable: true
 *                 description: Número del departamento del domicilio, si aplica
 *               fecha_termino_contrato:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de término del contrato
 *               fecha_inicio_contrato:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de inicio del contrato
 *               actividades:
 *                 type: array
 *                 description: Lista de actividades asociadas al término de referencia
 *                 items:
 *                   type: object
 *                   properties:
 *                     descripcion:
 *                       type: string
 *                       description: Descripción de la actividad
 *               productos:
 *                 type: array
 *                 description: Lista de productos esperados de la consultoría
 *                 items:
 *                   type: object
 *                   properties:
 *                     descripcionProducto:
 *                       type: string
 *                       description: Descripción del producto
 *               beneficios:
 *                 type: array
 *                 description: Array indicando los beneficios seleccionados
 *                 items:
 *                   type: boolean
 *               antecedentes_academicos:
 *                 type: array
 *                 description: Lista de antecedentes académicos del funcionario
 *                 items:
 *                   type: object
 *                   properties:
 *                     gradoAcademico:
 *                       type: integer
 *                       description: ID del grado académico
 *                     finalizado:
 *                       type: boolean
 *                       description: Indica si el grado académico fue finalizado
 *                     institucion:
 *                       type: string
 *                       description: Institución donde se cursó el grado académico
 *                     fechaTitulo:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de titulación
 *                     duracion:
 *                       type: string
 *                       description: Duración del programa
 *                     nombreCarrera:
 *                       type: string
 *                       description: Nombre de la carrera
 *     responses:
 *       200:
 *         description: Término de referencia actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la operación
 *       404:
 *         description: Término de referencia no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       400:
 *         description: Error de validación de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
*/

router.get('/terms', getTerms);
router.post('/create-term', createTerm);
router.delete('/delete-term', deleteTerm);
router.put('/update-term', updateTerm);

export default router;
