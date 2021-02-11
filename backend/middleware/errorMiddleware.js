/* middleware to handle 404 error */
const notFoundHandler = (req, res, next) => {
    const error = new Error(`${req.originalUrl} not found`);
    res.status(404);
    next(error);
}

/* middleware to handle general error */
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // sometime we may get a 200 response even if it's an error 
    res.status(statusCode);
    res.json({
        message: err.message, 
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // displace stack trace only in development mode
    });
}

export { notFoundHandler, errorHandler};