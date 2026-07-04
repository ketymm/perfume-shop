import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const [justAdded, setJustAdded] = useState(false);

  const favorite = isFavorite(product.id);
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    addItem(product.id, 1);
    setJustAdded(true);
    showToast(`${product.title} — ${t('product.addedToCart')}`);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  const handleToggleFavorite = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFavorite(product.id);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={styles.card}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className={styles.imageWrap}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" className={styles.image} />
        {product.discountPercentage > 0 && (
          <span className={styles.discountBadge}>-{Math.round(product.discountPercentage)}%</span>
        )}
        <button
          className={`${styles.favoriteBtn} ${favorite ? styles.favoriteActive : ''}`}
          onClick={handleToggleFavorite}
          aria-label={favorite ? t('product.removeFromFavorites') : t('product.addToFavorites')}
          aria-pressed={favorite}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill={favorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 20.5s-7.5-4.6-10-9.3C.4 7.7 2 4 5.6 4c2 0 3.5 1.1 4.4 2.6C10.9 5.1 12.4 4 14.4 4 18 4 19.6 7.7 18 11.2c-2.5 4.7-10 9.3-10 9.3z" />
          </svg>
        </button>
      </div>

      <div className={styles.body}>
        {product.brand && <span className={styles.brand}>{product.brand}</span>}
        <h3 className={`font-display ${styles.title}`}>{product.title}</h3>

        <div className={styles.priceRow}>
          <span className={styles.price}>
            {t('common.currency')}
            {discountedPrice.toFixed(0)}
          </span>
          {product.discountPercentage > 0 && (
            <span className={styles.priceOld}>
              {t('common.currency')}
              {product.price.toFixed(0)}
            </span>
          )}
        </div>

        <button
          className={`${styles.addBtn} ${justAdded ? styles.addBtnDone : ''}`}
          onClick={handleAddToCart}
        >
          {justAdded ? `✓ ${t('product.addedToCart')}` : t('product.addToCart')}
        </button>
      </div>
    </Link>
  );
}
