import express from 'express';
import { getAssignment } from '../controllers/assignmentController.js';

const router = express.Router();

router.get('/assignment', getAssignment);

export default router;