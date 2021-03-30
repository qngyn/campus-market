import express from 'express';
import { addOrderItems, getLoggedInUserOrders, getOrderById, updateOrderPaidStatus } from '../controllers/orderController.js';
import { authenticateProtectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router(); // base url "/api/users"

router.route('/').post(authenticateProtectedRoute, addOrderItems);
router.route('/myorders').get(authenticateProtectedRoute, getLoggedInUserOrders);

router.route('/:id').get(authenticateProtectedRoute, getOrderById);
router.route('/:id/pay').put(authenticateProtectedRoute, updateOrderPaidStatus);
export default router; 