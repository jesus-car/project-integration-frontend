import { createContext, useContext, useState } from 'react';
import { FaCheck, FaInfo, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (message, duration) => addToast(message, 'success', duration);
  const error = (message, duration) => addToast(message, 'error', duration);
  const info = (message, duration) => addToast(message, 'info', duration);
  const warning = (message, duration) => addToast(message, 'warning', duration);

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <FaCheck className="w-5 h-5" />,
    error: <FaTimes className="w-5 h-5" />,
    info: <FaInfo className="w-5 h-5" />,
    warning: <FaExclamationTriangle className="w-5 h-5" />
  };

  const styles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700'
  };

  return (
    <div
      className={`${styles[type]} border-l-4 p-4 rounded shadow-lg min-w-[300px] max-w-[500px] flex items-center justify-between animate-slide-in`}
      role="alert"
    >
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0`}>
          {icons[type]}
        </div>
        <div className="flex-1">
          {message}
        </div>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
}; 