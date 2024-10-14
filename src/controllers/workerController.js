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
      const [results] = await connection.query('SELECT * FROM honorario_funcionario WHERE rut_funcionario = ?', [rutNumber]);
      if (results.length === 0) {
        res.status(404).json({ message: 'Funcionario no encontrado' });
      } else {
        console.log(`Funcionario encontrado: ${JSON.stringify(results[0])}`);
        res.status(200).json(results[0]);
      }
    } catch (error) {
      console.error('Error al obtener los datos del funcionario:', error);
      res.status(500).json({ message: 'Error al obtener los datos del funcionario' });
    }
  };