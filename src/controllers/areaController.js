import connection from '../db/connection.js';

export const getArea = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM bdi_area');
        res.json(rows);
    } catch (error) {
        console.error('Error querying area:', error);
        res.status(500).json({ status: 'error', message: 'Error querying area' });
    }
}