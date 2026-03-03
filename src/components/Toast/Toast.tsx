import React, { useEffect } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export function Toast({ message, onDismiss }: ToastProps): React.ReactNode {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={styles.toast}>
      <span className={styles.message}>{message}</span>
      <button className={styles.closeButton} onClick={onDismiss}>
        &times;
      </button>
    </div>
  );
}
