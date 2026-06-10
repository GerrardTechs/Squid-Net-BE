import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('🔴 Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal pada server.',
    // ⚙️ Hapus baris di bawah ini saat production!
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};