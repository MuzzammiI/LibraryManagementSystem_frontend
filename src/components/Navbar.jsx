import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Library Management</Link>
      <div className="flex items-center">
        {user ? (
          <>
            <span className="mr-4">{user.role}: {user.username}</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Login</Link>
            <Link to="/register" className="bg-green-500 text-white px-3 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;