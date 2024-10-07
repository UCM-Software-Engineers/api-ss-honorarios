import express from 'express';
import connection from './db/connection.js';
import afpRoutes from './routes/afpRoutes.js';
import previsionRoutes from './routes/previsionRoutes.js';
import mutualityRoutes from './routes/mutualityRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import regionRoutes from './routes/regionRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';
import estamentRoutes from './routes/estamentRoutes.js';
import areaRoutes from './routes/areaRoutes.js';
import benefitsRoutes from './routes/benefitsRoutes.js';
import subtitleRoutes from './routes/subtitleRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import movementRoutes from './routes/movementRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', afpRoutes);
app.use('/api', previsionRoutes);
app.use('/api', mutualityRoutes);
app.use('/api', cityRoutes);
app.use('/api', regionRoutes);
app.use('/api', gradeRoutes);
app.use('/api', estamentRoutes);
app.use('/api', areaRoutes);
app.use('/api', benefitsRoutes);
app.use('/api', subtitleRoutes);
app.use('/api', itemRoutes);
app.use('/api', assignmentRoutes);
app.use('/api', movementRoutes);

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