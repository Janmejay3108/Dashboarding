import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data with Indian context
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '₹12,45,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '8,432',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '-2.1%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'orange'
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '+5.4%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const salesData = [
    { month: 'Jan', sales: 45000, orders: 120 },
    { month: 'Feb', sales: 52000, orders: 140 },
    { month: 'Mar', sales: 48000, orders: 130 },
    { month: 'Apr', sales: 61000, orders: 165 },
    { month: 'May', sales: 55000, orders: 150 },
    { month: 'Jun', sales: 67000, orders: 180 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Clothing', value: 25, color: '#10b981' },
    { name: 'Books', value: 20, color: '#f59e0b' },
    { name: 'Home & Garden', value: 20, color: '#8b5cf6' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Rajesh Kumar', amount: '₹2,450', status: 'Completed', date: '2025-06-08' },
    { id: '#ORD-002', customer: 'Priya Sharma', amount: '₹1,890', status: 'Processing', date: '2025-06-08' },
    { id: '#ORD-003', customer: 'Amit Patel', amount: '₹3,200', status: 'Shipped', date: '2025-06-07' },
    { id: '#ORD-004', customer: 'Sneha Gupta', amount: '₹1,650', status: 'Completed', date: '2025-06-07' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Janmejay! Here's what's happening with your business today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="card kpi-card">
              <div className="kpi-header">
                <div className={`kpi-icon ${kpi.color}`}>
                  <Icon size={24} />
                </div>
                <div className={`kpi-change ${kpi.trend}`}>
                  {kpi.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {kpi.change}
                </div>
              </div>
              <div className="kpi-content">
                <h3>{kpi.value}</h3>
                <p>{kpi.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-2">
        <div className="card">
          <h3>Sales Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']} />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3>Category Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <h3>Recent Orders</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
