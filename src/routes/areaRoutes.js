import express from 'express';
import { getArea } from '../controllers/areaController.js';

const router = express.Router();

router.get('/area', getArea);

export default router;