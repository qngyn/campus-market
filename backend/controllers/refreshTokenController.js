import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import { setRefreshTokenCookie } from '../utils/helper.js';

/* 
@description Get new Access Token from Refresh Tokem
@route GET /api/refresh
@access public
*/
export const getNewAccessToken = expressAsyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log("refreshToken: ", refreshToken)

    if (!refreshToken) {
        res.status(403);
        throw new Error('No Access Token');
    }
    let user;
    try {
        // use jwt.verify() method to verify the access token
        // throw error if token has expired or is invalid signature
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        req.user = await User.findById(decodedRefreshToken.id).select('-password'); //get the user and ignore the password field
        user = req.user;
        console.log(decodedRefreshToken)
    } catch (error) {
        res.status(401)
        // console.log("Error: ", error)
        throw new Error("Refresh Token is Invalid")
    }

    const newRefreshToken = generateRefreshToken(user._id)
    user.refreshToken = newRefreshToken
    await user.save()
    setRefreshTokenCookie(res, newRefreshToken)
    const newAccessToken = generateAccessToken(user._id)
    res.json({
        _id: user._id,
        name: user.name, 
        email: user.email, 
        isAdmin: user.isAdmin, 
        accessToken: newAccessToken
    });
});