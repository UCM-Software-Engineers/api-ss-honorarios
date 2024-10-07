import express from 'express';
import connection from './db/connection.js';
import afpRoutes from './routes/afpRoutes.js';
import previsionRoutes from './routes/previsionRoutes.js';
import mutualityRoutes from './routes/mutualityRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', afpRoutes);
app.use('/api', previsionRoutes);
app.use('/api', mutualityRoutes);

app.get('/checkbd', async (req, res) => {
    try {
        await connection.ping();
        res.json({ status: 'ok', message: 'La conexión con la BD ha sido exitosa' });
    } catch (error) {
        console.error('Error testing database connection:', error);
        res.status(500).json({ status: 'error', message: 'Error conectándose a la BD' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});