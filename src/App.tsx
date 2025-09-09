import React, { useState } from 'react';
import { useAuthState, AuthContext } from './hooks/useAuth';
import AuthPage from './components/auth/AuthPage';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import ProductList from './components/products/ProductList';
import CartPage from './components/cart/CartPage';
import MonitoringPage from './components/monitoring/MonitoringPage';
import MaintenancePage from './components/maintenance/MaintenancePage';

function App() {
  const authState = useAuthState();
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show loading screen
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!authState.isAuthenticated) {
    return (
      <AuthContext.Provider value={authState}>
        <AuthPage />
      </AuthContext.Provider>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return authState.user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
      case 'products':
        return <ProductList />;
      case 'cart':
        return <CartPage onBack={() => setCurrentView('products')} />;
      case 'users':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Manajemen User</h1>
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">Halaman manajemen user akan segera hadir</p>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {authState.user?.role === 'admin' ? 'Semua Pesanan' : 'Pesanan Saya'}
            </h1>
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">Halaman pesanan akan segera hadir</p>
            </div>
          </div>
        );
      case 'transactions':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Transaksi</h1>
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">Halaman transaksi akan segera hadir</p>
            </div>
          </div>
        );
      case 'maintenance':
        return <MaintenancePage />;
      case 'monitoring':
        return <MonitoringPage />;
      case 'messages':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sistem Pesan</h1>
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">Halaman pesan akan segera hadir</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {authState.user?.role === 'admin' ? 'Laporan Sistem' : 'Laporan Saya'}
            </h1>
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">Halaman laporan akan segera hadir</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {authState.user?.role === 'admin' ? 'Pengaturan Sistem' : 'Pengaturan Akun'}
            </h1>
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">Halaman pengaturan akan segera hadir</p>
            </div>
          </div>
        );
      default:
        return authState.user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
    }
  };

  return (
    <AuthContext.Provider value={authState}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Navbar */}
          <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {renderCurrentView()}
            </div>
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;