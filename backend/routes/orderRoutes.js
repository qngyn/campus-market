import express from 'express';
import { addOrderItems, getOrderById, updateOrderPaidStatus } from '../controllers/orderController.js';
import { authenticateProtectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router(); // base url "/api/users"

router.route('/').post(authenticateProtectedRoute, addOrderItems);
router.route('/:id').get(authenticateProtectedRoute, getOrderById);
router.route('/:id/pay').put(authenticateProtectedRoute, updateOrderPaidStatus);
export default router; 