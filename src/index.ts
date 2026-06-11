import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// ⚙️ Sesuaikan ALLOWED_ORIGIN di .env dengan domain frontend Anda
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Global error handler (harus di paling bawah)
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API Warnet Squid.Net berjalan lancar! 🦑');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});