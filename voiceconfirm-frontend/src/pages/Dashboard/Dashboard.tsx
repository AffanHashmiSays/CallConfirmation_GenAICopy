import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBagIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { DashboardStats } from '../../types';
import apiService from '../../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiService.getDashboardStats();
        setStats(response.data);
      } catch (err: any) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="text-sm text-red-700">{error}</div>
      </div>
    );
  }

  const orderStats = stats?.orders;
  const callStats = stats?.calls;

  const statCards = [
    {
      name: 'Total Orders',
      value: orderStats?.total_orders || 0,
      icon: ShoppingBagIcon,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Confirmed Orders',
      value: orderStats?.confirmed_orders || 0,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      change: `${orderStats?.confirmation_rate || 0}%`,
      changeType: 'neutral',
    },
    {
      name: 'Total Calls',
      value: callStats?.total_calls || 0,
      icon: PhoneIcon,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'increase',
    },
    {
      name: 'Success Rate',
      value: `${callStats?.success_rate || 0}%`,
      icon: ArrowTrendingUpIcon,
      color: 'bg-indigo-500',
      change: '+2.5%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Dashboard Overview
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Monitor your voice confirmation performance and order status
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/orders"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                <ShoppingBagIcon className="h-4 w-4 mr-2" />
                View Orders
              </Link>
              <Link
                to="/calls"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <PhoneIcon className="h-4 w-4 mr-2" />
                View Calls
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'increase'
                            ? 'text-green-600'
                            : stat.changeType === 'decrease'
                            ? 'text-red-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Orders
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Latest orders requiring confirmation
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {stats?.recent_orders && stats.recent_orders.length > 0 ? (
              <div className="space-y-4">
                {stats.recent_orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            order.confirmation_status === 'confirmed'
                              ? 'bg-green-400'
                              : order.confirmation_status === 'failed'
                              ? 'bg-red-400'
                              : 'bg-yellow-400'
                          }`}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {order.order_id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customer.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${order.order_details.total}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {order.confirmation_status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first order.
                </p>
                <div className="mt-6">
                  <Link
                    to="/orders"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <ShoppingBagIcon className="h-4 w-4 mr-2" />
                    Add Order
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Calls */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Calls
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Latest voice confirmation attempts
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {stats?.recent_calls && stats.recent_calls.length > 0 ? (
              <div className="space-y-4">
                {stats.recent_calls.slice(0, 5).map((call) => (
                  <div key={call.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {call.status === 'completed' ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-400" />
                        ) : call.status === 'failed' ? (
                          <XCircleIcon className="h-5 w-5 text-red-400" />
                        ) : (
                          <ClockIcon className="h-5 w-5 text-yellow-400" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Call #{call.call_id.slice(-8)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {call.language.toUpperCase()} • {call.duration || 0}s
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {call.outcome || call.status}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(call.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <PhoneIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No calls</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start making voice confirmations for your orders.
                </p>
                <div className="mt-6">
                  <Link
                    to="/calls"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    View Calls
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

