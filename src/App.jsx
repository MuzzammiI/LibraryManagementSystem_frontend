import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { NotificationProvider } from './contexts/NotificationProvider';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => (
  <AuthProvider>
    <NotificationProvider>
      <Router>
        <Navbar />
        <Notification />
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h2 className="text-center mt-10">404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  </AuthProvider>
);

export default App;