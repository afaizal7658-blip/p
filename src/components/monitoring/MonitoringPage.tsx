import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Thermometer, 
  Zap, 
  Gauge, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { MonitoringData, MonitoringAlert } from '../../types';

const MonitoringPage: React.FC = () => {
  const [monitoringData, setMonitoringData] = useState<MonitoringData[]>([]);
  const [alerts, setAlerts] = useState<MonitoringAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Mock data generator
  const generateMockData = (): MonitoringData[] => {
    const sensors = [
      { name: 'BBM Level DT-001', type: 'fuel', unit: '%', location: 'Dump Truck DT-001' },
      { name: 'GPS Tracker DT-001', type: 'operational', unit: 'km/h', location: 'Area Tambang A' },
      { name: 'Engine Temp EX-002', type: 'sensor', unit: '°C', location: 'Excavator EX-002' },
      { name: 'Fuel Flow BD-003', type: 'fuel', unit: 'L/h', location: 'Bulldozer BD-003' },
      { name: 'Vibration Sensor DT-004', type: 'sensor', unit: 'Hz', location: 'Dump Truck DT-004' },
      { name: 'Load Weight DT-001', type: 'operational', unit: 'ton', location: 'Dump Truck DT-001' },
    ];

    return sensors.map((sensor, index) => {
      let value: number;
      let status: 'normal' | 'warning' | 'critical';

      // Generate realistic values based on sensor type
      switch (sensor.type) {
        case 'sensor':
          if (sensor.unit === '°C') {
            value = 70 + Math.random() * 50; // 70-120°C for engine temp
            status = value > 110 ? 'critical' : value > 95 ? 'warning' : 'normal';
          } else if (sensor.unit === 'Hz') {
            value = 10 + Math.random() * 20; // 10-30 Hz vibration
            status = value > 25 ? 'critical' : value > 20 ? 'warning' : 'normal';
          } else {
            value = 1 + Math.random() * 3; // 1-4 
            status = value > 3.5 ? 'critical' : value > 3 ? 'warning' : 'normal';
          }
          break;
        case 'operational':
          if (sensor.unit === 'km/h') {
            value = Math.random() * 60; // 0-60 km/h
            status = value > 50 ? 'warning' : 'normal';
          } else if (sensor.unit === 'ton') {
            value = 10 + Math.random() * 40; // 10-50 ton load
            status = value > 45 ? 'warning' : 'normal';
          } else {
            value = 220 + Math.random() * 20; // 220-240V
            status = value < 210 || value > 240 ? 'critical' : value < 220 || value > 235 ? 'warning' : 'normal';
          }
          break;
        case 'fuel':
          if (sensor.unit === '%') {
            value = 20 + Math.random() * 60; // 20-80% fuel level
            status = value < 25 ? 'critical' : value < 40 ? 'warning' : 'normal';
          } else {
            value = 15 + Math.random() * 25; // 15-40 L/h consumption
            status = value > 35 ? 'warning' : 'normal';
          }
          break;
        case 'maintenance':
          value = 70 + Math.random() * 30; // 70-100%
          status = value < 80 ? 'warning' : value < 75 ? 'critical' : 'normal';
          break;
        default:
          value = Math.random() * 100;
          status = 'normal';
      }

      return {
        id: `sensor-${index + 1}`,
        type: sensor.type as any,
        name: sensor.name,
        value: Math.round(value * 100) / 100,
        unit: sensor.unit,
        status,
        location: sensor.location,
        timestamp: new Date().toISOString(),
        metadata: {
          trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
          lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          vehicleId: sensor.location.split(' ').pop(), // Extract vehicle ID
        },
      };
    });
  };

  const generateMockAlerts = (data: MonitoringData[]): MonitoringAlert[] => {
    const alerts: MonitoringAlert[] = [];
    
    data.forEach(item => {
      if (item.status === 'critical') {
        alerts.push({
          id: `alert-${item.id}`,
          type: 'critical',
          title: `${item.name} - KRITIS`,
          message: `${item.location}: ${item.value}${item.unit} melebihi batas aman`,
          isRead: Math.random() > 0.7,
          createdAt: new Date().toISOString(),
        });
      } else if (item.status === 'warning') {
        alerts.push({
          id: `alert-${item.id}`,
          type: 'warning',
          title: `${item.name} - PERINGATAN`,
          message: `${item.location}: ${item.value}${item.unit} mendekati batas`,
          isRead: Math.random() > 0.5,
          createdAt: new Date().toISOString(),
        });
      }
    });

    return alerts;
  };

  const loadData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newData = generateMockData();
      const newAlerts = generateMockAlerts(newData);
      
      setMonitoringData(newData);
      setAlerts(newAlerts);
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="text-red-600" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case 'normal':
        return <CheckCircle className="text-green-600" size={20} />;
      default:
        return <Activity className="text-gray-600" size={20} />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-blue-600" size={16} />;
      case 'down':
        return <TrendingDown className="text-red-600" size={16} />;
      default:
        return <Minus className="text-gray-600" size={16} />;
    }
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'sensor':
        return <Thermometer className="text-orange-600" size={24} />;
      case 'operational':
        return <Activity className="text-blue-600" size={24} />;
      case 'fuel':
        return <Gauge className="text-green-600" size={24} />;
      case 'maintenance':
        return <Activity className="text-purple-600" size={24} />;
      default:
        return <Activity className="text-gray-600" size={24} />;
    }
  };

  const criticalCount = monitoringData.filter(item => item.status === 'critical').length;
  const warningCount = monitoringData.filter(item => item.status === 'warning').length;
  const normalCount = monitoringData.filter(item => item.status === 'normal').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoring BBM & Kendaraan</h1>
          <p className="text-gray-600 mt-1">
            Pemantauan real-time konsumsi BBM, lokasi, dan kondisi kendaraan tambang
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Update terakhir: {lastUpdate.toLocaleTimeString('id-ID')}
          </span>
          <button
            onClick={loadData}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`inline mr-2 ${isLoading ? 'animate-spin' : ''}`} size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Kendaraan</p>
              <p className="text-3xl font-bold text-gray-900">{monitoringData.length}</p>
            </div>
            <Activity className="text-blue-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Status Normal</p>
              <p className="text-3xl font-bold text-green-600">{normalCount}</p>
            </div>
            <CheckCircle className="text-green-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Peringatan</p>
              <p className="text-3xl font-bold text-yellow-600">{warningCount}</p>
            </div>
            <AlertTriangle className="text-yellow-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Status Kritis</p>
              <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
            </div>
            <AlertTriangle className="text-red-600" size={48} />
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Alert BBM & Kendaraan</h2>
          <div className="space-y-3">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' ? 'border-red-500 bg-red-50' :
                  alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(alert.createdAt).toLocaleString('id-ID')}
                    </p>
                  </div>
                  {!alert.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vehicle Monitoring Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monitoringData.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getSensorIcon(item.type)}
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.location}</p>
                </div>
              </div>
              {getStatusIcon(item.status)}
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {item.value}
                </span>
                <span className="text-lg text-gray-600">{item.unit}</span>
                {item.metadata?.trend && getTrendIcon(item.metadata.trend)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(item.status)}`}>
                {item.status === 'critical' ? 'KRITIS' :
                 item.status === 'warning' ? 'Peringatan' : 'Normal'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(item.timestamp).toLocaleTimeString('id-ID')}
              </span>
            </div>

            {item.metadata?.lastMaintenance && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Service terakhir: {new Date(item.metadata.lastMaintenance).toLocaleDateString('id-ID')}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data monitoring kendaraan...</p>
        </div>
      )}
    </div>
  );
};

export default MonitoringPage;