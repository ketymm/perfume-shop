import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.scss';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className={styles.track}>
        <span className={`${styles.thumb} ${isDark ? styles.thumbDark : ''}`}>
          {isDark ? '☾' : '☼'}
        </span>
      </span>
    </button>
  );
}
