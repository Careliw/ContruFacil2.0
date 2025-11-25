import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error';

interface ToastProps {
  message: string;
  type?: ToastType;
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'warning': return <AlertTriangle className="text-orange-500" size={24} />;
      case 'error': return <XCircle className="text-red-500" size={24} />;
      default: return <CheckCircle className="text-green-500" size={24} />;
    }
  };

  const getTitle = () => {
    switch (type) {
        case 'warning': return 'Atenção';
        case 'error': return 'Erro';
        default: return 'Sucesso';
    }
  };

  const getBorderColor = () => {
     switch (type) {
        case 'warning': return 'border-orange-500';
        case 'error': return 'border-red-500';
        default: return 'border-green-500';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-white border-l-4 ${getBorderColor()} shadow-lg rounded-md p-4 flex items-center gap-3 animate-fade-in-up z-50`}>
      {getIcon()}
      <div>
        <h4 className="font-bold text-gray-800 text-sm">{getTitle()}</h4>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Toast;