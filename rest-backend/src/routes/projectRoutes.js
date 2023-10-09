import express from 'express';
import projectController from '../controllers/projectController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', authorizationMiddleware('admin'), projectController.getProjects);
router.get('/:id', projectController.getProject);
router.post('/', authorizationMiddleware('admin'), projectController.createProject);
router.put('/:id', authorizationMiddleware('admin'), projectController.updateProject);
router.delete('/:id', authorizationMiddleware('admin'), projectController.deleteProject);

export default router;