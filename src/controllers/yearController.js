import connection from '../db/connection.js';

export const getYear = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM presupuesto_periodo');
        res.json(rows);
    } catch (error) {
        console.error('Error querying year:', error);
        res.status(500).json({ status: 'error', message: 'Error querying year' });
    }
}