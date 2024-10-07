import express from 'express';
import { getPrevision } from '../controllers/previsionController.js';

const router = express.Router();

router.get('/prevision', getPrevision);

export default router;