import mongoose from 'mongoose';

// 1. Deklarasi Tipe & Interface TypeScript (Diletakkan di LUAR skema)
export interface ICustomerDetails {
  fullName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  notes?: string;
}

export type PaymentMethod = 'Transfer Bank' | 'E-Wallet' | 'Bayar di Warnet';


// 2. Skema Item di Dalam Order
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: String, // Snapshot nama produk
  price: Number, // Snapshot harga produk saat transaksi
  quantity: Number,
});


// 3. Skema Utama Order Mongoose
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    // Definisi objek untuk database Mongoose
    customerDetails: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String },
      address: { type: String },
      notes: { type: String },
    },
    status: {
      type: String,
      enum: ['Menunggu Pembayaran', 'Diproses', 'Selesai', 'Dibatalkan'],
      default: 'Menunggu Pembayaran',
    },
    paymentMethod: {
      type: String,
      enum: ['Transfer Bank', 'E-Wallet', 'Bayar di Warnet'], // Sesuai dengan type PaymentMethod di atas
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);