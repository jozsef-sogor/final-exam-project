import express from 'express';
import noteController from '../controllers/noteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:projectId/notes', noteController.getNotes);
router.post('/:projectId/notes', authorizationMiddleware('client'), noteController.createNote);

export default router;

