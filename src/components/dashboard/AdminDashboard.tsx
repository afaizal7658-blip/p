import React from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Wrench, 
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Activity,
  Eye
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = {
    totalUsers: 1247,
    totalProducts: 89,
    totalOrders: 342,
    totalRevenue: 45678900,
    pendingMaintenance: 12,
    unreadMessages: 8,
    activeAlerts: 3,
  };

  const recentActivities = [
    {
      id: '1',
      type: 'order',
      description: 'Pesanan baru #12345 dari John Doe',
      timestamp: '5 menit lalu',
      status: 'new',
    },
    {
      id: '2',
      type: 'maintenance',
      description: 'Request maintenance dari Jane Smith disetujui',
      timestamp: '15 menit lalu',
      status: 'approved',
    },
    {
      id: '3',
      type: 'user',
      description: 'User baru mendaftar: Ahmad Rahman',
      timestamp: '30 menit lalu',
      status: 'new',
    },
    {
      id: '4',
      type: 'message',
      description: 'Pesan baru dari customer support',
      timestamp: '1 jam lalu',
      status: 'unread',
    },
  ];

  const topProducts = [
    { name: 'Sensor Suhu Digital', sales: 45, revenue: 4500000 },
    { name: 'Monitoring Kit Pro', sales: 32, revenue: 8000000 },
    { name: 'Smart Controller', sales: 28, revenue: 5600000 },
    { name: 'Data Logger', sales: 21, revenue: 3150000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-1">Selamat datang kembali! Berikut ringkasan sistem Anda.</p>
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
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">↑ 12% dari bulan lalu</p>
            </div>
            <Users className="text-blue-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Produk</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              <p className="text-sm text-blue-600 mt-1">5 produk baru</p>
            </div>
            <Package className="text-green-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              <p className="text-sm text-orange-600 mt-1">{stats.pendingMaintenance} pending</p>
            </div>
            <ShoppingCart className="text-orange-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-sm text-green-600 mt-1">↑ 8% dari bulan lalu</p>
            </div>
            <DollarSign className="text-purple-600" size={48} />
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Wrench className="text-yellow-600" size={24} />
            <div>
              <p className="font-semibold text-yellow-800">Maintenance Requests</p>
              <p className="text-sm text-yellow-700">{stats.pendingMaintenance} permintaan menunggu</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-blue-600" size={24} />
            <div>
              <p className="font-semibold text-blue-800">Pesan Belum Dibaca</p>
              <p className="text-sm text-blue-700">{stats.unreadMessages} pesan baru</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={24} />
            <div>
              <p className="font-semibold text-red-800">Alert Monitoring</p>
              <p className="text-sm text-red-700">{stats.activeAlerts} alert aktif</p>
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
                  activity.status === 'new' ? 'bg-green-500' :
                  activity.status === 'approved' ? 'bg-blue-500' :
                  activity.status === 'unread' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Produk Terlaris</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              <Eye className="inline mr-1" size={16} />
              Detail
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
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
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} terjual</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Tren Revenue Bulanan</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">6 Bulan</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">1 Tahun</button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="mx-auto text-gray-400 mb-2" size={48} />
            <p className="text-gray-600">Chart akan ditampilkan di sini</p>
            <p className="text-sm text-gray-500">Integrasi dengan Chart.js atau library lainnya</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;