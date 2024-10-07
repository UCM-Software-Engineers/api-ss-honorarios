import connection from '../db/connection.js';

export const getMutuality = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM bienestar_mutual');
        res.json(rows);
    } catch (error) {
        console.error('Error querying mutuality:', error);
        res.status(500).json({ status: 'error', message: 'Error querying mutuality' });
    }
}