import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

/* 
@description Fetch all products 
@route GET /api/products
@access public
*/
export const getProducts = expressAsyncHandler(async(req, res) => {
    const products = await Product.find({});

    res.json(products);
});

/* 
@description Fetch a single product
@route GET /api/products/:id
@access public
*/
export const getProductById = expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});