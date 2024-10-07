import connection from '../db/connection.js';

export const getEstament = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM honorario_tipo_funcion');
        res.json(rows);
    } catch (error) {
        console.error('Error querying Estament:', error);
        res.status(500).json({ status: 'error', message: 'Error querying Estament' });
    }
}