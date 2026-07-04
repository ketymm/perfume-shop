import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import styles from './NotFound.module.scss';

export function NotFound() {
  const { t } = useLanguage();

  return (
    <div className={`container ${styles.page}`}>
      <span className={styles.mark}>404</span>
      <h1 className="font-display">{t('notFound.title')}</h1>
      <p>{t('notFound.subtitle')}</p>
      <Link to="/" className={styles.cta}>
        {t('notFound.cta')}
      </Link>
    </div>
  );
}
