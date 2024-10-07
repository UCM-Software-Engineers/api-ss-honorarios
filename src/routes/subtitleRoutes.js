import express from 'express';
import { getSubtitle } from '../controllers/subtitleController.js';

const router = express.Router();

router.get('/subtitle', getSubtitle);

export default router;


