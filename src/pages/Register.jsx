import { useState, useContext, useEffect } from 'react'; // Added useEffect for context safeguard
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  // Safeguard for context functions
  useEffect(() => {
    if (!register || typeof register !== 'function') {
      console.error('Register function not available in AuthContext');
    }
    if (!showNotification || typeof showNotification !== 'function') {
      console.error('showNotification function not available in NotificationContext');
    }
  }, [register, showNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || password.length < 6) {
      showNotification(
        'Username and password are required, password must be at least 6 characters',
        'error'
      );
      return;
    }

    setIsLoading(true);
    try {
      await register(username, password, role);
      showNotification('Registered successfully. Please login.', 'success');
      // Delay navigation to ensure notification is visible
      setTimeout(() => {
        navigate('/login');
        setIsLoading(false); // Reset after navigation
      }, 1500); // 1.5 seconds delay
    } catch (error) {
      console.error('Registration error:', error); // Debug log
      showNotification(error.response?.data?.message || 'Registration error', 'error');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
          aria-label="Username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
          aria-label="Password"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          aria-label="Role"
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 w-full rounded mb-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              Registering...
              <span className="ml-2 animate-pulse">●</span> {/* Simple spinner */}
            </>
          ) : (
            'Register'
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;