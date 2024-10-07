import express from 'express';
import { getCity } from '../controllers/cityController.js';

const router = express.Router();

router.get('/city', getCity);

export default router;