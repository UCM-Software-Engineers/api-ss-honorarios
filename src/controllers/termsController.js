import connection from "../db/connection.js";
import { requiredFields } from "../constants/requiredFields.js";

export const getTerms = async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM honorario_termino_referencia"
    );
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los términos de referencia" });
  }
};

export const createTerm = async (req, res) => {
  const termData = req.body;
  const missingFields = requiredFields.filter(
    (field) => !termData.hasOwnProperty(field)
  );

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({
        error: `Faltan los siguientes campos requeridos: ${missingFields.join(
          ", "
        )}`,
      });
  }

  try {
    await connection.beginTransaction();
    const [termResult] = await connection.query(
      "INSERT INTO honorario_termino_referencia SET ?",
      termData
    );
    const newId = termResult.insertId;

    if (termData.actividades) {
      for (const actividad of termData.actividades) {
        const actividadData = {
          id_termino_referencia: newTermId,
          descripcion: actividad.descripcion,
          // Agrega más campos según lo necesario
        };
        await connection.query(
          "INSERT INTO honorario_actividad SET ?",
          actividadData
        );
      }
    }

    if (termData.productos) {
      for (const producto of termData.productos) {
        const productoData = {
          id_termino_referencia: newTermId,
          nombre_producto: producto.nombre_producto,
          // Agrega más campos según lo necesario
        };
        await connection.query(
          "INSERT INTO honorario_producto SET ?",
          productoData
        );
      }
    }

    await connection.commit();

    res.status(201).json({ status: "Término de referencia creado", id: newId });
  } catch (error) {
    // Revertir la transacción si algo falla
    await connection.rollback();
    console.error("Error al crear el término de referencia:", error);
    res.status(500).json({ error: "Error al crear el término de referencia" });
  }
};

export const deleteTerm = async (req, res) => {
  const { id } = req.body;

  if (!id || typeof id !== "number" || id <= 0) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const [rows] = await connection.query(
      "SELECT * FROM honorario_termino_referencia WHERE id_termino_referencia = ?",
      [id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Término de referencia no encontrado" });
    }

    await connection.query(
      "DELETE FROM honorario_termino_referencia WHERE id_termino_referencia = ?",
      [id]
    );
    res.status(200).json({ status: "Término de referencia eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el término de referencia" });
  }
};

export const updateTerm = async (req, res) => {
  const { id_termino_referencia, ...termData } = req.body;
  console.log("Datos recibidos:", req.body);

  if (!id_termino_referencia || typeof id_termino_referencia !== "number") {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (Object.keys(termData).length === 0) {
    return res
      .status(400)
      .json({ error: "No se proporcionaron datos para actualizar" });
  }

  try {
    const [rows] = await connection.query(
      "SELECT * FROM honorario_termino_referencia WHERE id_termino_referencia = ?",
      [id_termino_referencia]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Término de referencia no encontrado" });
    }

    console.log("Datos a actualizar:", termData);

    const updateQuery = `
        UPDATE honorario_termino_referencia
        SET id_funcionario = ?,
            id_plan_salud = ?,
            id_mutual = ?,
            id_afp = ?,
            id_comuna = ?,
            id_region = ?,
            id_asignacion = ?,
            rut_prestador = ?,
            agente_publico = ?,
            contrato_otra_institucion = ?,
            monto_consultoria = ?,
            objetivo_contrato = ?,
            calle_direccion = ?,
            numero_direccion = ?,
            numero_departamento_direccion = ?,
            fecha_termino_contrato = ?,
            fecha_inicio_contrato = ?
        WHERE id_termino_referencia = ?`;

    const updateValues = [
      termData.id_funcionario,
      termData.id_plan_salud,
      termData.id_mutual,
      termData.id_afp,
      termData.id_comuna,
      termData.id_region,
      termData.id_asignacion,
      termData.rut_prestador,
      termData.agente_publico,
      termData.contrato_otra_institucion,
      termData.monto_consultoria,
      termData.objetivo_contrato,
      termData.calle_direccion,
      termData.numero_direccion,
      termData.numero_departamento_direccion,
      termData.fecha_termino_contrato,
      termData.fecha_inicio_contrato,
      id_termino_referencia,
    ];

    const [updateResult] = await connection.query(updateQuery, updateValues);

    console.log("Resultado de la actualización:", updateResult);

    res.status(200).json({ status: "Término de referencia actualizado" });
  } catch (error) {
    console.error("Error al actualizar el término de referencia:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar el término de referencia" });
  }
};
