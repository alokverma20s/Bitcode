import express from 'express';
import { getSubmission, getSubmissionById, runCode, submitCode } from '../controllers/submission.js';

const router = express.Router();

router.post('/', runCode);
router.post('/submit', submitCode);
router.get('/getSubmission', getSubmission);
router.get('/getSubmission/:id', getSubmissionById);

export default router;
