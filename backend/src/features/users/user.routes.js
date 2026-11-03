import { Router } from 'express';
import { getUsers, updateProfile } from './user.controller.js';
import { verifyToken, verifyAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

// Admin can see all users
router.get('/', verifyToken, verifyAdmin, getUsers);

// User can update profile
router.put('/profile', verifyToken, updateProfile);

export default router;

