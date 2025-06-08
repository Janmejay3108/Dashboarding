import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import './Charts.css';

const Charts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Sample data with Indian context
  const salesData = [
    { month: 'Jan', revenue: 450000, orders: 120, customers: 89 },
    { month: 'Feb', revenue: 520000, orders: 140, customers: 102 },
    { month: 'Mar', revenue: 480000, orders: 130, customers: 95 },
    { month: 'Apr', revenue: 610000, orders: 165, customers: 118 },
    { month: 'May', revenue: 550000, orders: 150, customers: 108 },
    { month: 'Jun', revenue: 670000, orders: 180, customers: 135 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, amount: 2100000, color: '#3b82f6' },
    { name: 'Clothing', value: 25, amount: 1500000, color: '#10b981' },
    { name: 'Books', value: 20, amount: 1200000, color: '#f59e0b' },
    { name: 'Home & Garden', value: 20, amount: 1200000, color: '#8b5cf6' },
  ];

  const regionData = [
    { region: 'Mumbai', sales: 850000, growth: 12.5 },
    { region: 'Delhi', sales: 720000, growth: 8.3 },
    { region: 'Bangalore', sales: 680000, growth: 15.2 },
    { region: 'Chennai', sales: 590000, growth: 6.8 },
    { region: 'Hyderabad', sales: 520000, growth: 11.4 },
    { region: 'Pune', sales: 480000, growth: 9.7 },
  ];

  const performanceData = [
    { metric: 'Website Traffic', current: 45000, previous: 38000, change: 18.4 },
    { metric: 'Conversion Rate', current: 3.2, previous: 2.8, change: 14.3 },
    { metric: 'Average Order Value', current: 2850, previous: 2650, change: 7.5 },
    { metric: 'Customer Retention', current: 68, previous: 62, change: 9.7 },
  ];

  const formatCurrency = (value) => `₹${value.toLocaleString()}`;
  const formatPercentage = (value) => `${value}%`;

  return (
    <div className="charts-page">
      <div className="page-header">
        <h1>Analytics & Charts</h1>
        <p>Comprehensive data visualization and business insights.</p>
      </div>

      {/* Period Selector */}
      <div className="period-selector">
        <button 
          className={`btn ${selectedPeriod === '3months' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedPeriod('3months')}
        >
          3 Months
        </button>
        <button 
          className={`btn ${selectedPeriod === '6months' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedPeriod('6months')}
        >
          6 Months
        </button>
        <button 
          className={`btn ${selectedPeriod === '1year' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedPeriod('1year')}
        >
          1 Year
        </button>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-2">
        {/* Revenue Trend */}
        <div className="card chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <TrendingUp size={20} />
              <h3>Revenue Trend</h3>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" tickFormatter={formatCurrency} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1} 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <PieChartIcon size={20} />
              <h3>Sales by Category</h3>
            </div>
          </div>
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
                <Tooltip 
                  formatter={(value, name) => [formatCurrency(categoryData.find(c => c.name === name)?.amount || 0), 'Amount']}
                  contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="card chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <BarChart3 size={20} />
              <h3>Regional Sales</h3>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="region" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" tickFormatter={formatCurrency} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Sales']}
                  contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-metric Line Chart */}
        <div className="card chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <Activity size={20} />
              <h3>Orders & Customers</h3>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Orders"
                />
                <Line 
                  type="monotone" 
                  dataKey="customers" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="New Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card">
        <h3>Key Performance Indicators</h3>
        <div className="metrics-grid">
          {performanceData.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <h4>{metric.metric}</h4>
                <span className={`metric-change ${metric.change > 0 ? 'positive' : 'negative'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <div className="metric-values">
                <div className="current-value">
                  {metric.metric.includes('Rate') || metric.metric.includes('Retention') 
                    ? formatPercentage(metric.current)
                    : metric.metric.includes('Value')
                    ? formatCurrency(metric.current)
                    : metric.current.toLocaleString()
                  }
                </div>
                <div className="previous-value">
                  Previous: {metric.metric.includes('Rate') || metric.metric.includes('Retention') 
                    ? formatPercentage(metric.previous)
                    : metric.metric.includes('Value')
                    ? formatCurrency(metric.previous)
                    : metric.previous.toLocaleString()
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charts;
