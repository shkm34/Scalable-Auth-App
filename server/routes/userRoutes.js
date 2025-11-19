import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
