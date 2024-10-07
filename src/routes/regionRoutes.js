import express from 'express';
import { getRegion } from '../controllers/regionController.js';

const router = express.Router();

router.get('/region', getRegion);

export default router;