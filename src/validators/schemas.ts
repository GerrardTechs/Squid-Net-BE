import { z } from 'zod';

// ---------------------------------------------------------------------------
// REUSABLE FIELDS
// ---------------------------------------------------------------------------

const userIdSchema = z
  .string({ required_error: 'userId wajib diisi.' })
  .uuid({ message: 'Format userId tidak valid.' });

const productIdSchema = z
  .string({ required_error: 'productId wajib diisi.' })
  .regex(/^[a-f\d]{24}$/i, { message: 'Format productId tidak valid.' }); // MongoDB ObjectId

// ---------------------------------------------------------------------------
// CART SCHEMAS
// ---------------------------------------------------------------------------

export const addToCartSchema = z.object({
  userId: userIdSchema,
  productId: productIdSchema,
  quantity: z
    .number({ invalid_type_error: 'Quantity harus berupa angka.' })
    .int({ message: 'Quantity harus bilangan bulat.' })
    .min(1, { message: 'Quantity minimal 1.' })
    .max(100, { message: 'Quantity maksimal 100.' })
    .optional()
    .default(1),
});

export const updateCartSchema = z.object({
  userId: userIdSchema,
  productId: productIdSchema,
  quantity: z
    .number({ required_error: 'Quantity wajib diisi.', invalid_type_error: 'Quantity harus berupa angka.' })
    .int({ message: 'Quantity harus bilangan bulat.' })
    .min(0, { message: 'Quantity minimal 0 (0 = hapus item).' })
    .max(100, { message: 'Quantity maksimal 100.' }),
});

export const removeFromCartSchema = z.object({
  userId: userIdSchema,
  productId: productIdSchema,
});

// ---------------------------------------------------------------------------
// CHECKOUT SCHEMA
// ---------------------------------------------------------------------------

export const checkoutSchema = z.object({
  userId: userIdSchema,
  customerDetails: z.object({
    fullName: z
      .string({ required_error: 'Nama lengkap wajib diisi.' })
      .min(2, { message: 'Nama minimal 2 karakter.' })
      .max(100, { message: 'Nama maksimal 100 karakter.' })
      .trim(),
    phoneNumber: z
      .string({ required_error: 'Nomor HP wajib diisi.' })
      .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, {
        message: 'Format nomor HP tidak valid. Contoh: 081234567890',
      }),
    email: z
      .string()
      .email({ message: 'Format email tidak valid.' })
      .optional(),
    address: z
      .string()
      .max(300, { message: 'Alamat maksimal 300 karakter.' })
      .optional(),
    notes: z
      .string()
      .max(500, { message: 'Catatan maksimal 500 karakter.' })
      .optional(),
  }),
  paymentMethod: z.enum(['Transfer Bank', 'E-Wallet', 'Bayar di Warnet'], {
    required_error: 'Metode pembayaran wajib dipilih.',
    invalid_type_error: 'Metode pembayaran tidak valid.',
  }),
});

// ---------------------------------------------------------------------------
// EXPORTED TYPES (bisa dipakai di controller untuk type safety)
// ---------------------------------------------------------------------------

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartInput = z.infer<typeof updateCartSchema>;
export type RemoveFromCartInput = z.infer<typeof removeFromCartSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;