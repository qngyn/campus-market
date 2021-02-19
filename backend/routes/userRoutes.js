import express from 'express';
import { authenticateUser, getUserProfile, registerUser } from '../controllers/userController.js';
import { authenticateProtectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router(); // base url "/api/users"

router.route('/').post(registerUser);
router.post('/login', authenticateUser); 

/* protected routes */ 
router.route('/profile').get(authenticateProtectedRoute, getUserProfile);
 
export default router; 