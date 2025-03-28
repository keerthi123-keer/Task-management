import React, { useState } from 'react';
import { RoleProvider } from './RoleContext';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <RoleProvider>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '350px',
          textAlign: 'center'
        }}>
          {/* Logo */}
          <img
            src="https://via.placeholder.com/80"
            alt="Logo"
            style={{ marginBottom: '20px', borderRadius: '50%' }}
          />
          <h1 style={{ marginBottom: '20px', color: '#333' }}>Task Management App</h1>

          {isLoggedIn ? (
            <Dashboard />
          ) : (
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          )}
        </div>
      </div>
    </RoleProvider>
  );
}

export default App;
