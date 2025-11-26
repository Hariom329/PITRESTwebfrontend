import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    show: boolean;
    onClose: () => void;
    type?: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose, type = 'info' }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    const bgClass = type === 'success' ? 'bg-dark text-white' : type === 'error' ? 'bg-danger text-white' : 'bg-dark text-white';

    return (
        <div className={`position-fixed bottom-0 start-50 translate-middle-x mb-4 p-3 rounded-pill shadow-lg ${bgClass}`} style={{ zIndex: 2000, minWidth: '300px', textAlign: 'center' }}>
            <span className="fw-bold">{message}</span>
        </div>
    );
};

export default Toast;
