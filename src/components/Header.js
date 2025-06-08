import React from 'react';
import { Sun, Moon, Bell, Search } from 'lucide-react';
import { useTheme } from '../App';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="header-btn" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        
        <button className="header-btn notification-btn">
          <Bell size={18} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="header-user">
          <span>Janmejay Tiwari</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
