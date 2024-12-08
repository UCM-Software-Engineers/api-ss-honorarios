import connection from '../db/connection.js';

export const getWorker = async (req, res) => {
  const { rut } = req.query;
  console.log(`Petición recibida para el RUT: ${rut}`);

  if (!rut) {
      return res.status(400).json({ message: 'El parámetro rut es obligatorio' });
  }

  const rutNumber = Number(rut);
  if (isNaN(rutNumber)) {
      return res.status(400).json({ message: 'El parámetro rut debe ser un número válido' });
  }

  try {
      // Realiza un JOIN para combinar datos de las tablas `honorario.funcionario` y `bdi.usuario`
      const query = `
          SELECT 
              hf.*, 
              u.nombre AS nombre_usuario,
              u.apellido_paterno,
              u.apellido_materno,
              u.email
          FROM honorario_funcionario hf
          INNER JOIN bdi_usuario u ON hf.id_usuario = u.id_usuario
          WHERE hf.rut_funcionario = ?
      `;
      
      const [results] = await connection.query(query, [rutNumber]);

      if (results.length === 0) {
          return res.status(404).json({ message: 'Funcionario no encontrado' });
      }

      // Construye la respuesta con los datos concatenados
      const funcionario = results[0];
      const nombreCompleto = `${funcionario.nombre_usuario} ${funcionario.apellido_paterno} ${funcionario.apellido_materno}`;

      const response = {
          id: funcionario.id_funcionario,
          rut: funcionario.rut_funcionario,
          nombreCompleto,
          sexo: funcionario.sexo,
          fechaNacimiento: funcionario.fecha_nacimiento,
          email: funcionario.email,
      };

      console.log(`Funcionario encontrado: ${JSON.stringify(response)}`);
      res.status(200).json(response);
  } catch (error) {
      console.error('Error al obtener los datos del funcionario:', error);
      res.status(500).json({ message: 'Error al obtener los datos del funcionario' });
  }
};
