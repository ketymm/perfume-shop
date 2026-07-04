import styles from './Loader.module.scss';

export function Loader({ label }: { label?: string }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.drop} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage} />
      <div className={styles.cardLine} style={{ width: '70%' }} />
      <div className={styles.cardLine} style={{ width: '40%' }} />
    </div>
  );
}
