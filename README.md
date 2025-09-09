# Aplikasi Monitoring BBM untuk Perusahaan Tambang

Aplikasi web berbasis React untuk monitoring konsumsi bahan bakar kendaraan tambang dengan sistem IoT terintegrasi. Platform ini memungkinkan perusahaan tambang untuk memantau penggunaan BBM, lokasi kendaraan, dan membeli sensor tambahan untuk ekspansi armada.

## Fitur Utama

### 🏢 Multi-Company System
- Setiap akun mewakili perusahaan tambang yang berbeda
- Data terpisah dan aman antar perusahaan
- Dashboard khusus per perusahaan

### 📊 Monitoring BBM Real-time
- Tracking konsumsi BBM per kendaraan tambang
- Monitoring lokasi kendaraan dengan GPS
- Data sensor IoT real-time (suhu, tekanan, getaran)
- Alert otomatis untuk anomali konsumsi BBM
- Laporan efisiensi bahan bakar

### 🚛 Manajemen Armada Tambang
- Registrasi kendaraan tambang (dump truck, excavator, bulldozer, dll)
- Tracking maintenance schedule
- Monitoring kondisi mesin
- Riwayat penggunaan dan performa

### 🛒 E-commerce Sensor IoT
- Katalog sensor BBM dan monitoring
- Sensor GPS tracking
- Sensor suhu dan tekanan
- Kit monitoring lengkap
- Checkout dan pembayaran online

### ⚙️ Request Maintenance
- Pengajuan maintenance kendaraan tambang
- Tracking status perbaikan
- Estimasi biaya dan waktu
- Riwayat maintenance

## Teknologi yang Digunakan

### Frontend
- **React 18** - UI framework modern
- **TypeScript** - Type safety dan development experience
- **Tailwind CSS** - Styling framework responsif
- **Lucide React** - Icon library
- **Vite** - Build tool cepat

### Backend Integration Ready
- **REST API** - Siap integrasi dengan Laravel backend
- **Real-time Data** - WebSocket support untuk data IoT
- **Payment Gateway** - Integrasi Midtrans/payment processor
- **File Upload** - Support untuk gambar dan dokumen

## Struktur Aplikasi

### Dashboard Admin (Perusahaan)
- Overview konsumsi BBM seluruh armada
- Monitoring real-time lokasi kendaraan
- Manajemen user internal perusahaan
- Laporan dan analytics
- Pengaturan alert dan threshold

### Dashboard User (Operator/Driver)
- Status kendaraan yang dioperasikan
- Konsumsi BBM personal
- Request maintenance
- Notifikasi dan alert

### E-commerce Module
- Katalog sensor dan perangkat IoT
- Keranjang belanja
- Proses checkout
- Riwayat pembelian
- Tracking pengiriman

## Fitur Monitoring Khusus Tambang

### 🔋 Fuel Management
- Real-time fuel level monitoring
- Konsumsi per jam operasi
- Efisiensi BBM per jenis pekerjaan
- Prediksi kebutuhan BBM
- Alert fuel level rendah

### 📍 Location Tracking
- GPS tracking real-time
- Geofencing area tambang
- Rute optimasi
- Monitoring area kerja
- History pergerakan

### 🔧 Predictive Maintenance
- Monitoring kondisi mesin
- Prediksi kebutuhan maintenance
- Alert komponen kritis
- Scheduling maintenance otomatis
- Cost optimization

### 📈 Analytics & Reporting
- Dashboard executive summary
- Trend analysis konsumsi BBM
- Perbandingan performa antar kendaraan
- ROI analysis
- Export data ke Excel/PDF

## Setup dan Instalasi

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd fuel-monitoring-mining
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure API endpoints, payment gateway, etc.
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

## Integrasi IoT

### Sensor yang Didukung
- **Fuel Level Sensor** - Monitoring level BBM real-time
- **GPS Tracker** - Lokasi dan pergerakan kendaraan
- **Engine Sensor** - Suhu, RPM, tekanan oli
- **Vibration Sensor** - Deteksi anomali mesin
- **Load Sensor** - Monitoring beban kendaraan

### Data Flow
1. Sensor IoT → Gateway → Cloud Server
2. Real-time data processing
3. Alert system untuk anomali
4. Dashboard visualization
5. Historical data storage

## Keamanan Data

### Multi-Tenant Architecture
- Data isolation per perusahaan
- Role-based access control
- Encrypted data transmission
- Audit trail lengkap

### Compliance
- ISO 27001 ready
- GDPR compliance
- Industry standard security
- Regular security updates

## Roadmap Pengembangan

### Phase 1 (Current)
- ✅ Basic monitoring dashboard
- ✅ E-commerce sensor
- ✅ User management
- ✅ Maintenance requests

### Phase 2 (Q2 2024)
- [ ] Advanced analytics
- [ ] Mobile app companion
- [ ] API integration dengan ERP
- [ ] Automated reporting

### Phase 3 (Q3 2024)
- [ ] AI-powered predictive maintenance
- [ ] Advanced geofencing
- [ ] Integration dengan sistem payroll
- [ ] Carbon footprint tracking

## Support dan Dokumentasi

- **Technical Support**: support@fuelmonitoring.com
- **API Documentation**: [docs.fuelmonitoring.com]
- **Training Materials**: [training.fuelmonitoring.com]
- **Community Forum**: [community.fuelmonitoring.com]

## Lisensi

Enterprise License - Hubungi sales team untuk informasi lisensi dan pricing.

---

**Catatan**: Aplikasi ini dirancang khusus untuk industri pertambangan dengan fokus pada efisiensi operasional, keamanan, dan compliance dengan standar industri.