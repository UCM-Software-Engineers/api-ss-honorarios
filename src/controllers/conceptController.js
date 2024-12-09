import connection from '../db/connection.js';

export const getConcept = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM presupuesto_concepto');
        res.json(rows);
    } catch (error) {
        console.error('Error querying Concept:', error);
        res.status(500).json({ status: 'error', message: 'Error querying Concept' });
    }
}