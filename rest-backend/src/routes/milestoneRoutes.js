import express from 'express';
import milestoneController from '../controllers/milestoneController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:projectId/milestones', milestoneController.getMilestones);
router.post('/:projectId/milestones', authorizationMiddleware('admin'), milestoneController.createMilestone);

export default router;

