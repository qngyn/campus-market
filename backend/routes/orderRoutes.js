import express from 'express';
import { addOrderItems } from '../controllers/orderController.js';
import { authenticateProtectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router(); // base url "/api/users"

router.route('/').post(authenticateProtectedRoute, addOrderItems);
export default router; 