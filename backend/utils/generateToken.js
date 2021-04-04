import jwt from 'jsonwebtoken';

export const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: '15m'
    });
}
export const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: '10d'
    });
}