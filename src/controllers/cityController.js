import connection from '../db/connection.js';

export const getCity = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM bdi_city');
        res.json(rows);
    } catch (error) {
        console.error('Error querying City:', error);
        res.status(500).json({ status: 'error', message: 'Error querying City' });
    }
}