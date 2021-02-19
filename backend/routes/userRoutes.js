import express from 'express';
import { authenticateUser, getUserProfile } from '../controllers/userController.js';
import { authenticateProtectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authenticateUser); 

/* protected routes */ 
router.route('/profile').get(authenticateProtectedRoute, getUserProfile);
 
export default router; 