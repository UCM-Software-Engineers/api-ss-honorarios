import express from 'express';
import { getWorker } from '../controllers/workerController.js';

const router = express.Router();

router.get('/worker', getWorker);

export default router;


