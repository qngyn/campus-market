import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

/* 
@description Create a new order
@route POST /api/orders
@access private
*/
export const addOrderItems = expressAsyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            payment: paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save()

        res.status(201).json(createdOrder); 
    }
});

/* 
@description Get an order by ID
@route GET /api/orders/:id
@access private
*/
export const getOrderById = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email'); // get user name and email associated with the order

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});

/* 
@description Update order paid status
@route GET /api/orders/:id/pay
@access private
*/
export const updateOrderPaidStatus = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id); 

    if (order) {
        order.isPaid = true; 
        order.paidAt = Date.now(); 
        order.paymentResult = {
            id: req.body.id, 
            status: req.body.status, 
            update_time: req.body.update_time, 
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder); 
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});

/* 
@description Get logged in user's orders
@route GET /api/orders/myorders
@access private
*/
export const getLoggedInUserOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id}); 
    res.json(orders)
});