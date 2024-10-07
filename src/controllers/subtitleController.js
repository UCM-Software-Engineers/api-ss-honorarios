import connection from '../db/connection.js';

export const getSubtitle = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM region');
        res.json(rows);
    } catch (error) {
        console.error('Error querying subtitle:', error);
        res.status(500).json({ status: 'error', message: 'Error querying subtitle' });
    }
}