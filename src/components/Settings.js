import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { useTheme } from '../App';
import './Settings.css';

const Settings = () => {
  const { theme, colorScheme, toggleTheme, changeColorScheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Janmejay Tiwari',
    email: 'janmejay.tiwari@company.com',
    phone: '+91 98765 43210',
    designation: 'Senior Administrator',
    department: 'IT Operations',
    location: 'Mumbai, Maharashtra',
    bio: 'Experienced administrator with 8+ years in system management and team leadership.'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
    systemUpdates: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAlerts: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'system', label: 'System', icon: Database },
  ];

  const colorSchemes = [
    { id: 'blue', name: 'Blue', color: '#3b82f6' },
    { id: 'green', name: 'Green', color: '#10b981' },
    { id: 'purple', name: 'Purple', color: '#8b5cf6' },
    { id: 'orange', name: 'Orange', color: '#f59e0b' },
  ];

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    setSaveSuccess(false);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would normally make API calls to save the data
      console.log('Saving profile data:', profileData);
      console.log('Saving notification settings:', notificationSettings);
      console.log('Saving security settings:', securitySettings);

      setSaveSuccess(true);
      setHasChanges(false);

      // Reset success state after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error saving settings:', error);
      // Handle error state here
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values (you might want to store original values in state)
    setHasChanges(false);
    setSaveSuccess(false);
    // Optionally reload original data
  };

  const renderProfileTab = () => (
    <div className="settings-section">
      <h3>Profile Information</h3>
      <div className="profile-form">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            <User size={48} />
          </div>
          <button className="btn btn-secondary">Change Photo</button>
        </div>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="input"
              value={profileData.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="input"
              value={profileData.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="input"
              value={profileData.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              className="input"
              value={profileData.designation}
              onChange={(e) => handleProfileChange('designation', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Department</label>
            <select
              className="input"
              value={profileData.department}
              onChange={(e) => handleProfileChange('department', e.target.value)}
            >
              <option value="IT Operations">IT Operations</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="input"
              value={profileData.location}
              onChange={(e) => handleProfileChange('location', e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Bio</label>
          <textarea
            className="input"
            rows="4"
            value={profileData.bio}
            onChange={(e) => handleProfileChange('bio', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-section">
      <h3>Notification Preferences</h3>
      <div className="notification-settings">
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div key={key} className="setting-item">
            <div className="setting-info">
              <h4>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
              <p>
                {key === 'emailNotifications' && 'Receive notifications via email'}
                {key === 'pushNotifications' && 'Receive push notifications in browser'}
                {key === 'smsNotifications' && 'Receive SMS notifications on your phone'}
                {key === 'weeklyReports' && 'Get weekly summary reports'}
                {key === 'securityAlerts' && 'Receive security-related alerts'}
                {key === 'systemUpdates' && 'Get notified about system updates'}
              </p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleNotificationChange(key)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="settings-section">
      <h3>Security Settings</h3>
      <div className="security-settings">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Two-Factor Authentication</h4>
            <p>Add an extra layer of security to your account</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={securitySettings.twoFactorAuth}
              onChange={() => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h4>Session Timeout</h4>
            <p>Automatically log out after inactivity (minutes)</p>
          </div>
          <select
            className="input"
            value={securitySettings.sessionTimeout}
            onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h4>Password Expiry</h4>
            <p>Force password change after specified days</p>
          </div>
          <select
            className="input"
            value={securitySettings.passwordExpiry}
            onChange={(e) => handleSecurityChange('passwordExpiry', e.target.value)}
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="never">Never</option>
          </select>
        </div>
        
        <div className="password-section">
          <h4>Change Password</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter new password"
              />
            </div>
            
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                className="input"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <button className="btn btn-primary">Update Password</button>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="settings-section">
      <h3>Appearance Settings</h3>
      <div className="appearance-settings">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Theme</h4>
            <p>Choose between light and dark mode</p>
          </div>
          <div className="theme-options">
            <button
              className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => theme === 'dark' && toggleTheme()}
            >
              Light
            </button>
            <button
              className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => theme === 'light' && toggleTheme()}
            >
              Dark
            </button>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <h4>Color Scheme</h4>
            <p>Select your preferred color scheme</p>
          </div>
          <div className="color-schemes">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                className={`color-scheme-btn ${colorScheme === scheme.id ? 'active' : ''}`}
                onClick={() => changeColorScheme(scheme.id)}
                style={{ backgroundColor: scheme.color }}
              >
                {scheme.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="settings-section">
      <h3>System Settings</h3>
      <div className="system-settings">
        <div className="system-info">
          <div className="info-item">
            <h4>Application Version</h4>
            <p>v2.1.0</p>
          </div>
          <div className="info-item">
            <h4>Last Updated</h4>
            <p>June 8, 2025</p>
          </div>
          <div className="info-item">
            <h4>Database Status</h4>
            <p className="status-healthy">Healthy</p>
          </div>
          <div className="info-item">
            <h4>Server Uptime</h4>
            <p>15 days, 8 hours</p>
          </div>
        </div>
        
        <div className="system-actions">
          <button className="btn btn-secondary">
            <Database size={16} />
            Backup Data
          </button>
          <button className="btn btn-secondary">
            <Globe size={16} />
            Check Updates
          </button>
          <button className="btn btn-secondary">
            Clear Cache
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      case 'appearance':
        return renderAppearanceTab();
      case 'system':
        return renderSystemTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences.</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="settings-content">
          <div className="card">
            {renderTabContent()}
            
            <div className="settings-actions">
              <button
                className={`btn btn-primary ${isSaving ? 'loading' : ''} ${saveSuccess ? 'success' : ''}`}
                onClick={handleSaveChanges}
                disabled={isSaving || (!hasChanges && !saveSuccess)}
              >
                {isSaving ? (
                  'Saving...'
                ) : saveSuccess ? (
                  'Saved!'
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
