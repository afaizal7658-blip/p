# Aplikasi Monitoring BBM

Aplikasi web untuk monitoring konsumsi bahan bakar kendaraan dengan database MySQL. Sistem ini memungkinkan pengelolaan kendaraan, pencatatan transaksi BBM, dan analisis efisiensi bahan bakar.

## Fitur Utama

### 📊 Dashboard
- Overview statistik lengkap (total kendaraan, biaya BBM, konsumsi, efisiensi rata-rata)
- Daftar kendaraan terdaftar dengan ringkasan data
- Transaksi terakhir
- Interface modern dan responsif

### 🚗 Manajemen Kendaraan
- Registrasi kendaraan baru (nama, merk, model, tahun, jenis BBM, kapasitas tangki)
- Support berbagai jenis bahan bakar (Bensin, Solar, Listrik)
- Tracking nomor plat kendaraan

### ⛽ Pencatatan Transaksi
- Catat pengisian BBM (isi ulang)
- Catat konsumsi BBM
- Data lengkap: jumlah, biaya, odometer, lokasi, catatan
- Validasi data otomatis

### 📈 Laporan & Analisis
- Tren konsumsi dan biaya bulanan
- Perbandingan efisiensi antar kendaraan
- Grafik visualisasi data
- Statistik pertumbuhan month-over-month

## Teknologi yang Digunakan

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Vite** - Build tool

### Database
- **MySQL** - Primary database
- **Stored Procedures** - Auto-calculation logic
- **Views** - Optimized reporting queries
- **Triggers** - Automatic efficiency calculations

## Struktur Database

### Tabel Utama
1. **vehicles** - Data kendaraan
2. **fuel_transactions** - Transaksi BBM
3. **fuel_efficiency** - Perhitungan efisiensi

### Views
- **dashboard_stats** - Statistik dashboard
- **monthly_trends** - Tren bulanan
- **vehicle_efficiency_comparison** - Perbandingan efisiensi

## Setup Database MySQL

1. **Import Schema**
   ```sql
   mysql -u username -p < database/schema.sql
   ```

2. **Konfigurasi Koneksi**
   ```javascript
   const dbConfig = {
     host: 'localhost',
     user: 'your_username',
     password: 'your_password',
     database: 'fuel_monitoring'
   };
   ```

## Instalasi & Development

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd fuel-monitoring-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Database**
   - Buat database MySQL
   - Import schema dari `database/schema.sql`
   - Konfigurasi koneksi database

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

## Fitur Unggulan

### 🔄 Auto-calculation
- Sistem otomatis menghitung efisiensi BBM berdasarkan data odometer dan pengisian
- Update real-time setiap ada transaksi baru

### 📱 Responsive Design
- Interface adaptif untuk desktop, tablet, dan mobile
- Optimized touch interactions untuk mobile users

### 💾 Data Persistence
- Saat ini menggunakan localStorage untuk demo
- Siap integrasi dengan MySQL backend
- Data aman dan terstruktur

### 🎨 Modern UI/UX
- Design clean dan professional
- Color-coded fuel types
- Smooth animations dan transitions
- Intuitive navigation

## Rencana Pengembangan

### Backend Integration
- [ ] REST API dengan Node.js/Express
- [ ] MySQL connection pooling
- [ ] Authentication & authorization
- [ ] Data validation & sanitization

### Fitur Tambahan
- [ ] Export data ke Excel/PDF
- [ ] Notifikasi maintenance schedule
- [ ] Multi-user support
- [ ] Backup & restore data
- [ ] Mobile app (React Native)

### Analytics
- [ ] Advanced reporting
- [ ] Predictive maintenance alerts
- [ ] Cost optimization suggestions
- [ ] Fuel price tracking integration

## Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat feature branch
3. Commit changes
4. Submit pull request

## Lisensi

MIT License - lihat file LICENSE untuk detail lengkap.

---

**Catatan**: Aplikasi ini dirancang untuk environment produksi dengan implementasi database MySQL yang robust dan sistem keamanan yang memadai.