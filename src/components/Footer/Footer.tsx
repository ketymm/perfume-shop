import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Footer.module.scss';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={`font-display ${styles.logo}`}>Scento</span>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
        </div>

        <div className={styles.col}>
          <span className="overline">{t('footer.linksTitle')}</span>
          <NavLink to="/">{t('nav.home')}</NavLink>
          <NavLink to="/shop">{t('nav.shop')}</NavLink>
          <NavLink to="/favorites">{t('nav.favorites')}</NavLink>
          <NavLink to="/cart">{t('nav.cart')}</NavLink>
        </div>

        <div className={styles.col}>
          <span className="overline">{t('footer.contactTitle')}</span>
          <a href="mailto:hello@scento.ge">hello@scento.ge</a>
          <a href="tel:+995322000000">+995 322 00 00 00</a>
          <span className={styles.muted}>Tbilisi, Georgia</span>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {year} Scento. {t('footer.rights')}
        </span>
      </div>
    </footer>
  );
}
