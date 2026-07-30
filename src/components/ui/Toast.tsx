import { useEffect, type FC } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import type { ToastMessage } from '../../types';

interface ToastProps extends ToastMessage {
  onDismiss: (id: string) => void;
}

const ICONS = {
  success: <CheckCircle size={16} aria-hidden="true" />,
  error: <XCircle size={16} aria-hidden="true" />,
  info: <Info size={16} aria-hidden="true" />,
};

export const Toast: FC<ToastProps> = ({ id, message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 3500);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div className={`toast toast--${type}`} role="status" aria-live="polite">
      <span className="toast-icon">{ICONS[type]}</span>
      <span className="toast-message">{message}</span>
      <button
        className="toast-close"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        type="button"
      >
        <X size={14} />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};
