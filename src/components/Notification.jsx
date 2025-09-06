import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import { IoClose } from 'react-icons/io5';

const Notification = () => {
  const { notification, hideNotification } = useContext(NotificationContext);
  if (!notification.message) return null;

  const bgColor = notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className={`fixed top-4 right-4 w-1/3 p-4 text-white rounded shadow-md ${bgColor} z-50 flex justify-between items-center`}>
      <span>{notification.message}</span>
      <button onClick={hideNotification} className="ml-2">
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default Notification;