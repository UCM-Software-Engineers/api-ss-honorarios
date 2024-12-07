import connection from "../db/connection.js";

export const getBudget = async (req, res) => {
  try {
    const [rows] = await connection.query(`
          SELECT 
            mp.id_movimiento_presupuestario AS id,
            s.subtitulo AS tipo_movimiento,
            s.subtitulo AS subtitulo,
            i.item AS item,
            a.asignacion AS asignacion,
            mp.monto AS monto,
            mp.glosa AS motivo,
            mp.fecha AS fecha_registro,
            r.nombre AS region
        FROM 
            sis_honorario_bbdd.presupuesto_movimiento_presupuestario mp
        JOIN 
            sis_honorario_bbdd.presupuesto_asignacion a ON mp.id_asignacion = a.id_asignacion
        JOIN 
            sis_honorario_bbdd.presupuesto_item i ON a.id_item = i.id_item
        JOIN 
            sis_honorario_bbdd.presupuesto_subtitulo s ON i.id_subtitulo = s.id_subtitulo
        JOIN 
            region r ON mp.id_region = r.id_region;
        `);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los presupuestos:", error);
    res.status(500).json({ error: "Error al obtener los presupuestos" });
  }
};


export const createBudget = async (req, res) => {
    const {
        año,
        id_region,
        monto,
        id_asignacion,
        id_subtitulo,
        id_item,
        id_concepto,
        motivo
    } = req.body;

    if (
        !año || !id_region || !monto || !id_asignacion || !id_subtitulo ||
        !id_item || !id_concepto || !motivo
    ) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        await connection.beginTransaction();

        // Verificar si existen las relaciones necesarias
        const [region] = await connection.query(
            "SELECT id_region FROM region WHERE id_region = ?",
            [id_region]
        );
        if (region.length === 0) throw new Error("Región no encontrada");

        const [subtitulo] = await connection.query(
            "SELECT id_subtitulo FROM presupuesto_subtitulo WHERE id_subtitulo = ?",
            [id_subtitulo]
        );
        if (subtitulo.length === 0) throw new Error("Subtítulo no encontrado");

        const [item] = await connection.query(
            "SELECT id_item FROM presupuesto_item WHERE id_item = ?",
            [id_item]
        );
        if (item.length === 0) throw new Error("Item no encontrado");

        const [asignacion] = await connection.query(
            "SELECT id_asignacion FROM presupuesto_asignacion WHERE id_asignacion = ?",
            [id_asignacion]
        );
        if (asignacion.length === 0) throw new Error("Asignación no encontrada");

        const [concepto] = await connection.query(
            "SELECT id_concepto FROM presupuesto_concepto WHERE id_concepto = ?",
            [id_concepto]
        );
        if (concepto.length === 0) throw new Error("Concepto no encontrado");

        // Insertar en movimiento presupuestario
        const [movimiento] = await connection.query(
            `INSERT INTO presupuesto_movimiento_presupuestario 
             (fecha, id_region, monto, id_asignacion, id_actividad_presupuestaria, id_concepto, glosa)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [new Date(año), id_region, monto, id_asignacion, id_item, id_concepto, motivo]
        );

        await connection.commit();

        res.status(201).json({
            message: "Presupuesto creado exitosamente",
            id: movimiento.insertId,
        });
    } catch (error) {
        await connection.rollback();
        console.error("Error al crear el presupuesto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteBudget = async (req, res) => {
    const { id_movimiento_presupuestario } = req.body;

    if (!id_movimiento_presupuestario) {
        return res.status(400).json({ error: "El ID del presupuesto es requerido" });
    }

    try {
        await connection.beginTransaction();

        // Verificar si el presupuesto existe
        const [movimiento] = await connection.query(
            "SELECT * FROM presupuesto_movimiento_presupuestario WHERE id_movimiento_presupuestario = ?",
            [id_movimiento_presupuestario]
        );

        if (movimiento.length === 0) {
            throw new Error("Presupuesto no encontrado");
        }

        const { id_asignacion, id_actividad_presupuestaria, id_concepto } = movimiento[0];

        // Eliminar el movimiento presupuestario
        await connection.query(
            "DELETE FROM presupuesto_movimiento_presupuestario WHERE id_movimiento_presupuestario = ?",
            [id_movimiento_presupuestario]
        );

        // Verificar si la asignación está referenciada en otras tablas
        const [asignacionReferencias] = await connection.query(
            `
            SELECT COUNT(*) AS count 
            FROM (
                SELECT id_asignacion FROM presupuesto_movimiento_presupuestario WHERE id_asignacion = ?
                UNION ALL
                SELECT id_asignacion FROM honorario_termino_referencia WHERE id_asignacion = ?
            ) AS referencias
            `,
            [id_asignacion, id_asignacion]
        );

        if (asignacionReferencias[0].count === 0) {
            await connection.query(
                "DELETE FROM presupuesto_asignacion WHERE id_asignacion = ?",
                [id_asignacion]
            );
        }

        // Verificar si la actividad presupuestaria está referenciada en otras tablas
        const [actividadReferencias] = await connection.query(
            `
            SELECT COUNT(*) AS count 
            FROM (
                SELECT id_actividad_presupuestaria FROM presupuesto_movimiento_presupuestario WHERE id_actividad_presupuestaria = ?
                UNION ALL
                SELECT id_actividad_presupuestaria FROM region_actividad_presupuestaria WHERE id_actividad_presupuestaria = ?
            ) AS referencias
            `,
            [id_actividad_presupuestaria, id_actividad_presupuestaria]
        );

        if (actividadReferencias[0].count === 0) {
            await connection.query(
                "DELETE FROM presupuesto_actividad_presupuestaria WHERE id_actividad_presupuestaria = ?",
                [id_actividad_presupuestaria]
            );
        }

        // Verificar si el concepto está referenciado en otros movimientos
        const [conceptoReferencias] = await connection.query(
            "SELECT COUNT(*) AS count FROM presupuesto_movimiento_presupuestario WHERE id_concepto = ?",
            [id_concepto]
        );

        if (conceptoReferencias[0].count === 0) {
            await connection.query(
                "DELETE FROM presupuesto_concepto WHERE id_concepto = ?",
                [id_concepto]
            );
        }

        // Confirmar la transacción
        await connection.commit();

        res.status(200).json({ message: "Presupuesto eliminado correctamente" });
    } catch (error) {
        await connection.rollback();
        console.error("Error al eliminar el presupuesto:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateBudget = async (req, res) => {
    const {
        id_movimiento_presupuestario,
        año,
        id_region,
        monto,
        id_asignacion,
        id_subtitulo,
        id_item,
        id_concepto,
        motivo
    } = req.body;

    // Validar que el ID del movimiento presupuestario y los campos requeridos existan
    if (
        !id_movimiento_presupuestario ||
        !año ||
        !id_region ||
        !monto ||
        !id_asignacion ||
        !id_subtitulo ||
        !id_item ||
        !id_concepto ||
        !motivo
    ) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        await connection.beginTransaction();

        // Verificar si el presupuesto existe
        const [movimiento] = await connection.query(
            "SELECT * FROM presupuesto_movimiento_presupuestario WHERE id_movimiento_presupuestario = ?",
            [id_movimiento_presupuestario]
        );

        if (movimiento.length === 0) {
            throw new Error("Presupuesto no encontrado");
        }

        // Actualizar la tabla `movimiento_presupuestario`
        await connection.query(
            `UPDATE presupuesto_movimiento_presupuestario
             SET 
                fecha = ?, 
                id_region = ?, 
                monto = ?, 
                id_asignacion = ?, 
                id_concepto = ?, 
                glosa = ?
             WHERE id_movimiento_presupuestario = ?`,
            [año, id_region, monto, id_asignacion, id_concepto, motivo, id_movimiento_presupuestario]
        );

        // Confirmar la transacción
        await connection.commit();

        res.status(200).json({ message: "Presupuesto actualizado correctamente" });
    } catch (error) {
        await connection.rollback();
        console.error("Error al actualizar el presupuesto:", error.message);
        res.status(500).json({ error: error.message });
    }
};


  
  