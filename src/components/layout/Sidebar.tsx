import React from 'react';
import { 
  Home, 
  Truck,
  Fuel,
  Users, 
  MessageSquare, 
  Wrench, 
  BarChart3,
  Settings,
  MapPin,
  Activity,
  Gauge,
  FileText,
  X,
  Package
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  isOpen, 
  onClose 
}) => {
  const { user } = useAuth();

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'products', label: 'Katalog Sensor IoT', icon: Package },
    { id: 'users', label: 'Manajemen User', icon: Users },
    { id: 'orders', label: 'Pesanan Sensor', icon: Truck },
    { id: 'transactions', label: 'Transaksi', icon: FileText },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'monitoring', label: 'Monitoring BBM', icon: Gauge },
    { id: 'messages', label: 'Sistem Pesan', icon: MessageSquare },
    { id: 'reports', label: 'Laporan', icon: FileText },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'products', label: 'Sensor IoT', icon: Package },
    { id: 'cart', label: 'Keranjang', icon: Truck },
    { id: 'orders', label: 'Pesanan Saya', icon: FileText },
    { id: 'monitoring', label: 'Monitoring BBM', icon: Fuel },
    { id: 'maintenance', label: 'Request Maintenance', icon: Wrench },
    { id: 'messages', label: 'Komunikasi', icon: MessageSquare },
    { id: 'reports', label: 'Laporan Saya', icon: BarChart3 },
    { id: 'settings', label: 'Pengaturan Akun', icon: Settings },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Fuel className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">FuelTracker</h1>
              <p className="text-xs text-gray-600">Mining Fuel Monitor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-600 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onViewChange(item.id);
                      onClose(); // Close sidebar on mobile after selection
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              © 2024 FuelTracker
            </p>
            <p className="text-xs text-gray-500">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;