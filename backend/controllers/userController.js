import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import { setRefreshTokenCookie } from '../utils/helper.js';

/* 
@description Authenticate user and get token
@route POST /api/users/login
@access public
*/
export const authenticateUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) // find the one user with the matching email

    if (user && (await user.matchPassword(password))) {
        const accessToken = generateAccessToken(user._id)

        // add refreshToken to db
        const refreshToken = generateRefreshToken(user._id)
        user.refreshToken = refreshToken
        // pass refresh token as a response cookie
        setRefreshTokenCookie(res, refreshToken)
        // res.cookie("refreshToken", refreshToken, {secure: true, httpOnly: true})
        await user.save()
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: accessToken
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
        const accessToken = generateAccessToken(user._id)

        // add refreshToken to db
        const refreshToken = generateRefreshToken(user._id)
        user.refreshToken = refreshToken
        // pass refresh token as a response cookie
        setRefreshTokenCookie(res, refreshToken)
        // res.cookie("refreshToken", refreshToken, {secure: true, httpOnly: true})
        await user.save()
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: accessToken
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


/* 
@description Update user profile
@route PUT /api/users/profile
@access private
*/
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;

        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

/* 
@description Get all users
@route GET /api/users
@access private/admin (i.e only available to admin users)
*/
export const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users)
});

/* 
@description Delete a user
@route DELETE /api/user/:ID
@access private/admin (i.e only available to admin users)
*/
export const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove()
        res.json({ message: "User successfully deleted" })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

/* 
@description Get a user by id
@route GET /api/users/:id
@access private/admin (i.e only available to admin users)
*/
export const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password') // fetch all user details but for the (decoded) password
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
});

/* 
@description Update user (done by admin)
@route PUT /api/users/:id
@access private/admin
*/
export const updateUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        user.isAdmin = req.body.isAdmin === true ? true : false // if null (i.e not provided) -> set as false

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});