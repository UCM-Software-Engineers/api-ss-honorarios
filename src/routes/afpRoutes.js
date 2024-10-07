import express from 'express';
import { getAfp } from '../controllers/afpController.js';

const router = express.Router();

router.get('/afp', getAfp);

export default router;