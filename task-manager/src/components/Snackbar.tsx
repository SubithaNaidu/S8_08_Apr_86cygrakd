import React, { useEffect, useState } from 'react';

interface SnackbarProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#323232',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        zIndex: 1000,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '300px',
      }}
    >
      <span style={{ flexGrow: 1 }}>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          onClose();
        }}
        aria-label="Close snackbar"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '18px',
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Snackbar;
