import express from 'express';
import { authenticateUser, getUserProfile, registerUser, updateUserProfile, getUsers } from '../controllers/userController.js';
import { authenticateProtectedRoute, authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router(); // base url "/api/users"

router.route('/').post(registerUser).get(authenticateProtectedRoute, authenticateAdmin, getUsers);
router.post('/login', authenticateUser); 

/* protected routes */ 
router.route('/profile')
        .get(authenticateProtectedRoute, getUserProfile)
        .put(authenticateProtectedRoute, updateUserProfile);
 
export default router; 