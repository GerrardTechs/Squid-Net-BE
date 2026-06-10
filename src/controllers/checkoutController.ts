import type { Request, Response, NextFunction } from 'express';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import type { ICustomerDetails, PaymentMethod } from '../models/Order.js';
import Product from '../models/Product.js';

interface CheckoutBody {
  userId: string;
  customerDetails: ICustomerDetails;
  paymentMethod: PaymentMethod;
}

/**
 * POST /api/checkout
 * Total harga dihitung dari sisi server (tidak percaya data klien)
 * untuk mencegah manipulasi harga.
 */
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, customerDetails, paymentMethod } = req.body as CheckoutBody;

    // ▲ PERBAIKAN 1: Menyesuaikan dengan properti fullName & phoneNumber dari ICustomerDetails
    if (!userId || !customerDetails?.fullName || !customerDetails?.phoneNumber) {
      res.status(400).json({ success: false, message: 'Data pelanggan tidak lengkap.' });
      return;
    }

    // Ambil cart user
    const cart = await Cart.findOne({ userId }).populate(
      'items.productId',
      'name price imageUrl stock isActive'
    );

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ success: false, message: 'Keranjang belanja kosong.' });
      return;
    }

    // Hitung total dari database (bukan dari body request)
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.productId as any; // already populated

      if (!product.isActive || product.stock < item.quantity) {
        res.status(400).json({
          success: false,
          message: `Stok produk "${product.name}" tidak mencukupi atau produk tidak tersedia.`,
        });
        return;
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      // ▲ PERBAIKAN 2: Mengubah 'productId' menjadi 'product' sesuai orderItemSchema di Order.ts
      orderItems.push({
        product: product._id, 
        name: product.name,           // snapshot nama
        price: product.price,          // snapshot harga
        quantity: item.quantity,
      });

      // Kurangi stock (gunakan $inc untuk atomic operation)
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Buat order
    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      customerDetails,
      paymentMethod,
      status: 'Menunggu Pembayaran', // Sudah sinkron dengan enum di Order.ts
    });

    // Kosongkan cart setelah checkout berhasil
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      success: true,
      message: 'Order berhasil dibuat!',
      data: {
        orderId: order._id,
        totalAmount: order.totalAmount,
        status: order.status,
      },
    });
  } catch (error) {
    next(error);
  }
};