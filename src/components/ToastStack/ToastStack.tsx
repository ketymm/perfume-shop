import { useToast } from '../../context/ToastContext';
import styles from './ToastStack.module.scss';

export function ToastStack() {
  const { toasts } = useToast();

  return (
    <div className={styles.stack} aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={styles.toast}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
