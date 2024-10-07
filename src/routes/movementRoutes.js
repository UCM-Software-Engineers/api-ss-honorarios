import express from 'express';
import { getMovement } from '../controllers/movementController.js';

const router = express.Router();

router.get('/movement', getMovement);

export default router;