import express from 'express';
import { getProblemsByRating, getProblemsByTopic } from '../controllers/problemController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/rating/:division', getProblemsByRating);
router.get('/topics/:division', getProblemsByTopic);

export default router;
