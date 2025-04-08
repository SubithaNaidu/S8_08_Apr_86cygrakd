import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') onConfirm();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onConfirm]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttons}>
          <button onClick={onConfirm} style={{ ...styles.button, ...styles.confirm }}>
            {confirmText}
          </button>
          <button onClick={onClose} style={{ ...styles.button, ...styles.cancel }}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    animation: 'fadeIn 0.3s ease-in-out',
    zIndex: 999,
  },
  modal: {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  message: {
    marginBottom: '20px',
    color: '#555',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
  },
  confirm: {
    backgroundColor: '#d32f2f',
    color: '#fff',
  },
  cancel: {
    backgroundColor: '#ddd',
    color: '#333',
  },
};

export default ConfirmationModal;
