import connection from '../db/connection.js';

export const getAssignment = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM bienestar_afp');
        res.json(rows);
    } catch (error) {
        console.error('Error querying assignment:', error);
        res.status(500).json({ status: 'error', message: 'Error querying assignment' });
    }
}