import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const { register } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password, role);
      showNotification('Registered successfully. Please login.', 'success');
      navigate('/login');
    } catch (error) {
      showNotification(error.response?.data?.message || 'Registration error', 'error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 w-full mb-4 rounded">
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded mb-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;