import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Register route is not guarded for testing and demonstration purposes
// in a real-life situation it would be accessible only for admins
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;

