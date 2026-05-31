import express from 'express';
import {
  getContestsByDivision,
  getDivisionAnalytics,
  syncContests,
} from '../controllers/contestController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/sync', syncContests);
router.get('/:division/analytics', getDivisionAnalytics);
router.get('/:division', getContestsByDivision);

export default router;
