import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const authenticateProtectedRoute = expressAsyncHandler(async (req, res, next) => {
    let token 

    // check if token is provided and if it starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // get the token

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // get the decoded jwt

            req.user = await User.findById(decodedToken.id).select('-password'); //get the user and ignore the password field
            
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    } 
});

export const authenticateAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) { // if user is logged in and is an admin
        next();
    }
    else {
        res.status(401); 
        throw new Error('Not authorized as an Admin')
    }
}