import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama produk wajib diisi'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, // Untuk URL yang SEO-friendly (misal: /produk/mouse-logitech-g102)
    },
    category: {
      type: String,
      required: true,
      enum: ['Toko Elektronik', 'Layanan Warnet', 'Servis Elektronik'], 
    },
    price: {
      type: Number,
      required: [true, 'Harga wajib diisi'],
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0, // Jika layanannya adalah "Paket Warnet", stok bisa diset ke angka besar atau di-bypass
    },
    imageUrl: {
      type: String,
      required: true, // Link gambar produk
    },
    // Fitur yang kamu minta:
    shortCaption: {
      type: String,
      required: [true, 'Caption singkat wajib diisi'],
      maxLength: 150, // Dibatasi agar UI card tidak berantakan
      // Contoh: "Mouse gaming ringan dengan sensor 8000 DPI."
    },
    detailedDescription: {
      type: String,
      // Contoh: Spesifikasi lengkap, dimensi, garansi, dll.
    },
    isActive: {
      type: Boolean,
      default: true, // Untuk menyembunyikan produk yang sudah tidak dijual tanpa menghapus datanya
    }
  },
  { timestamps: true } // Otomatis menambahkan createdAt & updatedAt
);

export default mongoose.model('Product', productSchema);