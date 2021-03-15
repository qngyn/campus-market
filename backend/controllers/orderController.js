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