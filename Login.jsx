import React, { useState, useContext } from 'react';
import { useRole } from './RoleContext';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('User'); // default role
  const { setRole } = useRole();

  const handleLogin = () => {
    setRole(selectedRole);

    alert(`Welcome, ${selectedRole} ${username || 'Guest'}!`);

    onLoginSuccess();
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(101, 154, 216, 0.45)',
      backgroundColor: '#f9f9f9'
    }}>
      <img
        src="https://via.placeholder.com/150x50?text=Logo"
        alt="Logo"
        style={{ marginBottom: '20px' }}
      />
      <h2>Task Management App</h2>
      <h3>Login Page</h3>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      {/* 🔥 Role selection dropdown */}
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#1877F2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
