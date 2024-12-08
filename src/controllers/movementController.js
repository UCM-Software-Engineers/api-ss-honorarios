import connection from '../db/connection.js';

export const getMovement = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM presupuesto_movimiento_presupuestario');
        res.json(rows);
    } catch (error) {
        console.error('Error querying movement:', error);
        res.status(500).json({ status: 'error', message: 'Error querying movement' });
    }
}