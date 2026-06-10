import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Relasi ke koleksi Product
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Kuantitas minimal adalah 1'],
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String, 
      required: true,
      unique: true,
      // Bisa berisi UUID (Guest ID) dari localStorage frontend, atau User ID asli jika ada sistem login
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);