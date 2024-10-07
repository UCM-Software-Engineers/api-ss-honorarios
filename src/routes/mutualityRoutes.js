import express from 'express';
import { getMutuality } from '../controllers/mutualityController.js';

const router = express.Router();

router.get('/mutuality', getMutuality);

export default router;