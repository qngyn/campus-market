import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const authenticateProtectedRoute = expressAsyncHandler(async (req, res, next) => {
    // 
    /* OLD IMPLEMENTATION: check if token is provided and if it starts with "Bearer"
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
    */

   const accessToken = req.cookies.jwt;

   if (!accessToken) {
    res.status(403);
    throw new Error('No Access Token');
   }

   try {
       // use jwt.verify() method to verify the access token
       // throw error if token has expired or is invalid signature
       const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET)
       req.user = await User.findById(decodedToken.id).select('-password'); //get the user and ignore the password field
            
       next()
   } catch(error) {
       res.status(401)
       throw new Error("Access Token is Invalid")
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