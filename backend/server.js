import express from 'express';
import dotenv from 'dotenv';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config(); 

connectDB(); 

const app = express(); 

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next(); 
});

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRoutes);

/* handling 404 error */
app.use(notFoundHandler)

/* handling general errors */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`));