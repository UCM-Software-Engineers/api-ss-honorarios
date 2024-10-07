import connection from '../db/connection.js';

export const getItem = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM bdi_city');
        res.json(rows);
    } catch (error) {
        console.error('Error querying item:', error);
        res.status(500).json({ status: 'error', message: 'Error querying item' });
    }
}