import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { login as apiLogin, register as apiRegister } from '../services/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Simplified decoding
      setUser(decoded);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const { data } = await apiLogin({ username, password });
    localStorage.setItem('token', data.token);
    const decoded = JSON.parse(atob(data.token.split('.')[1]));
    setUser(decoded);
  };

  const register = async (username, password, role) => {
    await apiRegister({ username, password, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};