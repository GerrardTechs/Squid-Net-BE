import type { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

/**
 * Reusable validation middleware.
 * Validasi req.body menggunakan Zod schema yang diberikan.
 * Jika gagal, langsung return 400 dengan pesan error yang bersih.
 *
 * Cara pakai di routes:
 *   router.post('/add', validate(addToCartSchema), addToCart);
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Ambil semua pesan error dari Zod dan format jadi array yang bersih
      const errors = result.error.errors.map((err) => ({
        field: err.path.join('.'),  // contoh: "customerDetails.phoneNumber"
        message: err.message,
      }));

      res.status(400).json({
        success: false,
        message: 'Data yang dikirim tidak valid.',
        errors,
      });
      return;
    }

    // Ganti req.body dengan data yang sudah diparse & di-sanitize Zod
    // (trim whitespace, default values, dll sudah diterapkan)
    req.body = result.data;
    next();
  };
};
