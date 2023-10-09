import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', authorizationMiddleware('admin'), userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.put('/:id/contacts', authorizationMiddleware('admin'), userController.updateContacts);
router.delete('/:id', authorizationMiddleware('superadmin'), userController.deleteUser);

export default router;

