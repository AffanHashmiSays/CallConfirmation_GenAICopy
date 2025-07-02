import React, { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  PlusIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { apiService } from '../../services/api';
import GoogleSheetsSetup from './GoogleSheetsSetup';

interface Order {
  order_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  product_name: string;
  quantity: number;
  total_amount: number;
  order_date?: string;
  status: string;
  call_status: string;
  call_attempts: number;
  last_call_date?: string;
  confirmation_response?: string;
  notes?: string;
}

interface IntegrationStatus {
  success: boolean;
  message: string;
  spreadsheet_id?: string;
  spreadsheet_url?: string;
  data?: any;
}

const GoogleSheetsManager: React.FC = () => {
  const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatus | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newOrder, setNewOrder] = useState({
    order_id: '',
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    product_name: '',
    quantity: 1,
    total_amount: 0,
    notes: ''
  });
  const [showAddOrder, setShowAddOrder] = useState(false);

  useEffect(() => {
    checkIntegrationStatus();
  }, []);

  const checkIntegrationStatus = async () => {
    try {
      const response = await apiService.get('/integrations/google-sheets/status');
      setIntegrationStatus(response.data);
      if (response.data.success) {
        fetchPendingOrders();
      }
    } catch (err: any) {
      setIntegrationStatus({
        success: false,
        message: 'No integration found'
      });
    }
  };

  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      const response = await apiService.get('/integrations/google-sheets/pending-orders');
      setPendingOrders(response.data.orders || []);
    } catch (err: any) {
      setError('Failed to fetch orders from Google Sheets');
    } finally {
      setLoading(false);
    }
  };

  const handleSetupComplete = (data: any) => {
    setIntegrationStatus(data);
    setShowSetup(false);
    fetchPendingOrders();
  };

  const handleAddOrder = async () => {
    if (!newOrder.order_id || !newOrder.customer_name || !newOrder.customer_phone || !newOrder.product_name) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await apiService.post('/integrations/google-sheets/import-order', {
        ...newOrder,
        order_date: new Date().toISOString().split('T')[0]
      });
      
      setNewOrder({
        order_id: '',
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        product_name: '',
        quantity: 1,
        total_amount: 0,
        notes: ''
      });
      setShowAddOrder(false);
      fetchPendingOrders();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to add order');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string, response?: string) => {
    try {
      await apiService.post('/integrations/google-sheets/update-order', {
        order_id: orderId,
        call_status: status,
        confirmation_response: response || '',
        notes: `Updated via dashboard at ${new Date().toLocaleString()}`
      });
      fetchPendingOrders();
    } catch (err: any) {
      setError('Failed to update order status');
    }
  };

  const handleDisconnect = async () => {
    if (window.confirm('Are you sure you want to disconnect Google Sheets integration?')) {
      try {
        await apiService.delete('/integrations/google-sheets/disconnect');
        setIntegrationStatus(null);
        setPendingOrders([]);
      } catch (err: any) {
        setError('Failed to disconnect integration');
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'failed':
      case 'declined':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'not_called':
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Google Sheets Integration</h2>
          <p className="text-gray-600">Manage orders directly from Google Sheets</p>
        </div>
        {integrationStatus?.success && (
          <div className="flex gap-2">
            <button
              onClick={fetchPendingOrders}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={handleDisconnect}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Disconnect
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => setError('')}
            className="text-red-600 hover:text-red-800 mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Integration Status */}
      {!integrationStatus?.success ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Google Sheets Not Connected
            </h3>
            <p className="text-gray-600 mb-6">
              Connect your Google Sheets to manage orders in real-time and automate your workflow.
            </p>
            <button
              onClick={() => setShowSetup(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center mx-auto"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Connect Google Sheets
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {integrationStatus.data?.title || 'Google Sheets Connected'}
                </h3>
                <p className="text-gray-600">Integration is active and working</p>
              </div>
            </div>
            <a
              href={integrationStatus.spreadsheet_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
              Open Sheet
            </a>
          </div>
        </div>
      )}

      {/* Add Order Section */}
      {integrationStatus?.success && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add New Order</h3>
            <button
              onClick={() => setShowAddOrder(!showAddOrder)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Order
            </button>
          </div>

          {showAddOrder && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="Order ID *"
                value={newOrder.order_id}
                onChange={(e) => setNewOrder({ ...newOrder, order_id: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Customer Name *"
                value={newOrder.customer_name}
                onChange={(e) => setNewOrder({ ...newOrder, customer_name: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Customer Phone *"
                value={newOrder.customer_phone}
                onChange={(e) => setNewOrder({ ...newOrder, customer_phone: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Customer Email"
                value={newOrder.customer_email}
                onChange={(e) => setNewOrder({ ...newOrder, customer_email: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Product Name *"
                value={newOrder.product_name}
                onChange={(e) => setNewOrder({ ...newOrder, product_name: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) || 1 })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Total Amount"
                value={newOrder.total_amount}
                onChange={(e) => setNewOrder({ ...newOrder, total_amount: parseFloat(e.target.value) || 0 })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Notes"
                value={newOrder.notes}
                onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="md:col-span-2 flex gap-2">
                <button
                  onClick={handleAddOrder}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300"
                >
                  {loading ? 'Adding...' : 'Add Order'}
                </button>
                <button
                  onClick={() => setShowAddOrder(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Orders List */}
      {integrationStatus?.success && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Pending Orders ({pendingOrders.length})
            </h3>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading orders...</p>
            </div>
          ) : pendingOrders.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No pending orders found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingOrders.map((order) => (
                    <tr key={order.order_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.order_id}</div>
                        <div className="text-sm text-gray-500">{order.order_date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer_name}</div>
                        <div className="text-sm text-gray-500">{order.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.product_name}</div>
                        <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.total_amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(order.call_status)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">
                            {order.call_status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Attempts: {order.call_attempts}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateOrderStatus(order.order_id, 'success', 'Confirmed via dashboard')}
                            className="text-green-600 hover:text-green-900"
                            title="Mark as Confirmed"
                          >
                            <CheckCircleIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.order_id, 'failed', 'Declined via dashboard')}
                            className="text-red-600 hover:text-red-900"
                            title="Mark as Failed"
                          >
                            <XCircleIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Setup Modal */}
      {showSetup && (
        <GoogleSheetsSetup
          onSetupComplete={handleSetupComplete}
          onClose={() => setShowSetup(false)}
        />
      )}
    </div>
  );
};

export default GoogleSheetsManager;

