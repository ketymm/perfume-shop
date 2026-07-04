import { useEffect, useMemo, useState } from 'react';
import { fetchFragrances, searchFragrances } from '../../api/productsApi';
import type { Product } from '../../types/product';
import { useLanguage } from '../../context/LanguageContext';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CardSkeleton } from '../../components/Loader/Loader';
import styles from './Shop.module.scss';

type SortKey = 'default' | 'priceAsc' | 'priceDesc' | 'rating';

export function Shop() {
  const { t } = useLanguage();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Session-scoped: filters reset once the browser tab closes
  const [query, setQuery] = useSessionStorage('shop-query', '');
  const [sort, setSort] = useSessionStorage<SortKey>('shop-sort', 'default');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    const request = query.trim() ? searchFragrances(query.trim()) : fetchFragrances(60, 0);

    request
      .then((res) => {
        if (!cancelled) setAllProducts(res.products);
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
  }, [query]);

  const sorted = useMemo(() => {
    const list = [...allProducts];
    switch (sort) {
      case 'priceAsc':
        return list.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [allProducts, sort]);

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1 className={`font-display ${styles.title}`}>{t('shop.title')}</h1>

        <div className={styles.controls}>
          <div className={styles.searchWrap}>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('shop.searchPlaceholder')}
              className={styles.searchInput}
              type="search"
            />
          </div>

          <select
            className={styles.sortSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label={t('shop.sortLabel')}
          >
            <option value="default">{t('shop.sortDefault')}</option>
            <option value="priceAsc">{t('shop.sortPriceAsc')}</option>
            <option value="priceDesc">{t('shop.sortPriceDesc')}</option>
            <option value="rating">{t('shop.sortRating')}</option>
          </select>
        </div>
      </div>

      {!loading && !error && (
        <p className={styles.resultsCount}>{t('shop.resultsCount', { count: sorted.length })}</p>
      )}

      {error ? (
        <p className={styles.errorText}>{t('common.error')}</p>
      ) : loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 12 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <p className={styles.errorText}>{t('shop.noResults')}</p>
      ) : (
        <div className={styles.grid}>
          {sorted.map((product, i) => (
            <ProductCard product={product} key={product.id} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
