import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import orderRoutes from './routes/orderRoutes.js';


const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);


app.get('/', (req, res) => {
  res.send('API Warnet Squid.Net berjalan lancar! 🦑');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});