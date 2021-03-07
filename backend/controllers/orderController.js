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