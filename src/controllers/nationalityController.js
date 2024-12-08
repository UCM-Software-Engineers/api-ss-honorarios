import connection from '../db/connection.js';

export const getNationality = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM bdi_pais');
        res.json(rows);
    } catch (error) {
        console.error('Error querying region:', error);
        res.status(500).json({ status: 'error', message: 'Error querying Region' });
    }
}