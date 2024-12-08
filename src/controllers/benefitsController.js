import connection from '../db/connection.js';

export const getBenefits = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM honorario_beneficio');
        res.json(rows);
    } catch (error) {
        console.error('Error querying benefits:', error);
        res.status(500).json({ status: 'error', message: 'Error querying benefits' });
    }
}