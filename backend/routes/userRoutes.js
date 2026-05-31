import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/userControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/me', authMiddleware, getMe);

export default userRoutes;
