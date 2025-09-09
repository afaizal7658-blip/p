import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  FileText, 
  Wrench, 
  MessageSquare,
  Monitor,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = {
    totalOrders: 12,
    pendingOrders: 2,
    maintenanceRequests: 3,
    unreadMessages: 1,
    availableProducts: 89,
  };

  const recentOrders = [
    {
      id: '#12345',
      product: 'Sensor Suhu Digital',
      amount: 450000,
      status: 'delivered',
      date: '2024-01-15',
    },
    {
      id: '#12344',
      product: 'Monitoring Kit Pro',
      amount: 2500000,
      status: 'processing',
      date: '2024-01-14',
    },
    {
      id: '#12343',
      product: 'Smart Controller',
      amount: 800000,
      status: 'shipped',
      date: '2024-01-12',
    },
  ];

  const monitoringAlerts = [
    {
      id: '1',
      type: 'warning',
      title: 'Suhu Tinggi Terdeteksi',
      message: 'Sensor A1 mendeteksi suhu 85°C',
      timestamp: '10 menit lalu',
    },
    {
      id: '2',
      type: 'info',
      title: 'Maintenance Terjadwal',
      message: 'Maintenance rutin akan dilakukan besok',
      timestamp: '2 jam lalu',
    },
    {
      id: '3',
      type: 'critical',
      title: 'Koneksi Terputus',
      message: 'Sensor B2 tidak merespons',
      timestamp: '5 jam lalu',
    },
  ];

  const maintenanceRequests = [
    {
      id: 'MR001',
      title: 'Perbaikan Sensor Suhu',
      status: 'in_progress',
      priority: 'high',
      date: '2024-01-15',
    },
    {
      id: 'MR002',
      title: 'Kalibrasi Alat Ukur',
      status: 'pending',
      priority: 'medium',
      date: '2024-01-14',
    },
    {
      id: 'MR003',
      title: 'Penggantian Baterai',
      status: 'completed',
      priority: 'low',
      date: '2024-01-10',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Selamat datang! Berikut ringkasan aktivitas Anda.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Package className="inline mr-2" size={16} />
            Lihat Produk
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <FileText className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pesanan Pending</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
            </div>
            <Clock className="text-orange-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-3xl font-bold text-gray-900">{stats.maintenanceRequests}</p>
            </div>
            <Wrench className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pesan Baru</p>
              <p className="text-3xl font-bold text-gray-900">{stats.unreadMessages}</p>
            </div>
            <MessageSquare className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produk Tersedia</p>
              <p className="text-3xl font-bold text-gray-900">{stats.availableProducts}</p>
            </div>
            <Package className="text-indigo-600" size={32} />
          </div>
        </div>
      </div>

      {/* Monitoring Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="text-orange-600" size={24} />
            Alert Monitoring
          </h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Lihat Semua
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {monitoringAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'critical' ? 'border-red-500 bg-red-50' :
              alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-start gap-3">
                {alert.type === 'critical' ? (
                  <AlertCircle className="text-red-600 mt-1" size={20} />
                ) : alert.type === 'warning' ? (
                  <AlertCircle className="text-yellow-600 mt-1" size={20} />
                ) : (
                  <CheckCircle className="text-blue-600 mt-1" size={20} />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{alert.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
                  <p className="text-gray-400 text-xs mt-2">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Pesanan Terbaru</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.product}</p>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(order.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Request Maintenance</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Buat Request
            </button>
          </div>
          <div className="space-y-4">
            {maintenanceRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-medium text-gray-900">{request.id}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{request.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{request.date}</p>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Aksi Cepat</h3>
            <p className="text-blue-100">Lakukan tindakan yang sering Anda gunakan</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              <ShoppingCart className="inline mr-2" size={16} />
              Beli Produk
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              <Wrench className="inline mr-2" size={16} />
              Request Maintenance
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              <Monitor className="inline mr-2" size={16} />
              Lihat Monitoring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;