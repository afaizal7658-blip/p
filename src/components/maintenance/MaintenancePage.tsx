import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  User, 
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { MaintenanceRequest } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import MaintenanceForm from './MaintenanceForm';
import MaintenanceDetail from './MaintenanceDetail';

const MaintenancePage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<MaintenanceRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [editingRequest, setEditingRequest] = useState<MaintenanceRequest | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  useEffect(() => {
    const mockRequests: MaintenanceRequest[] = [
      {
        id: 'MR001',
        userId: '2',
        user: {
          id: '2',
          name: 'Regular User',
          email: 'user@example.com',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        title: 'Perbaikan Sensor Suhu A1',
        description: 'Sensor suhu A1 tidak memberikan pembacaan yang akurat. Perlu dikalibrasi atau diganti.',
        category: 'repair',
        priority: 'high',
        status: 'in_progress',
        assignedTo: 'Teknisi Ahmad',
        estimatedCost: 500000,
        scheduledDate: '2024-01-20',
        images: ['https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=400'],
        adminNotes: 'Sedang dalam proses perbaikan, estimasi selesai 2 hari.',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-18T14:20:00Z',
      },
      {
        id: 'MR002',
        userId: '2',
        user: {
          id: '2',
          name: 'Regular User',
          email: 'user@example.com',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        title: 'Kalibrasi Data Logger',
        description: 'Data logger perlu dikalibrasi ulang karena hasil pembacaan tidak konsisten.',
        category: 'inspection',
        priority: 'medium',
        status: 'pending',
        estimatedCost: 200000,
        createdAt: '2024-01-14T09:15:00Z',
        updatedAt: '2024-01-14T09:15:00Z',
      },
      {
        id: 'MR003',
        userId: '2',
        user: {
          id: '2',
          name: 'Regular User',
          email: 'user@example.com',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        },
        title: 'Penggantian Baterai UPS',
        description: 'Baterai UPS sudah lemah dan perlu diganti untuk menjaga kontinuitas sistem.',
        category: 'replacement',
        priority: 'low',
        status: 'completed',
        assignedTo: 'Teknisi Budi',
        estimatedCost: 800000,
        actualCost: 750000,
        scheduledDate: '2024-01-10',
        completedDate: '2024-01-12',
        adminNotes: 'Penggantian baterai berhasil dilakukan. Sistem berjalan normal.',
        createdAt: '2024-01-08T16:45:00Z',
        updatedAt: '2024-01-12T11:30:00Z',
      },
    ];

    setTimeout(() => {
      setRequests(mockRequests);
      setFilteredRequests(mockRequests);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter requests
  useEffect(() => {
    let filtered = requests;

    // Filter by user role
    if (user?.role === 'user') {
      filtered = filtered.filter(request => request.userId === user.id);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(request => request.priority === priorityFilter);
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, statusFilter, priorityFilter, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'in_progress':
        return <Clock className="text-blue-600" size={20} />;
      case 'pending':
        return <AlertCircle className="text-yellow-600" size={20} />;
      case 'rejected':
        return <AlertCircle className="text-red-600" size={20} />;
      default:
        return <Clock className="text-gray-600" size={20} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const handleCreateRequest = () => {
    setEditingRequest(null);
    setShowForm(true);
  };

  const handleEditRequest = (request: MaintenanceRequest) => {
    setEditingRequest(request);
    setShowForm(true);
  };

  const handleViewRequest = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setShowDetail(true);
  };

  const handleDeleteRequest = (requestId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus request ini?')) {
      setRequests(prev => prev.filter(r => r.id !== requestId));
    }
  };

  const handleSaveRequest = (requestData: any) => {
    if (editingRequest) {
      // Update existing request
      setRequests(prev => prev.map(r => 
        r.id === editingRequest.id 
          ? { ...r, ...requestData, updatedAt: new Date().toISOString() }
          : r
      ));
    } else {
      // Add new request
      const newRequest: MaintenanceRequest = {
        id: `MR${String(requests.length + 1).padStart(3, '0')}`,
        userId: user!.id,
        user: user!,
        ...requestData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setRequests(prev => [...prev, newRequest]);
    }
    setShowForm(false);
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const inProgressCount = requests.filter(r => r.status === 'in_progress').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data maintenance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'admin' ? 'Manajemen Maintenance' : 'Request Maintenance'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'admin' 
              ? 'Kelola permintaan maintenance dari pengguna'
              : 'Ajukan dan pantau permintaan maintenance Anda'
            }
          </p>
        </div>
        <button
          onClick={handleCreateRequest}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="inline mr-2" size={16} />
          {user?.role === 'admin' ? 'Tambah Request' : 'Buat Request'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Request</p>
              <p className="text-3xl font-bold text-gray-900">{requests.length}</p>
            </div>
            <Wrench className="text-blue-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <AlertCircle className="text-yellow-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">{inProgressCount}</p>
            </div>
            <Clock className="text-blue-600" size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{completedCount}</p>
            </div>
            <CheckCircle className="text-green-600" size={48} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari request..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="md:w-48">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Semua Prioritas</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                  <span className="text-sm text-gray-600 font-mono">#{request.id}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3 line-clamp-2">{request.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{request.user.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{new Date(request.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                  {request.estimatedCost && (
                    <div className="flex items-center gap-1">
                      <span>Estimasi: {formatCurrency(request.estimatedCost)}</span>
                    </div>
                  )}
                  {request.assignedTo && (
                    <div className="flex items-center gap-1">
                      <span>Teknisi: {request.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {getStatusIcon(request.status)}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewRequest(request)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Lihat Detail"
                  >
                    <Eye size={16} />
                  </button>
                  {(user?.role === 'admin' || request.userId === user?.id) && (
                    <>
                      <button
                        onClick={() => handleEditRequest(request)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(request.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada request ditemukan</h3>
          <p className="text-gray-600">Coba ubah filter atau buat request baru</p>
        </div>
      )}

      {/* Maintenance Form Modal */}
      {showForm && (
        <MaintenanceForm
          request={editingRequest}
          onSave={handleSaveRequest}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Maintenance Detail Modal */}
      {showDetail && selectedRequest && (
        <MaintenanceDetail
          request={selectedRequest}
          onClose={() => setShowDetail(false)}
          onEdit={() => {
            setShowDetail(false);
            handleEditRequest(selectedRequest);
          }}
        />
      )}
    </div>
  );
};

export default MaintenancePage;