import React, { useState } from 'react';
import { Search, Filter, Download, Plus, Edit, Trash2, Eye } from 'lucide-react';
import './Tables.css';

const Tables = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample customer data with Indian names
  const [customers] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+91 98765 43210', city: 'Mumbai', orders: 15, totalSpent: 45000, status: 'Active' },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 87654 32109', city: 'Delhi', orders: 8, totalSpent: 28000, status: 'Active' },
    { id: 3, name: 'Amit Patel', email: 'amit.patel@email.com', phone: '+91 76543 21098', city: 'Ahmedabad', orders: 22, totalSpent: 67000, status: 'Active' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha.gupta@email.com', phone: '+91 65432 10987', city: 'Bangalore', orders: 5, totalSpent: 15000, status: 'Inactive' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 54321 09876', city: 'Jaipur', orders: 12, totalSpent: 38000, status: 'Active' },
    { id: 6, name: 'Kavya Reddy', email: 'kavya.reddy@email.com', phone: '+91 43210 98765', city: 'Hyderabad', orders: 18, totalSpent: 52000, status: 'Active' },
    { id: 7, name: 'Arjun Nair', email: 'arjun.nair@email.com', phone: '+91 32109 87654', city: 'Kochi', orders: 7, totalSpent: 21000, status: 'Active' },
    { id: 8, name: 'Meera Joshi', email: 'meera.joshi@email.com', phone: '+91 21098 76543', city: 'Pune', orders: 14, totalSpent: 42000, status: 'Active' },
    { id: 9, name: 'Rohit Agarwal', email: 'rohit.agarwal@email.com', phone: '+91 10987 65432', city: 'Kolkata', orders: 9, totalSpent: 27000, status: 'Inactive' },
    { id: 10, name: 'Ananya Das', email: 'ananya.das@email.com', phone: '+91 09876 54321', city: 'Chennai', orders: 16, totalSpent: 48000, status: 'Active' },
    { id: 11, name: 'Karan Malhotra', email: 'karan.malhotra@email.com', phone: '+91 98765 43211', city: 'Chandigarh', orders: 11, totalSpent: 33000, status: 'Active' },
    { id: 12, name: 'Riya Kapoor', email: 'riya.kapoor@email.com', phone: '+91 87654 32110', city: 'Lucknow', orders: 6, totalSpent: 18000, status: 'Active' },
  ]);

  // Filter and sort data
  const filteredData = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="tables-page">
      <div className="page-header">
        <h1>Customer Management</h1>
        <p>Manage your customer database with advanced filtering and sorting options.</p>
      </div>

      {/* Table Controls */}
      <div className="table-controls">
        <div className="controls-left">
          <div className="search-container">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={16} />
            Filter
          </button>
        </div>
        
        <div className="controls-right">
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="sortable">
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('email')} className="sortable">
                  Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('city')} className="sortable">
                  City {sortField === 'city' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('orders')} className="sortable">
                  Orders {sortField === 'orders' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('totalSpent')} className="sortable">
                  Total Spent {sortField === 'totalSpent' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-info">
                      <strong>{customer.name}</strong>
                      <small>{customer.phone}</small>
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.city}</td>
                  <td>{customer.orders}</td>
                  <td>₹{customer.totalSpent.toLocaleString()}</td>
                  <td>
                    <span className={`status ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view">
                        <Eye size={14} />
                      </button>
                      <button className="action-btn edit">
                        <Edit size={14} />
                      </button>
                      <button className="action-btn delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="pagination-controls">
            <button 
              className="btn btn-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              className="btn btn-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
