import { useLanguage } from '../../context/LanguageContext';
import styles from './LanguageToggle.module.scss';

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button className={styles.toggle} onClick={toggleLocale} aria-label="Toggle language">
      <span className={locale === 'ka' ? styles.active : ''}>ქა</span>
      <span className={styles.divider}>/</span>
      <span className={locale === 'en' ? styles.active : ''}>EN</span>
    </button>
  );
}
