import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';
import styles from './Header.module.scss';

export function Header() {
  const { t } = useLanguage();
  const { totalCount } = useCart();
  const { favoriteIds } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/shop', label: t('nav.shop') },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoMark}>S</span>
          <span className={`font-display ${styles.logoText}`}>Scento</span>
        </NavLink>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageToggle />
          <ThemeToggle />

          <NavLink to="/favorites" className={styles.iconLink} aria-label={t('nav.favorites')}>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 20.5s-7.5-4.6-10-9.3C.4 7.7 2 4 5.6 4c2 0 3.5 1.1 4.4 2.6C10.9 5.1 12.4 4 14.4 4 18 4 19.6 7.7 18 11.2c-2.5 4.7-10 9.3-10 9.3z" />
            </svg>
            {favoriteIds.length > 0 && <span className={styles.badge}>{favoriteIds.length}</span>}
          </NavLink>

          <NavLink to="/cart" className={styles.iconLink} aria-label={t('nav.cart')}>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 7h16l-1.4 10.4a2 2 0 0 1-2 1.6H7.4a2 2 0 0 1-2-1.6L4 7Z" />
              <path d="M8 7V5.5a4 4 0 0 1 8 0V7" />
            </svg>
            {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
          </NavLink>

          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
