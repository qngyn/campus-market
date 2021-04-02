import express from 'express';
import { authenticateUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js';
import { authenticateProtectedRoute, authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router(); // base url "/api/users"

router.route('/').post(registerUser).get(authenticateProtectedRoute, authenticateAdmin, getUsers);
router.post('/login', authenticateUser); 

/* protected routes */ 
router.route('/profile')
        .get(authenticateProtectedRoute, getUserProfile)
        .put(authenticateProtectedRoute, updateUserProfile);

router.route('/:id')
        .delete(authenticateProtectedRoute, authenticateAdmin, deleteUser)
        .get(authenticateProtectedRoute, authenticateAdmin, getUserById)
        .put(authenticateProtectedRoute, authenticateAdmin, updateUser);
export default router; 