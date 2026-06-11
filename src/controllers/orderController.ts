import type { Request, Response, NextFunction } from 'express';
import Order from '../models/Order.js';

/**
 * GET /api/orders/:orderId
 * Mengambil detail satu order berdasarkan ID.
 * Digunakan oleh halaman sukses checkout & tracking pesanan di FE.
 */
export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('items.product', 'name imageUrl slug') // ambil data produk yang masih ada
      .lean();

    if (!order) {
      res.status(404).json({ success: false, message: 'Order tidak ditemukan.' });
      return;
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    // Tangkap CastError jika orderId bukan format ObjectId yang valid
    if ((error as any).name === 'CastError') {
      res.status(400).json({ success: false, message: 'Format ID order tidak valid.' });
      return;
    }
    next(error);
  }
};

/**
 * GET /api/orders/user/:userId
 * Mengambil semua order milik seorang guest berdasarkan userId (UUID).
 * Digunakan oleh halaman riwayat pesanan di FE.
 * Diurutkan dari yang terbaru.
 */
export const getOrdersByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .select('items totalAmount status paymentMethod createdAt') // field yang cukup untuk list view
      .populate('items.product', 'name imageUrl')
      .sort({ createdAt: -1 }) // terbaru di atas
      .lean();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};