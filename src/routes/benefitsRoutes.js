import express from 'express';
import { getBenefits } from '../controllers/benefitsController.js';

const router = express.Router();

router.get('/benefits', getBenefits);

export default router;