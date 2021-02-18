import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/* 
@description Authenticate user and get token
@route POST /api/user/login
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
            token: null // todo - generate JSON Web Token
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
