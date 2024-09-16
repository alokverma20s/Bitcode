import express from 'express';

const router = express.Router();
import { createProblem, getProblem, getProblemById, updateProblem, deleteProblem } from '../controllers/problem.js';

router.post('/createProblem', createProblem);
router.get('/getAllProblem', getProblem);
router.get('/getProblem/:id', getProblemById);
router.put('/updateProblem/:id', updateProblem);
router.delete('/deleteProblem/:id', deleteProblem);

export default router;
// Compare this snippet from server/controllers/submissions.js: