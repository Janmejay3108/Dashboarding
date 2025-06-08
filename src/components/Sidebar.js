import React from 'react';
import { 
  LayoutDashboard, 
  Table, 
  BarChart3, 
  Calendar, 
  Kanban, 
  Settings,
  User
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tables', label: 'Tables', icon: Table },
    { id: 'charts', label: 'Charts', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'kanban', label: 'Kanban', icon: Kanban },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Dashboard</h2>
      </div>
      
      <div className="user-info">
        <div className="user-avatar">
          <User size={24} />
        </div>
        <div className="user-details">
          <h3>Janmejay Tiwari</h3>
          <p>Administrator</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
