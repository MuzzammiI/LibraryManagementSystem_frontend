import { useState, useContext, useEffect } from 'react'; // Added useEffect for potential future state sync
import { AuthContext } from '../contexts/AuthContext';
import { NotificationContext } from '../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  // Safeguard for context functions
  useEffect(() => {
    if (!login || typeof login !== 'function') {
      console.error('Login function not available in AuthContext');
    }
    if (!showNotification || typeof showNotification !== 'function') {
      console.error('showNotification function not available in NotificationContext');
    }
  }, [login, showNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password);
      showNotification('Logged in successfully', 'success');
      // Delay navigation slightly to ensure context update (optional, remove if not needed)
      setTimeout(() => {
        navigate('/');
        setIsLoading(false); // Reset after navigation
      }, 100);
    } catch (error) {
      console.error('Login error:', error); // Debug log
      showNotification(error.response?.data?.message || 'Login error', 'error');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 w-full rounded mb-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              Logging in...
              <span className="ml-2 animate-pulse">●</span> {/* Simple spinner */}
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;