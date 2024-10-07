import express from 'express';
import { getGrade } from '../controllers/gradeController.js';

const router = express.Router();

router.get('/grade', getGrade);

export default router;