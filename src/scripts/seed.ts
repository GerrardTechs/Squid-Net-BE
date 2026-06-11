/**
 * 🌱 SEEDING SCRIPT — Warnet Squid.Net & Toko Elektronik
 *
 * Cara pakai:
 *   npm run seed    → isi database dengan data produk dummy
 *   npm run unseed  → hapus semua data produk dari database
 *
 * ⚙️ Pastikan MONGODB_URI sudah ada di file .env sebelum menjalankan script ini.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env') });

type ProductCategory = 'Toko Elektronik' | 'Layanan Warnet' | 'Servis Elektronik';

interface SeedProduct {
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  stock: number;
  imageUrl: string;
  shortCaption: string;
  detailedDescription: string;
  isActive: boolean;
}

const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      slug: { type: String, required: true, unique: true },
      category: {
        type: String,
        required: true,
        enum: ['Toko Elektronik', 'Layanan Warnet', 'Servis Elektronik'],
      },
      price: { type: Number, required: true, min: 0 },
      stock: { type: Number, required: true, default: 0 },
      imageUrl: { type: String, required: true },
      shortCaption: { type: String, required: true, maxLength: 150 },
      detailedDescription: { type: String },
      isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
  );

const Product =
  mongoose.models['Product'] ?? mongoose.model('Product', productSchema);

// ---------------------------------------------------------------------------
// DATA PRODUK
// ---------------------------------------------------------------------------
const products: SeedProduct[] = [
  {
    name: 'Mouse Gaming Logitech G102 LIGHTSYNC',
    slug: 'mouse-logitech-g102-lightsync',
    category: 'Toko Elektronik',
    price: 285000,
    stock: 15,
    imageUrl: 'https://placehold.co/600x400/0f172a/22d3ee?text=Logitech+G102',
    shortCaption: 'Mouse gaming ringan 200–8000 DPI dengan RGB LIGHTSYNC 16.8 juta warna.',
    detailedDescription: `<p>Logitech G102 LIGHTSYNC hadir dengan sensor gaming berperforma tinggi yang bisa disesuaikan dari 200 hingga 8000 DPI.</p><ul><li>Sensor: Optical 200–8000 DPI</li><li>Tombol: 6 tombol yang bisa diprogram</li><li>Pencahayaan: RGB LIGHTSYNC 16.8 juta warna</li><li>Konektivitas: USB kabel 2.1m</li><li>Bobot: ~75 gram</li><li>Garansi: 2 tahun resmi Logitech Indonesia</li></ul>`,
    isActive: true,
  },
  {
    name: 'Keyboard Mechanical Rexus Daxa M71',
    slug: 'keyboard-rexus-daxa-m71',
    category: 'Toko Elektronik',
    price: 495000,
    stock: 8,
    imageUrl: 'https://placehold.co/600x400/0f172a/22d3ee?text=Rexus+Daxa+M71',
    shortCaption: 'Keyboard mechanical TKL 80% dengan switch Rexus Blue, RGB per-key.',
    detailedDescription: `<p>Rexus Daxa M71 adalah keyboard mechanical tenkeyless (TKL) dengan layout 80% yang compact.</p><ul><li>Switch: Rexus Blue (tactile & clicky)</li><li>Layout: TKL 87 tombol</li><li>Backlight: RGB per-key full spectrum</li><li>Anti-ghosting: Full N-Key Rollover</li><li>Kabel: Braided USB 1.8m</li><li>Garansi: 1 tahun resmi Rexus</li></ul>`,
    isActive: true,
  },
  {
    name: 'Headset Gaming Rexus HX20',
    slug: 'headset-rexus-hx20',
    category: 'Toko Elektronik',
    price: 235000,
    stock: 12,
    imageUrl: 'https://placehold.co/600x400/0f172a/a855f7?text=Rexus+HX20',
    shortCaption: 'Headset gaming surround 7.1 virtual dengan mic noise-cancelling dan RGB.',
    detailedDescription: `<p>Rexus HX20 menghadirkan pengalaman audio imersif dengan virtual surround 7.1.</p><ul><li>Driver: 50mm neodymium</li><li>Frekuensi: 20Hz – 20kHz</li><li>Mikrofon: Omnidirectional, noise-cancelling</li><li>Surround: Virtual 7.1 (via software)</li><li>Konektivitas: USB + 3.5mm combo</li><li>Garansi: 1 tahun resmi Rexus</li></ul>`,
    isActive: true,
  },
  {
    name: 'SSD SATA Lexar NS100 512GB',
    slug: 'ssd-lexar-ns100-512gb',
    category: 'Toko Elektronik',
    price: 520000,
    stock: 10,
    imageUrl: 'https://placehold.co/600x400/0f172a/22d3ee?text=Lexar+NS100+512GB',
    shortCaption: 'SSD SATA III 2.5" kecepatan baca hingga 550MB/s. Upgrade PC jadi instan.',
    detailedDescription: `<p>Lexar NS100 adalah pilihan tepat untuk upgrade dari HDD ke SSD.</p><ul><li>Kapasitas: 512GB</li><li>Interface: SATA III 6Gb/s</li><li>Baca: hingga 550 MB/s</li><li>Tulis: hingga 450 MB/s</li><li>Form factor: 2.5 inch</li><li>Garansi: 3 tahun</li></ul>`,
    isActive: true,
  },
  {
    name: 'RAM DDR4 V-GEN Rescue 8GB 3200MHz',
    slug: 'ram-vgen-rescue-8gb-3200mhz',
    category: 'Toko Elektronik',
    price: 195000,
    stock: 20,
    imageUrl: 'https://placehold.co/600x400/0f172a/a855f7?text=VGEN+8GB+DDR4',
    shortCaption: 'RAM DDR4 8GB 3200MHz garansi seumur hidup. Cocok untuk upgrade laptop & PC.',
    detailedDescription: `<p>V-GEN Rescue DDR4 3200MHz adalah RAM gaming entry-level yang reliable dengan garansi lifetime.</p><ul><li>Tipe: DDR4</li><li>Kapasitas: 8GB</li><li>Kecepatan: 3200MHz (PC4-25600)</li><li>Tegangan: 1.35V</li><li>Garansi: Lifetime</li></ul>`,
    isActive: true,
  },
  {
    name: 'Webcam Logitech C270 HD',
    slug: 'webcam-logitech-c270-hd',
    category: 'Toko Elektronik',
    price: 350000,
    stock: 7,
    imageUrl: 'https://placehold.co/600x400/0f172a/22d3ee?text=Logitech+C270',
    shortCaption: 'Webcam 720p HD dengan mikrofon built-in. Plug & play tanpa driver tambahan.',
    detailedDescription: `<p>Logitech C270 adalah webcam entry-level paling populer untuk meeting online dan streaming.</p><ul><li>Resolusi: 720p HD 30fps</li><li>Mikrofon: Built-in mono dengan noise reduction</li><li>Konektivitas: USB 2.0</li><li>Garansi: 2 tahun resmi Logitech</li></ul>`,
    isActive: true,
  },

  // LAYANAN WARNET
  {
    name: 'Paket Main 1 Jam',
    slug: 'paket-warnet-1-jam',
    category: 'Layanan Warnet',
    price: 5000,
    stock: 999,
    imageUrl: 'https://placehold.co/600x400/0f172a/22d3ee?text=Paket+1+Jam',
    shortCaption: 'Akses PC gaming 1 jam. Spesifikasi RTX 3060, monitor 144Hz, kursi ergonomis.',
    detailedDescription: `<p>Nikmati pengalaman gaming terbaik dengan PC bertenaga tinggi dan fasilitas lengkap.</p><ul><li>Durasi: 1 jam</li><li>Spek PC: Intel Core i5-12400F, RTX 3060, RAM 16GB</li><li>Monitor: 24" IPS 144Hz</li><li>Akses: 50+ game tersedia</li><li>Bonus: Headset & mouse gaming disediakan</li></ul>`,
    isActive: true,
  },
  {
    name: 'Paket Main 5 Jam (Hemat)',
    slug: 'paket-warnet-5-jam',
    category: 'Layanan Warnet',
    price: 20000,
    stock: 999,
    imageUrl: 'https://placehold.co/600x400/0f172a/a855f7?text=Paket+5+Jam',
    shortCaption: 'Main 5 jam hemat 20%! Cocok untuk marathon gaming atau nonton serial.',
    detailedDescription: `<p>Paket 5 jam lebih hemat dibanding beli satuan. Bisa dipecah, tidak harus 5 jam berturut-turut.</p><ul><li>Durasi: 5 jam (hemat Rp5.000 vs beli satuan)</li><li>Berlaku: 7 hari sejak pembelian</li><li>Semua fasilitas sama dengan Paket 1 Jam</li></ul>`,
    isActive: true,
  },
  {
    name: 'Paket Mabar Nite (22.00 – 06.00)',
    slug: 'paket-warnet-nite',
    category: 'Layanan Warnet',
    price: 25000,
    stock: 999,
    imageUrl: 'https://placehold.co/600x400/0f172a/22d3ee?text=Paket+Nite',
    shortCaption: 'Main sepuasnya semalam suntuk 8 jam. Dilengkapi snack & minuman gratis.',
    detailedDescription: `<p>Paket Nite adalah paket favorit para gamer yang suka begadang. Main 8 jam penuh dari jam 10 malam sampai subuh.</p><ul><li>Durasi: 8 jam (22.00 – 06.00)</li><li>Bonus: 1 snack + 1 minuman gratis</li><li>Staf on-site semalaman</li></ul>`,
    isActive: true,
  },
  {
    name: 'Cetak Dokumen / Print',
    slug: 'layanan-print-dokumen',
    category: 'Layanan Warnet',
    price: 1000,
    stock: 999,
    imageUrl: 'https://placehold.co/600x400/0f172a/22d3ee?text=Print+Dokumen',
    shortCaption: 'Print hitam-putih Rp1.000/lembar, berwarna Rp3.000/lembar. Kertas A4/F4.',
    detailedDescription: `<p>Layanan cetak dokumen cepat dan murah. Bawa file via flashdisk, email, atau WhatsApp.</p><ul><li>Hitam-putih: Rp1.000/lembar</li><li>Berwarna: Rp3.000/lembar</li><li>Format: PDF, DOCX, JPG, PNG</li><li>Waktu: Langsung jadi</li></ul>`,
    isActive: true,
  },

  // SERVIS ELEKTRONIK
  {
    name: 'Servis Laptop — Diagnosa & Konsultasi',
    slug: 'servis-laptop-diagnosa',
    category: 'Servis Elektronik',
    price: 50000,
    stock: 30,
    imageUrl: 'https://placehold.co/600x400/0f172a/a855f7?text=Servis+Diagnosa',
    shortCaption: 'Cek kerusakan laptop. Biaya baru keluar jika setuju diperbaiki.',
    detailedDescription: `<p>Diagnosa hardware & software oleh teknisi berpengalaman.</p><ul><li>Estimasi biaya perbaikan transparan sebelum dikerjakan</li><li>Jika tidak setuju, bayar diagnosa Rp50.000 saja</li><li>Estimasi waktu: 30–60 menit</li></ul>`,
    isActive: true,
  },
  {
    name: 'Servis Laptop — Install Ulang Windows 11',
    slug: 'servis-install-ulang-windows',
    category: 'Servis Elektronik',
    price: 150000,
    stock: 30,
    imageUrl: 'https://placehold.co/600x400/0f172a/22d3ee?text=Install+Windows',
    shortCaption: 'Install ulang Windows 11 original + driver + software dasar. Selesai dalam 2 jam.',
    detailedDescription: `<p>Laptop lemot, kena virus, atau Windows corrupt? Install ulang adalah solusi paling efektif.</p><ul><li>Windows 11 original / aktivasi permanen</li><li>Install driver lengkap</li><li>Software dasar: Chrome, WPS Office, VLC, Winrar</li><li>Estimasi waktu: 2–3 jam</li><li>Garansi: 30 hari</li></ul>`,
    isActive: true,
  },
  {
    name: 'Servis Laptop — Ganti Thermal Paste',
    slug: 'servis-ganti-thermal-paste',
    category: 'Servis Elektronik',
    price: 85000,
    stock: 30,
    imageUrl: 'https://placehold.co/600x400/0f172a/a855f7?text=Thermal+Paste',
    shortCaption: 'Laptop panas & sering throttle? Ganti thermal paste turunkan suhu 10–20°C.',
    detailedDescription: `<p>Thermal paste yang mengering adalah penyebab utama laptop overheat.</p><ul><li>Thermal paste premium (Thermal Grizzly / Noctua NT-H1)</li><li>Termasuk: bongkar, bersih fan, pasang kembali</li><li>Estimasi waktu: 45–90 menit</li><li>Garansi: 6 bulan</li></ul>`,
    isActive: true,
  },
  {
    name: 'Servis Laptop — Upgrade RAM / SSD',
    slug: 'servis-upgrade-ram-ssd',
    category: 'Servis Elektronik',
    price: 75000,
    stock: 20,
    imageUrl: 'https://placehold.co/600x400/0f172a/22d3ee?text=Upgrade+RAM+SSD',
    shortCaption: 'Jasa pasang RAM atau SSD baru. Harga jasa saja, komponen dibeli terpisah.',
    detailedDescription: `<p>Ingin pasang RAM atau SSD baru tapi tidak mau bongkar sendiri? Serahkan ke teknisi kami.</p><ul><li>Jasa pasang RAM (1 slot): Rp75.000</li><li>Jasa pasang SSD: Rp75.000</li><li>Migrasi OS ke SSD baru: +Rp50.000</li><li>Estimasi waktu: 30–60 menit</li><li>Garansi jasa: 30 hari</li></ul>`,
    isActive: true,
  },
];

// ---------------------------------------------------------------------------
// FUNGSI SEED
// ---------------------------------------------------------------------------
async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI tidak ditemukan di .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Terhubung ke MongoDB\n');

    const deleted = await Product.deleteMany({});
    console.log(`🗑️  Menghapus ${deleted.deletedCount} produk lama...`);

    const inserted = await Product.insertMany(products as any);
    console.log(`🌱 Berhasil menanam ${inserted.length} produk:\n`);

    const summary: Record<string, number> = {};
    for (const p of inserted) {
      const cat = p.category as string;
      summary[cat] = (summary[cat] ?? 0) + 1;
    }
    for (const [cat, count] of Object.entries(summary)) {
      console.log(`   ${cat.padEnd(25)} → ${count} produk`);
    }

    console.log('\n🎉 Seeding selesai! Database siap digunakan.');
  } catch (err) {
    console.error('❌ Seeding gagal:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Koneksi MongoDB ditutup.');
  }
}

// ---------------------------------------------------------------------------
// FUNGSI UNSEED
// ---------------------------------------------------------------------------
async function unseed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI tidak ditemukan di .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Terhubung ke MongoDB\n');

    const deleted = await Product.deleteMany({});
    console.log(`🗑️  Berhasil menghapus ${deleted.deletedCount} produk.`);
    console.log('✨ Database produk bersih.');
  } catch (err) {
    console.error('❌ Unseed gagal:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Koneksi MongoDB ditutup.');
  }
}

const isUnseed = process.argv.includes('--unseed');
if (isUnseed) {
  unseed();
} else {
  seed();
}