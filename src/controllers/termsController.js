import connection from "../db/connection.js";

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
  const requiredFields = [
      'id_usuario',
      'id_pais',
      'email',
      'agente_publico',
      'contrato_otra_institucion',
      'id_afp',
      'id_plan_salud',
      'id_mutual',
      'id_region',
      'id_comuna',
      'calle_direccion',
      'numero_direccion',
      'numero_direccion_2',
      'antecedentes_academicos',
      'id_tipo_funcion',
      'id_area',
      'resumen_funcion',
      'objetivo_contrato',
      'monto_consultoria',
      'productos',
      'id_asignacion',
      'fecha_inicio_contrato',
      'fecha_termino_contrato',
      'beneficios', // Array de beneficios
      'rut_prestador'
  ];

  const missingFields = requiredFields.filter(
      (field) => !termData.hasOwnProperty(field)
  );

  if (missingFields.length > 0) {
      return res.status(400).json({
          error: `Faltan los siguientes campos requeridos: ${missingFields.join(", ")}`,
      });
  }

  try {
      await connection.beginTransaction();

      const [funcionarioResult] = await connection.query(
          'SELECT id_funcionario FROM honorario_funcionario WHERE id_usuario = ?',
          [termData.id_usuario]
      );

      if (funcionarioResult.length === 0) {
          throw new Error('Funcionario no encontrado');
      }

      const idFuncionario = funcionarioResult[0].id_funcionario;

      await connection.query(
          'UPDATE honorario_funcionario SET id_pais = ? WHERE id_funcionario = ?',
          [termData.id_pais, idFuncionario]
      );

      const terminoReferenciaData = {
          id_funcionario: idFuncionario,
          rut_prestador: termData.rut_prestador,
          agente_publico: termData.agente_publico ? 1 : 0,
          contrato_otra_institucion: termData.contrato_otra_institucion ? 1 : 0,
          id_afp: termData.id_afp,
          id_plan_salud: termData.id_plan_salud,
          id_mutual: termData.id_mutual,
          id_region: termData.id_region,
          id_comuna: termData.id_comuna,
          calle_direccion: termData.calle_direccion,
          numero_direccion: termData.numero_direccion,
          numero_departamento_direccion: termData.numero_direccion_2,
          objetivo_contrato: termData.objetivo_contrato,
          monto_consultoria: termData.monto_consultoria,
          id_asignacion: termData.id_asignacion,
          fecha_inicio_contrato: termData.fecha_inicio_contrato,
          fecha_termino_contrato: termData.fecha_termino_contrato
      };

      const [termResult] = await connection.query(
          'INSERT INTO honorario_termino_referencia SET ?',
          terminoReferenciaData
      );

      const newTermId = termResult.insertId;

      if (termData.beneficios && Array.isArray(termData.beneficios)) {
          for (let i = 0; i < termData.beneficios.length; i++) {
              if (termData.beneficios[i]) {
                  const beneficioData = {
                      id_termino_referencia: newTermId,
                      id_beneficio: i + 1 
                  };

                  await connection.query(
                      'INSERT INTO honorario_termino_referencia_beneficio SET ?',
                      beneficioData
                  );
              }
          }
      }

      await connection.commit();

      res.status(201).json({ status: "Término de referencia creado", id: newTermId });
  } catch (error) {
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
      return res.status(404).json({ error: "Término de referencia no encontrado" });
    }

    await connection.beginTransaction();

    // 1. Eliminar actividades asociadas
    await connection.query(
      "DELETE FROM honorario_actividad WHERE id_termino_referencia = ?",
      [id]
    );

    // 2. Eliminar productos asociados
    await connection.query(
      "DELETE FROM honorario_producto WHERE id_termino_referencia = ?",
      [id]
    );

    // 3. Eliminar beneficios asociados
    await connection.query(
      "DELETE FROM honorario_termino_referencia_beneficio WHERE id_termino_referencia = ?",
      [id]
    );

    // 4. Eliminar antecedentes académicos a través de la relación con documentación
    const [documentacionRows] = await connection.query(
      "SELECT id_documentacion FROM honorario_documentacion WHERE id_termino_referencia = ?",
      [id]
    );

    const documentacionIds = documentacionRows.map((doc) => doc.id_documentacion);

    if (documentacionIds.length > 0) {
      await connection.query(
        "DELETE FROM honorario_antecedentes_academicos WHERE id_documentacion IN (?)",
        [documentacionIds]
      );
      await connection.query(
        "DELETE FROM honorario_documentacion WHERE id_documentacion IN (?)",
        [documentacionIds]
      );
    }

    // 5. Eliminar función asociada
    await connection.query(
      "DELETE FROM honorario_funcion WHERE id_termino_referencia = ?",
      [id]
    );

    // 6. Eliminar el registro principal
    await connection.query(
      "DELETE FROM honorario_termino_referencia WHERE id_termino_referencia = ?",
      [id]
    );

    // Confirmar transacción
    await connection.commit();

    res.status(200).json({ status: "Término de referencia eliminado" });
  } catch (error) {
    await connection.rollback();
    console.error("Error al eliminar el término de referencia:", error);
    res.status(500).json({ error: "Error al eliminar el término de referencia" });
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
    // Verificar si el término de referencia existe
    const [rows] = await connection.query(
      "SELECT * FROM honorario_termino_referencia WHERE id_termino_referencia = ?",
      [id_termino_referencia]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Término de referencia no encontrado" });
    }

    // Iniciar transacción
    await connection.beginTransaction();

    // Actualizar los datos principales
    const updateQuery = `
        UPDATE honorario_termino_referencia
        SET id_funcionario = ?,
            id_plan_salud = ?,
            id_mutual = ?,
            id_afp = ?,
            id_comuna = ?,
            id_region = ?,
            id_asignacion = ?,
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
      termData.agente_publico ? 1 : 0,
      termData.contrato_otra_institucion ? 1 : 0,
      termData.monto_consultoria,
      termData.objetivo_contrato,
      termData.calle_direccion,
      termData.numero_direccion,
      termData.numero_departamento_direccion || null,
      termData.fecha_termino_contrato,
      termData.fecha_inicio_contrato,
      id_termino_referencia,
    ];

    await connection.query(updateQuery, updateValues);

    // Actualizar actividades
    if (termData.actividades && Array.isArray(termData.actividades)) {
      await connection.query(
        "DELETE FROM honorario_actividad WHERE id_termino_referencia = ?",
        [id_termino_referencia]
      );
      for (const actividad of termData.actividades) {
        await connection.query(
          "INSERT INTO honorario_actividad (id_termino_referencia, descripcion) VALUES (?, ?)",
          [id_termino_referencia, actividad.descripcion]
        );
      }
    }

    // Actualizar productos
    if (termData.productos && Array.isArray(termData.productos)) {
      await connection.query(
        "DELETE FROM honorario_producto WHERE id_termino_referencia = ?",
        [id_termino_referencia]
      );
      for (const producto of termData.productos) {
        await connection.query(
          "INSERT INTO honorario_producto (id_termino_referencia, nombre_producto) VALUES (?, ?)",
          [id_termino_referencia, producto.descripcionProducto]
        );
      }
    }

    // Actualizar beneficios
    if (termData.beneficios && Array.isArray(termData.beneficios)) {
      await connection.query(
        "DELETE FROM honorario_termino_referencia_beneficio WHERE id_termino_referencia = ?",
        [id_termino_referencia]
      );
      termData.beneficios.forEach((isSelected, index) => {
        if (isSelected) {
          const id_beneficio = index + 1; // Asumiendo índices de 1 a N
          connection.query(
            "INSERT INTO honorario_termino_referencia_beneficio (id_termino_referencia, id_beneficio) VALUES (?, ?)",
            [id_termino_referencia, id_beneficio]
          );
        }
      });
    }

    // Actualizar antecedentes académicos
    if (termData.antecedentesAcademicos && Array.isArray(termData.antecedentesAcademicos)) {
      await connection.query(
        "DELETE FROM honorario_antecedentes_academicos WHERE id_termino_referencia = ?",
        [id_termino_referencia]
      );
      for (const antecedente of termData.antecedentesAcademicos) {
        await connection.query(
          `INSERT INTO honorario_antecedentes_academicos 
           (id_termino_referencia, id_nivel_educacional, finalizado, institucion, fecha_egreso, semestre, nombre_estudio) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            id_termino_referencia,
            antecedente.gradoAcademico,
            antecedente.finalizado ? 1 : 0,
            antecedente.institucion,
            antecedente.fechaTitulo,
            antecedente.duracion || null,
            antecedente.nombreCarrera,
          ]
        );
      }
    }

    // Actualizar función
    if (termData.tipoFuncion && termData.regionFuncion && termData.areaFuncion) {
      await connection.query(
        "DELETE FROM honorario_funcion WHERE id_termino_referencia = ?",
        [id_termino_referencia]
      );
      await connection.query(
        `INSERT INTO honorario_funcion 
         (id_termino_referencia, id_tipo_funcion, id_region, id_area, resumen_funcion) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          id_termino_referencia,
          termData.tipoFuncion,
          termData.regionFuncion,
          termData.areaFuncion,
          termData.resumenFunciones,
        ]
      );
    }

    // Confirmar transacción
    await connection.commit();

    res.status(200).json({ status: "Término de referencia actualizado" });
  } catch (error) {
    // Revertir transacción en caso de error
    await connection.rollback();
    console.error("Error al actualizar el término de referencia:", error);
    res.status(500).json({ error: "Error al actualizar el término de referencia" });
  }
};
