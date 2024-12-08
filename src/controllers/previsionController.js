import connection from '../db/connection.js';

export const getPrevision = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM bienestar_plan_salud');
        res.json(rows);
    } catch (error) {
        console.error('Error querying prevision:', error);
        res.status(500).json({ status: 'error', message: 'Error querying prevision' });
    }
}