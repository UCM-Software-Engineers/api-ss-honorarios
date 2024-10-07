import express from 'express';
import { getItem } from '../controllers/itemController.js';

const router = express.Router();

router.get('/item', getItem);

export default router;