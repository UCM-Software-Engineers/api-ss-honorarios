import express from 'express';
import { getEstament } from '../controllers/estamentController.js';

const router = express.Router();

router.get('/estament', getEstament);

export default router;