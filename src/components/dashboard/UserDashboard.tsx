import React from 'react';
import { 
  Truck,
  Fuel,
  MapPin,
  Wrench, 
  MessageSquare,
  Gauge,
  Bell,
  AlertTriangle,
  Clock,
  CheckCircle,
  Zap,
  Activity
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = {
    assignedVehicles: 3,
    activeVehicles: 2,
    todayFuelConsumption: 145.5, // liters
    maintenanceRequests: 2,
    unreadMessages: 1,
    avgEfficiency: 3.4, // km/liter
  };

  const myVehicles = [
    {
      id: 'DT-001',
      name: 'Dump Truck DT-001',
      type: 'Dump Truck',
      fuelLevel: 75,
      location: 'Area Penambangan A',
      status: 'active',
      lastUpdate: '5 menit lalu',
    },
    {
      id: 'EX-002',
      name: 'Excavator EX-002',
      type: 'Excavator',
      fuelLevel: 45,
      location: 'Area Penambangan B',
      status: 'active',
      lastUpdate: '2 menit lalu',
    },
    {
      id: 'BD-003',
      name: 'Bulldozer BD-003',
      type: 'Bulldozer',
      fuelLevel: 20,
      location: 'Workshop',
      status: 'maintenance',
      lastUpdate: '1 jam lalu',
    },
  ];

  const monitoringAlerts = [
    {
      id: '1',
      type: 'critical',
      title: 'BBM Level Rendah',
      message: 'Bulldozer BD-003 BBM tersisa 20%',
      timestamp: '10 menit lalu',
    },
    {
      id: '2',
      type: 'info',
      title: 'Kendaraan Keluar Area',
      message: 'Dump Truck DT-001 keluar dari geofence',
      timestamp: '2 jam lalu',
    },
    {
      id: '3',
      type: 'warning',
      title: 'Konsumsi BBM Tinggi',
      message: 'Excavator EX-002 konsumsi di atas normal',
      timestamp: '5 jam lalu',
    },
  ];

  const maintenanceRequests = [
    {
      id: 'MR001',
      title: 'Service Engine Bulldozer BD-003',
      status: 'in_progress',
      priority: 'high',
      date: '2024-01-15',
      vehicle: 'Bulldozer BD-003',
    },
    {
      id: 'MR002',
      title: 'Ganti Filter BBM Dump Truck',
      status: 'pending',
      priority: 'medium',
      date: '2024-01-14',
      vehicle: 'Dump Truck DT-001',
    },
  ];

  const formatFuel = (liters: number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 1,
    }).format(liters) + ' L';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
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

  const getFuelLevelColor = (level: number) => {
    if (level > 50) return 'bg-green-500';
    if (level > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getVehicleIcon = (type: string) => {
    return <Truck className="text-blue-600" size={20} />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Operator</h1>
          <p className="text-gray-600 mt-1">Monitoring kendaraan yang Anda operasikan hari ini.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <MapPin className="inline mr-2" size={16} />
            Lihat Lokasi
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kendaraan Assigned</p>
              <p className="text-3xl font-bold text-gray-900">{stats.assignedVehicles}</p>
            </div>
            <Truck className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kendaraan Aktif</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeVehicles}</p>
            </div>
            <Activity className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">BBM Hari Ini</p>
              <p className="text-3xl font-bold text-gray-900">{formatFuel(stats.todayFuelConsumption)}</p>
            </div>
            <Fuel className="text-orange-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Request Maintenance</p>
              <p className="text-3xl font-bold text-gray-900">{stats.maintenanceRequests}</p>
            </div>
            <Wrench className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efisiensi Rata-rata</p>
              <p className="text-3xl font-bold text-gray-900">{stats.avgEfficiency}</p>
              <p className="text-sm text-gray-600">km/liter</p>
            </div>
            <Gauge className="text-indigo-600" size={32} />
          </div>
        </div>
      </div>

      {/* Monitoring Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="text-orange-600" size={24} />
            Alert BBM & Lokasi
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
                  <AlertTriangle className="text-red-600 mt-1" size={20} />
                ) : alert.type === 'warning' ? (
                  <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                ) : (
                  <Bell className="text-blue-600 mt-1" size={20} />
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
        {/* My Vehicles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Kendaraan Saya</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {myVehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-4 rounded-lg hover:bg-gray-50 border border-gray-200">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getVehicleIcon(vehicle.type)}
                      <div>
                        <p className="font-medium text-gray-900">{vehicle.name}</p>
                        <p className="text-sm text-gray-600">{vehicle.location}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status === 'active' ? 'Aktif' : 
                       vehicle.status === 'maintenance' ? 'Maintenance' : 'Tidak Aktif'}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Level BBM</span>
                      <span className="font-medium">{vehicle.fuelLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${getFuelLevelColor(vehicle.fuelLevel)}`} 
                           style={{ width: `${vehicle.fuelLevel}%` }}></div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">Update: {vehicle.lastUpdate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Status Maintenance</h3>
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
                      {request.status === 'in_progress' ? 'Dikerjakan' : 
                       request.status === 'pending' ? 'Menunggu' : request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{request.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{request.vehicle}</p>
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
            <h3 className="text-xl font-semibold mb-2">Aksi Cepat Operator</h3>
            <p className="text-blue-100">Akses fitur yang sering digunakan</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              <Fuel className="inline mr-2" size={16} />
              Input BBM
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              <Wrench className="inline mr-2" size={16} />
              Request Maintenance
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors">
              <MapPin className="inline mr-2" size={16} />
              Cek Lokasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;