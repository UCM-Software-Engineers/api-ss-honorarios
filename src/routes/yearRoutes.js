import express from 'express';
import { getYear } from '../controllers/yearController.js';

const router = express.Router();

router.get('/year', getYear);

export default router;