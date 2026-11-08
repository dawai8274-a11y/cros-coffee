# cros — Future Coffee & Specialty Brews ☕⚡

Website dummy landing page interaktif untuk **cros** coffee shop, dibuat berdasarkan desain mockup referensi dengan sentuhan logo futuristik dan modern.

## 🚀 Cara Mengakses Website (Local)

Web server lokal saat ini **sudah aktif dan berjalan**:

- **URL Lokal:** [http://localhost:8080](http://localhost:8080) atau [http://127.0.0.1:8080](http://127.0.0.1:8080)

> Jika ingin menjalankan ulang server secara mandiri di terminal:
> ```bash
> python3 -m http.server 8080
> ```

---

## 🎨 Konsep Logo: "cros" (Simple & Futuristik)

Logo dirancang dengan filosofi **minimalisme teknologi presisi**:
1. **Emblem (Crosshair & Orbit):** 
   - Simbol salib (`✕` / `+`) geometris yang melambangkan pertemuan antara *seni seduh kopi* dan *teknologi ekstraksi modern*.
   - Lingkaran orbit *cyber* dengan aksen *telemetry ticks* dan inti biji kopi bercahaya amber karamel.
2. **Tipografi Modern Geometric:**
   - Nama merek lowercase `cros` dengan proporsi sans-serif tegas, bersih, dan futuristik.
   - Tagline pelengkap: `COFFEE LAB` bernuansa bronze modern.
   - Tersedia dalam format SVG resolusi tinggi di [assets/logo_cros_clean.svg](file:///home/diwam/web dummy menu coffe shop/assets/logo_cros_clean.svg).

---

## 🌟 Fitur-Fitur Website

1. **Header / Navbar Interaktif:**
   - Logo vektor futuristik **cros** dengan animasi rotasi halus saat kursor diarahkan (*hover*).
   - Ticker pengumuman berjalan (*cyber announcement bar*).
   - Tombol **Lo-Fi Ambient Sound Simulator** (menggunakan Web Audio API untuk suara khas kedai kopi).
   - Ikon Wishlist / Favorit, Akun Profil VIP Member, dan Keranjang Belanja dengan badge counter real-time.
2. **Hero Section:**
   - Menampilkan visual khas gelas iced coffee dengan swirl krim di atas balok arsitektural beton.
   - Tipografi ikonik *"ORDER COFFEE"* & tulisan tangan *"Welcome"*.
   - Tombol CTA interaktif *"Explore Menu"* dan *"Quick Order"*.
3. **Menu Drinks Section:**
   - Filter Kategori: `Iced coffee` (default), `Milk-Based Coffee`, `Classic Coffee`, `Specialty Coffee`, `Sweet Coffee`, dan `All Drinks`.
   - Menampilkan 8 menu cangkir kopi lengkap sesuai foto referensi:
     - **Espresso** (Rp 22.000)
     - **Americano** (Rp 25.000)
     - **Latte** (Rp 30.000)
     - **Macchiato** (Rp 32.000)
     - **Irish Coffee** (Rp 38.000)
     - **Flat White** (Rp 28.000)
     - **Lungo** (Rp 26.000)
     - **Vienna Coffee** (Rp 35.000)
   - Tombol panah navigasi carousel (`<` dan `>`) & tombol *"More"* untuk membuka menu kreasi lanjutan.
   - Fitur **Drink Customizer Modal**: Klik minuman untuk memilih ukuran cup (Regular/Large +Rp 5.000), level es, tingkat kemanisan (gula), dan opsi susu (Oat Milk +Rp 6.000 / Almond Milk +Rp 6.000 / Extra Shot +Rp 7.000).
4. **Promo Section ("New drink"):**
   - Latar belakang pink peach lembut yang menyatu mulus dengan visual iced latte kelapa.
   - Info produk: **Iced Latte** (Rp 32.000 diskon dari Rp 40.000).
   - Poin keunggulan: 3 Syrups (vanilla, caramel, hazelnut), With blend, dan diskon 20%.
   - Tombol instan *"Order Iced Latte Deal"*.
5. **Slide-Out Basket (Keranjang Belanja):**
   - Menampilkan daftar pesanan dengan stepper kuantitas (+ / -) dan tombol hapus.
   - Input voucher promo: Ketik kode **`CROS20`** untuk mendapatkan diskon 20%.
   - Perhitungan otomatis: Subtotal, diskon, pajak 10%, dan grand total.
   - Tombol checkout dengan simulasi ID Pesanan `#CROS-XXXX`.
6. **Cek Radius Pengiriman Lokal:**
   - Input alamat untuk mengecek estimasi waktu pengiriman lokal.
