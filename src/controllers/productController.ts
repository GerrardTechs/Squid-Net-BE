import type { Request, Response, NextFunction } from 'express';
import Product from '../models/Product.js';

/**
 * GET /api/products
 * Hanya kirim field yang dibutuhkan untuk card preview (hemat bandwidth)
 */
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, search } = req.query;

    const filter: Record<string, unknown> = { isActive: true };

    if (category && typeof category === 'string') {
      filter.category = category;
    }
    if (search && typeof search === 'string') {
      filter.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(filter)
      .select('name slug category price stock imageUrl shortCaption')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/products/:slug
 * Kirim detail penuh termasuk detailedDescription
 */
export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    }).lean();

    if (!product) {
      res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
      return;
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};