import type { Request, Response, NextFunction } from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { Types } from 'mongoose';

/**
 * POST /api/cart/add
 * Body: { userId: string, productId: string, quantity: number }
 */
export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, productId, quantity = 1 } = req.body as {
      userId: string;
      productId: string;
      quantity: number;
    };

    if (!userId || !productId) {
      res.status(400).json({ success: false, message: 'userId dan productId wajib diisi.' });
      return;
    }

    // Validasi produk ada dan masih aktif
    const product = await Product.findById(productId).select('stock isActive');
    if (!product || !product.isActive) {
      res.status(404).json({ success: false, message: 'Produk tidak tersedia.' });
      return;
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Buat cart baru jika belum ada
      cart = await Cart.create({
        userId,
        items: [{ productId: new Types.ObjectId(productId), quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item: any) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // ▲ PERBAIKAN 1: Gunakan tanda ! (Non-null assertion) untuk mematikan komplain noUncheckedIndexedAccess
        cart.items[itemIndex]!.quantity += quantity;
      } else {
        // Tambah item baru
        cart.items.push({ productId: new Types.ObjectId(productId), quantity });
      }

      await cart.save();
    }

    // Populate untuk response yang lebih informatif
    await cart.populate('items.productId', 'name price imageUrl slug');
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/cart/update
 * Body: { userId: string, productId: string, quantity: number }
 * quantity = 0 untuk menghapus item
 */
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body as {
      userId: string;
      productId: string;
      quantity: number;
    };

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ success: false, message: 'Cart tidak ditemukan.' });
      return;
    }

    if (quantity <= 0) {
      // Hapus item dari array
      cart.items = cart.items.filter((item: any) => item.productId.toString() !== productId) as any;
    } else {
      const itemIndex = cart.items.findIndex(
        (item: any) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        // ▲ PERBAIKAN 2: Gunakan tanda ! karena dilindungi oleh itemIndex > -1
        cart.items[itemIndex]!.quantity = quantity;
      }
    }

    await cart.save();
    await cart.populate('items.productId', 'name price imageUrl slug');
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/cart/remove
 * Body: { userId: string, productId: string }
 */
export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, productId } = req.body as {
      userId: string;
      productId: string;
    };

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      // ▲ PERBAIKAN 3: Menyelaraskan struktur JSON response & memisahkan return statement
      res.status(404).json({ success: false, message: "Keranjang tidak ditemukan" });
      return;
    }
      
    // Hapus item dari dokumen array
    cart.items = cart.items.filter((item: any) => item.productId.toString() !== productId) as any;
      
    await cart.save();
    await cart.populate('items.productId', 'name price imageUrl slug');
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};