import express from 'express';
import { authenticateUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';
import { authenticateProtectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router(); // base url "/api/users"

router.route('/').post(registerUser);
router.post('/login', authenticateUser); 

/* protected routes */ 
router.route('/profile')
        .get(authenticateProtectedRoute, getUserProfile)
        .put(authenticateProtectedRoute, updateUserProfile);
 
export default router; 