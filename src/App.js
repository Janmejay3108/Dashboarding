import React, { useState, createContext, useContext } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Tables from './components/Tables';
import Charts from './components/Charts';
import Calendar from './components/Calendar';
import Kanban from './components/Kanban';
import Settings from './components/Settings';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [colorScheme, setColorScheme] = useState('blue');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeColorScheme = (scheme) => {
    setColorScheme(scheme);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'tables':
        return <Tables />;
      case 'charts':
        return <Charts />;
      case 'calendar':
        return <Calendar />;
      case 'kanban':
        return <Kanban />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, toggleTheme, changeColorScheme }}>
      <div className={`app ${theme} ${colorScheme}`}>
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="main-content">
          <Header />
          <div className="page-content">
            {renderPage()}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
