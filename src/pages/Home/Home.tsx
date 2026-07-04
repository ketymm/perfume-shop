import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFragrances } from '../../api/productsApi';
import type { Product } from '../../types/product';
import { useLanguage } from '../../context/LanguageContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CardSkeleton } from '../../components/Loader/Loader';
import styles from './Home.module.scss';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1616604847462-ad9c15c4e8a4?fm=jpg&q=80&w=1800&auto=format&fit=crop';

const whyIcons = ['◆', '✦', '❀'];

export function Home() {
  const { t } = useLanguage();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchFragrances(8, 0)
      .then((res) => {
        if (!cancelled) setFeatured(res.products);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <section className={styles.hero}>
        <img src={HERO_IMAGE} alt="" className={styles.heroImage} aria-hidden="true" />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={`overline ${styles.heroEyebrow}`}>{t('hero.eyebrow')}</span>
          <h1 className={`font-display ${styles.heroTitle}`}>
            {t('hero.title')
              .split('\n')
              .map((line) => (
                <span key={line} className={styles.heroLine}>
                  {line}
                </span>
              ))}
          </h1>
          <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
          <div className={styles.heroActions}>
            <Link to="/shop" className={styles.primaryCta}>
              {t('hero.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className="container">
          <div className={styles.featuredHead}>
            <div>
              <span className="overline">{t('home.featuredTitle')}</span>
              <p className={styles.featuredSubtitle}>{t('home.featuredSubtitle')}</p>
            </div>
            <Link to="/shop" className={styles.viewAll}>
              {t('home.viewAll')} →
            </Link>
          </div>

          {error ? (
            <p className={styles.errorText}>{t('common.error')}</p>
          ) : (
            <div className={styles.grid}>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
                : featured.map((product, i) => (
                    <ProductCard product={product} key={product.id} index={i} />
                  ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.why}>
        <div className="container">
          <span className="overline">{t('home.whyTitle')}</span>
          <div className={styles.whyGrid}>
            {[1, 2, 3].map((n, i) => (
              <div className={styles.whyCard} key={n}>
                <span className={styles.whyIcon}>{whyIcons[i]}</span>
                <h3 className="font-display">{t(`home.why${n}Title`)}</h3>
                <p>{t(`home.why${n}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
