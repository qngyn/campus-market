import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/* 
@description Authenticate user and get token
@route POST /api/users/login
@access public
*/
export const authenticateUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) // find the one user with the matching email

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin, 
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

/* 
@description Register a new user
@route POST /api/users
@access public
*/
export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email }) // find the one user with the matching email

    if (existingUser) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email, 
        password
    });

    if (user) { // if user is created successfully
        res.status(201).json({
            _id: user._id,
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin, 
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

/* 
@description Get the logged in user profile
@route GET /api/users/profile
@access private
*/
export const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});