import React from 'react';
import { X, Edit, Calendar, User, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { MaintenanceRequest } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface MaintenanceDetailProps {
  request: MaintenanceRequest;
  onClose: () => void;
  onEdit: () => void;
}

const MaintenanceDetail: React.FC<MaintenanceDetailProps> = ({ request, onClose, onEdit }) => {
  const { user } = useAuth();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'in_progress':
        return <Clock className="text-blue-600" size={24} />;
      case 'pending':
        return <AlertCircle className="text-yellow-600" size={24} />;
      case 'rejected':
        return <AlertCircle className="text-red-600" size={24} />;
      default:
        return <Clock className="text-gray-600" size={24} />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'repair':
        return 'Perbaikan';
      case 'inspection':
        return 'Inspeksi';
      case 'replacement':
        return 'Penggantian';
      case 'upgrade':
        return 'Upgrade';
      default:
        return category;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'Mendesak';
      case 'high':
        return 'Tinggi';
      case 'medium':
        return 'Sedang';
      case 'low':
        return 'Rendah';
      default:
        return priority;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu';
      case 'approved':
        return 'Disetujui';
      case 'in_progress':
        return 'Sedang Dikerjakan';
      case 'completed':
        return 'Selesai';
      case 'rejected':
        return 'Ditolak';
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">Detail Request Maintenance</h2>
            <span className="text-sm text-gray-600 font-mono">#{request.id}</span>
          </div>
          <div className="flex items-center gap-2">
            {(user?.role === 'admin' || request.userId === user?.id) && (
              <button
                onClick={onEdit}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="inline mr-2" size={16} />
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Status */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {getStatusIcon(request.status)}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{request.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(request.status)}`}>
                        {getStatusLabel(request.status)}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full border ${getPriorityColor(request.priority)}`}>
                        {getPriorityLabel(request.priority)}
                      </span>
                      <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                        {getCategoryLabel(request.category)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{request.description}</p>
                </div>
              </div>

              {/* Admin Notes */}
              {request.adminNotes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Catatan Admin</h3>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-blue-800">{request.adminNotes}</p>
                  </div>
                </div>
              )}

              {/* Images */}
              {request.images && request.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Lampiran Gambar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {request.images.map((image, index) => (
                      <div key={index} className="aspect-w-16 aspect-h-12">
                        <img
                          src={image}
                          alt={`Lampiran ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Request Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Informasi Request</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="text-gray-400" size={16} />
                    <span className="text-gray-600">Dibuat oleh:</span>
                    <span className="text-gray-900 font-medium">{request.user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-gray-600">Tanggal dibuat:</span>
                    <span className="text-gray-900">{formatDateTime(request.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-gray-600">Terakhir update:</span>
                    <span className="text-gray-900">{formatDateTime(request.updatedAt)}</span>
                  </div>
                  {request.scheduledDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-400" size={16} />
                      <span className="text-gray-600">Terjadwal:</span>
                      <span className="text-gray-900">{formatDate(request.scheduledDate)}</span>
                    </div>
                  )}
                  {request.completedDate && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-gray-400" size={16} />
                      <span className="text-gray-600">Selesai:</span>
                      <span className="text-gray-900">{formatDate(request.completedDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Assignment Info */}
              {request.assignedTo && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Penugasan</h3>
                  <div className="flex items-center gap-2">
                    <User className="text-blue-600" size={16} />
                    <span className="text-blue-800">{request.assignedTo}</span>
                  </div>
                </div>
              )}

              {/* Cost Information */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">Informasi Biaya</h3>
                <div className="space-y-2">
                  {request.estimatedCost && (
                    <div className="flex items-center justify-between">
                      <span className="text-green-700 text-sm">Estimasi:</span>
                      <span className="text-green-900 font-semibold">
                        {formatCurrency(request.estimatedCost)}
                      </span>
                    </div>
                  )}
                  {request.actualCost && (
                    <div className="flex items-center justify-between">
                      <span className="text-green-700 text-sm">Aktual:</span>
                      <span className="text-green-900 font-semibold">
                        {formatCurrency(request.actualCost)}
                      </span>
                    </div>
                  )}
                  {request.estimatedCost && request.actualCost && (
                    <div className="pt-2 border-t border-green-300">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700 text-sm">Selisih:</span>
                        <span className={`font-semibold ${
                          request.actualCost > request.estimatedCost ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {request.actualCost > request.estimatedCost ? '+' : ''}
                          {formatCurrency(request.actualCost - request.estimatedCost)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Request dibuat</p>
                      <p className="text-xs text-gray-600">{formatDateTime(request.createdAt)}</p>
                    </div>
                  </div>
                  
                  {request.status !== 'pending' && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Status diperbarui</p>
                        <p className="text-xs text-gray-600">{formatDateTime(request.updatedAt)}</p>
                      </div>
                    </div>
                  )}
                  
                  {request.completedDate && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Maintenance selesai</p>
                        <p className="text-xs text-gray-600">{formatDateTime(request.completedDate)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetail;