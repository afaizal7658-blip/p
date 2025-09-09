import React from 'react';
import { 
  Users,
  Truck,
  Fuel,
  DollarSign,
  Wrench,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Activity,
  MapPin,
  Gauge,
  Zap
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = {
    totalVehicles: 47,
    activeVehicles: 42,
    totalFuelConsumed: 15420, // liters
    totalFuelCost: 245680000, // IDR
    pendingMaintenance: 8,
    unreadMessages: 5,
    activeAlerts: 12,
    avgEfficiency: 3.2, // km/liter
  };

  const recentActivities = [
    {
      id: '1',
      type: 'fuel',
      description: 'Dump Truck DT-001 melakukan pengisian BBM 250L',
      timestamp: '5 menit lalu',
      status: 'normal',
    },
    {
      id: '2',
      type: 'alert',
      description: 'Excavator EX-003 konsumsi BBM tinggi terdeteksi',
      timestamp: '15 menit lalu',
      status: 'warning',
    },
    {
      id: '3',
      type: 'maintenance',
      description: 'Bulldozer BD-002 request maintenance engine',
      timestamp: '30 menit lalu',
      status: 'pending',
    },
    {
      id: '4',
      type: 'location',
      description: 'Dump Truck DT-005 keluar dari area tambang',
      timestamp: '1 jam lalu',
      status: 'alert',
    },
  ];

  const topVehicles = [
    { name: 'Dump Truck DT-001', consumption: 1250, cost: 18750000, efficiency: 2.8 },
    { name: 'Excavator EX-002', consumption: 980, cost: 14700000, efficiency: 3.1 },
    { name: 'Bulldozer BD-001', consumption: 850, cost: 12750000, efficiency: 3.5 },
    { name: 'Dump Truck DT-003', consumption: 720, cost: 10800000, efficiency: 3.8 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const formatFuel = (liters: number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 1,
    }).format(liters) + ' L';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Monitoring BBM</h1>
          <p className="text-gray-600 mt-1">Monitoring real-time armada tambang dan konsumsi bahan bakar.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Activity className="inline mr-2" size={16} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Kendaraan</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalVehicles}</p>
              <p className="text-sm text-blue-600 mt-1">{stats.activeVehicles} aktif</p>
            </div>
            <Truck className="text-blue-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Konsumsi BBM</p>
              <p className="text-3xl font-bold text-gray-900">{formatFuel(stats.totalFuelConsumed)}</p>
              <p className="text-sm text-green-600 mt-1">Bulan ini</p>
            </div>
            <Fuel className="text-green-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Biaya BBM</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalFuelCost)}</p>
              <p className="text-sm text-orange-600 mt-1">Bulan ini</p>
            </div>
            <DollarSign className="text-orange-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efisiensi Rata-rata</p>
              <p className="text-3xl font-bold text-gray-900">{stats.avgEfficiency}</p>
              <p className="text-sm text-green-600 mt-1">km/liter</p>
            </div>
            <Gauge className="text-purple-600" size={48} />
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Wrench className="text-yellow-600" size={24} />
            <div>
              <p className="font-semibold text-yellow-800">Maintenance Pending</p>
              <p className="text-sm text-yellow-700">{stats.pendingMaintenance} permintaan menunggu</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-blue-600" size={24} />
            <div>
              <p className="font-semibold text-blue-800">Pesan Operator</p>
              <p className="text-sm text-blue-700">{stats.unreadMessages} pesan baru</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={24} />
            <div>
              <p className="font-semibold text-red-800">Alert BBM & Lokasi</p>
              <p className="text-sm text-red-700">{stats.activeAlerts} alert perlu perhatian</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Aktivitas Terbaru</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'normal' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'alert' ? 'bg-red-500' :
                  activity.status === 'pending' ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Vehicles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Kendaraan Konsumsi Tertinggi</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              <MapPin className="inline mr-1" size={16} />
              Detail
            </button>
          </div>
          <div className="space-y-4">
            {topVehicles.map((vehicle, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vehicle.name}</p>
                    <p className="text-sm text-gray-600">{formatFuel(vehicle.consumption)} • {vehicle.efficiency} km/L</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(vehicle.cost)}</p>
                  <p className="text-sm text-gray-600">Biaya BBM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Tren Konsumsi BBM Bulanan</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">6 Bulan</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">1 Tahun</button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="mx-auto text-gray-400 mb-2" size={48} />
            <p className="text-gray-600">Grafik konsumsi BBM akan ditampilkan di sini</p>
            <p className="text-sm text-gray-500">Data real-time dari sensor IoT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;