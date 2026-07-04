import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFragranceById } from '../../api/productsApi';
import type { Product } from '../../types/product';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CardSkeleton } from '../../components/Loader/Loader';
import styles from './Favorites.module.scss';

export function Favorites() {
  const { t } = useLanguage();
  const { favoriteIds } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);

    Promise.all(favoriteIds.map((id) => fetchFragranceById(id)))
      .then((results) => {
        if (!cancelled) setProducts(results);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [favoriteIds]);

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={`font-display ${styles.title}`}>{t('favorites.title')}</h1>

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>❀</span>
          <p>{t('favorites.empty')}</p>
          <Link to="/shop" className={styles.emptyCta}>
            {t('cart.emptyCta')}
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product, i) => (
            <ProductCard product={product} key={product.id} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
