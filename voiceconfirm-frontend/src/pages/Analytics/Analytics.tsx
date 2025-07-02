import React, { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  PhoneIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { OrderStats, CallStats } from '../../types';
import apiService from '../../services/api';

const Analytics: React.FC = () => {
  const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
  const [callStats, setCallStats] = useState<CallStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [ordersResponse, callsResponse] = await Promise.all([
        apiService.getOrderStats(),
        apiService.getCallStats()
      ]);
      setOrderStats(ordersResponse.data);
      setCallStats(callsResponse.data);
    } catch (err: any) {
      setError('Failed to load analytics data');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  // Prepare chart data
  const orderStatusData = [
    { name: 'Pending', value: orderStats?.pending_orders || 0, color: '#fbbf24' },
    { name: 'Confirmed', value: orderStats?.confirmed_orders || 0, color: '#10b981' },
    { name: 'Failed', value: orderStats?.failed_orders || 0, color: '#ef4444' },
    { name: 'Cancelled', value: orderStats?.cancelled_orders || 0, color: '#6b7280' },
  ];

  const callOutcomeData = Object.entries(callStats?.calls_by_outcome || {}).map(([key, value]) => ({
    name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value,
    color: key === 'confirmed' ? '#10b981' : key === 'rejected' ? '#ef4444' : '#6b7280'
  }));

  const languageData = Object.entries(callStats?.calls_by_language || {}).map(([key, value]) => ({
    name: key.toUpperCase(),
    calls: value
  }));

  // Mock time series data for demonstration
  const timeSeriesData = [
    { date: '2024-01-01', orders: 12, calls: 15, confirmations: 10 },
    { date: '2024-01-02', orders: 19, calls: 22, confirmations: 18 },
    { date: '2024-01-03', orders: 8, calls: 12, confirmations: 9 },
    { date: '2024-01-04', orders: 15, calls: 18, confirmations: 14 },
    { date: '2024-01-05', orders: 22, calls: 25, confirmations: 20 },
    { date: '2024-01-06', orders: 18, calls: 21, confirmations: 17 },
    { date: '2024-01-07', orders: 25, calls: 28, confirmations: 23 },
  ];

  const kpiCards = [
    {
      name: 'Confirmation Rate',
      value: `${orderStats?.confirmation_rate || 0}%`,
      change: '+2.5%',
      changeType: 'increase',
      icon: CheckCircleIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Avg Call Duration',
      value: `${callStats?.average_duration || 0}s`,
      change: '-5s',
      changeType: 'decrease',
      icon: ClockIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Success Rate',
      value: `${callStats?.success_rate || 0}%`,
      change: '+1.2%',
      changeType: 'increase',
      icon: ArrowTrendingUpIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Avg Call Attempts',
      value: orderStats?.average_call_attempts || 0,
      change: '-0.3',
      changeType: 'decrease',
      icon: PhoneIcon,
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track performance and insights for your voice confirmations
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <div key={kpi.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${kpi.color} rounded-md flex items-center justify-center`}>
                    <kpi.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {kpi.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {kpi.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        kpi.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.changeType === 'increase' ? (
                          <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                        )}
                        {kpi.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Order Status Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {orderStatusData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call Outcomes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Call Outcomes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={callOutcomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Calls by Language</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={languageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trends Over Time */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Trends Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="calls" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="confirmations" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
              <span className="text-sm text-gray-600">Orders</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
              <span className="text-sm text-gray-600">Calls</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              <span className="text-sm text-gray-600">Confirmations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Summary Statistics</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{orderStats?.total_orders || 0}</div>
              <div className="text-sm text-gray-500">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{callStats?.total_calls || 0}</div>
              <div className="text-sm text-gray-500">Total Calls</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{Math.round(callStats?.total_duration || 0 / 60)}m</div>
              <div className="text-sm text-gray-500">Total Call Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{callStats?.successful_calls || 0}</div>
              <div className="text-sm text-gray-500">Successful Calls</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

