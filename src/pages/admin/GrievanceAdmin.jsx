// src/pages/admin/GrievanceAdmin.jsx
// ============================================
// ADMIN DASHBOARD - Grievance Management
// Manage all grievances, update status, add progress
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import grievanceService from '../../services/grievanceService';
import { 
  GRIEVANCE_TIERS, 
  GRIEVANCE_STATUS,
  DEPARTMENT_CATEGORIES,
  PROGRESS_STAGES,
  formatCurrency,
  getStatusById
} from '../../config/grievanceConfig';
import { 
  FaChartLine,
  FaFilter,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimes,
  FaEye,
  FaPlus,
  FaDownload,
  FaSearch,
  FaExclamationTriangle,
  FaMoneyBillWave
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const GrievanceAdmin = () => {
  const navigate = useNavigate();
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  
  // Modal states
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  
  // Form states
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [progressMessage, setProgressMessage] = useState('');
  const [progressNote, setProgressNote] = useState('');
  const [refundReason, setRefundReason] = useState('');

  useEffect(() => {
    checkAdminAccess();
    loadData();
  }, []);

  useEffect(() => {
    filterGrievances();
  }, [grievances, searchTerm, tierFilter, statusFilter, departmentFilter, paymentFilter]);

  const checkAdminAccess = () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error('Please login as admin');
      navigate('/login');
      return;
    }
    
    // Check if user has admin role
    // In production, check user role from Firestore
    // For now, we'll allow access (you can add role check here)
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [grievancesData, statsData] = await Promise.all([
        grievanceService.getGrievances({ limit: 1000 }),
        grievanceService.getStats()
      ]);
      setGrievances(grievancesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const filterGrievances = () => {
    let filtered = [...grievances];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(g => 
        g.title?.toLowerCase().includes(term) ||
        g.userId?.toLowerCase().includes(term) ||
        g.userEmail?.toLowerCase().includes(term) ||
        g.city?.toLowerCase().includes(term)
      );
    }

    // Tier filter
    if (tierFilter !== 'all') {
      filtered = filtered.filter(g => g.tier === tierFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(g => g.status === statusFilter);
    }

    // Department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(g => g.department === departmentFilter);
    }

    // Payment filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(g => g.paymentStatus === paymentFilter);
    }

    setFilteredGrievances(filtered);
  };

  const handleUpdateStatus = async () => {
    if (!newStatus) {
      toast.error('Please select a status');
      return;
    }

    try {
      await grievanceService.updateStatus(selectedGrievance.id, newStatus, statusNote);
      toast.success('Status updated successfully');
      setShowStatusModal(false);
      setNewStatus('');
      setStatusNote('');
      await loadData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.message || 'Failed to update status');
    }
  };

  const handleAddProgress = async () => {
    if (!progressMessage.trim()) {
      toast.error('Please enter a progress message');
      return;
    }

    try {
      await grievanceService.addProgressUpdate(
        selectedGrievance.id,
        progressMessage,
        progressNote
      );
      toast.success('Progress update added');
      setShowProgressModal(false);
      setProgressMessage('');
      setProgressNote('');
      await loadData();
    } catch (error) {
      console.error('Error adding progress:', error);
      toast.error(error.message || 'Failed to add progress');
    }
  };

  const handleProcessRefund = async () => {
    if (!refundReason.trim()) {
      toast.error('Please provide a reason');
      return;
    }

    try {
      await grievanceService.processRefund(selectedGrievance.id, refundReason);
      toast.success('Refund processed successfully');
      setShowRefundModal(false);
      setRefundReason('');
      await loadData();
    } catch (error) {
      console.error('Error processing refund:', error);
      toast.error(error.message || 'Failed to process refund');
    }
  };

  const handleDeleteGrievance = async (grievanceId) => {
    if (!window.confirm('Are you sure you want to delete this grievance? This action cannot be undone.')) {
      return;
    }

    try {
      await grievanceService.deleteGrievance(grievanceId);
      toast.success('Grievance deleted');
      await loadData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error(error.message || 'Failed to delete');
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Tier', 'Status', 'Department', 'City', 'State', 'Votes', 'Created', 'Payment Status'];
    const rows = filteredGrievances.map(g => [
      g.id,
      g.title,
      g.tier,
      g.status,
      g.department,
      g.city,
      g.state,
      g.netVotes || 0,
      new Date(g.createdAt).toLocaleDateString(),
      g.paymentStatus
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grievances_${new Date().toISOString()}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  const getTierConfig = (tier) => {
    return GRIEVANCE_TIERS[tier?.toUpperCase()] || GRIEVANCE_TIERS.MICRO;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Grievance Admin Dashboard</h1>
              <p className="text-white/90">Manage and track all grievances</p>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100 font-semibold"
            >
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      {stats && (
        <div className="bg-white border-b py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-600">{stats.active || 0}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-indigo-600">
                  {grievances.filter(g => g.status === 'in_progress').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
                <div className="text-sm text-gray-600">Resolved</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-gray-600">{stats.closed}</div>
                <div className="text-sm text-gray-600">Closed</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-600">
                  {stats.readyForArticle || 0}
                </div>
                <div className="text-sm text-gray-600">Ready for Article</div>
              </div>
            </div>

            {/* Tier Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">{stats.byTier?.top || 0}</div>
                <div className="text-sm text-gray-600">Top Tier</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">{stats.byTier?.medium || 0}</div>
                <div className="text-sm text-gray-600">Medium Tier</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{stats.byTier?.micro || 0}</div>
                <div className="text-sm text-gray-600">Micro Tier</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, user email, city..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {/* Tier Filter */}
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Tiers</option>
                {Object.values(GRIEVANCE_TIERS).map(tier => (
                  <option key={tier.id} value={tier.id}>{tier.badge}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Statuses</option>
                {Object.values(GRIEVANCE_STATUS).map(status => (
                  <option key={status.id} value={status.id}>
                    {status.icon} {status.label}
                  </option>
                ))}
              </select>

              {/* Department Filter */}
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Departments</option>
                {DEPARTMENT_CATEGORIES.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.icon} {dept.label}
                  </option>
                ))}
              </select>

              {/* Payment Filter */}
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Payments</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
                <option value="failed">Failed</option>
              </select>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setTierFilter('all');
                  setStatusFilter('all');
                  setDepartmentFilter('all');
                  setPaymentFilter('all');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Showing {filteredGrievances.length} of {grievances.length} grievances
            </div>
          </div>
        </div>
      </div>

      {/* Grievances Table */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Votes</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGrievances.map((grievance) => {
                  const tierConfig = getTierConfig(grievance.tier);
                  const statusConfig = getStatusById(grievance.status);
                  
                  return (
                    <tr key={grievance.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 ${tierConfig.bgColor} text-white rounded text-xs font-semibold`}>
                          {tierConfig.badge}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-xs">
                          <div className="font-medium text-gray-900 truncate">{grievance.title}</div>
                          <div className="text-xs text-gray-500">{grievance.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 bg-${statusConfig.color}-100 text-${statusConfig.color}-700 rounded text-xs font-medium`}>
                          {statusConfig.icon} {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                        {grievance.department}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {grievance.city}, {grievance.state}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">↑{grievance.upvotes || 0}</span>
                          <span className="text-red-600">↓{grievance.downvotes || 0}</span>
                          <span className="font-semibold">({grievance.netVotes || 0})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          grievance.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                          grievance.paymentStatus === 'refunded' ? 'bg-blue-100 text-blue-700' :
                          grievance.paymentStatus === 'failed' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {grievance.paymentStatus?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(grievance.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/grievance/${grievance.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="View"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedGrievance(grievance);
                              setShowStatusModal(true);
                            }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded"
                            title="Update Status"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedGrievance(grievance);
                              setShowProgressModal(true);
                            }}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded"
                            title="Add Progress"
                          >
                            <FaPlus />
                          </button>
                          {grievance.paymentStatus === 'paid' && (
                            <button
                              onClick={() => {
                                setSelectedGrievance(grievance);
                                setShowRefundModal(true);
                              }}
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded"
                              title="Process Refund"
                            >
                              <FaMoneyBillWave />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteGrievance(grievance.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredGrievances.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No grievances found matching your filters
            </div>
          )}
        </div>
      </div>

      {/* Update Status Modal */}
      {showStatusModal && selectedGrievance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Update Status</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Status *
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select status</option>
                  {Object.values(GRIEVANCE_STATUS).map(status => (
                    <option key={status.id} value={status.id}>
                      {status.icon} {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Note (Optional)
                </label>
                <textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows={3}
                  placeholder="Add a note about this status change..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setNewStatus('');
                  setStatusNote('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Progress Modal */}
      {showProgressModal && selectedGrievance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Add Progress Update</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress Message *
                </label>
                <input
                  type="text"
                  value={progressMessage}
                  onChange={(e) => setProgressMessage(e.target.value)}
                  placeholder="e.g., Forwarded to concerned department"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Note (Optional)
                </label>
                <textarea
                  value={progressNote}
                  onChange={(e) => setProgressNote(e.target.value)}
                  rows={4}
                  placeholder="Add detailed information about this progress update..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowProgressModal(false);
                  setProgressMessage('');
                  setProgressNote('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProgress}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Process Refund Modal */}
      {showRefundModal && selectedGrievance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Process Refund</h3>
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-900 mb-2">
                <strong>Grievance:</strong> {selectedGrievance.title}
              </div>
              <div className="text-sm text-blue-900 mb-2">
                <strong>Payment Amount:</strong> {formatCurrency(selectedGrievance.paymentAmount || 0)}
              </div>
              <div className="text-sm text-blue-900">
                <strong>Refund Amount:</strong> {formatCurrency(selectedGrievance.refundAmount || 0)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund Reason *
              </label>
              <select
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              >
                <option value="">Select reason</option>
                <option value="resolved">Grievance Resolved</option>
                <option value="closed_by_user">Closed by User</option>
                <option value="duplicate">Duplicate Grievance</option>
                <option value="invalid">Invalid Grievance</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowRefundModal(false);
                  setRefundReason('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessRefund}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Process Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrievanceAdmin;