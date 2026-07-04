import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchFragranceById, fetchFragrances } from '../../api/productsApi';
import type { Product } from '../../types/product';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { Loader } from '../../components/Loader/Loader';
import { Modal } from '../../components/Modal/Modal';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './ProductDetails.module.scss';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setActiveImage(0);
    setQuantity(1);

    fetchFragranceById(Number(id))
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        return fetchFragrances(5, 0);
      })
      .then((res) => {
        if (!cancelled && res) {
          setRelated(res.products.filter((p) => p.id !== Number(id)).slice(0, 4));
        }
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Loader label={t('common.loading')} />;

  if (notFound || !product) {
    return (
      <div className={`container ${styles.notFound}`}>
        <p>{t('common.error')}</p>
        <button onClick={() => navigate('/shop')} className={styles.backBtn}>
          {t('cart.emptyCta')}
        </button>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const stockLabel =
    product.stock === 0
      ? t('product.outOfStock')
      : product.stock < 15
        ? t('product.lowStock')
        : t('product.inStock');

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    showToast(`${product.title} — ${t('product.addedToCart')}`);
  };

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.breadcrumb}>
        <Link to="/">{t('nav.home')}</Link> / <Link to="/shop">{t('nav.shop')}</Link> /{' '}
        <span>{product.title}</span>
      </div>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <button className={styles.mainImageBtn} onClick={() => setGalleryOpen(true)}>
            <img
              src={product.images?.[activeImage] || product.thumbnail}
              alt={product.title}
              className={styles.mainImage}
            />
          </button>
          {product.images && product.images.length > 1 && (
            <div className={styles.thumbs}>
              {product.images.slice(0, 5).map((img, i) => (
                <button
                  key={img}
                  className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          {product.brand && <span className="overline">{product.brand}</span>}
          <h1 className={`font-display ${styles.title}`}>{product.title}</h1>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </span>
            <span className={styles.ratingValue}>{product.rating.toFixed(1)}</span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>
              {t('common.currency')}
              {discountedPrice.toFixed(0)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className={styles.priceOld}>
                  {t('common.currency')}
                  {product.price.toFixed(0)}
                </span>
                <span className={styles.discountTag}>
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={`${styles.stockRow} ${product.stock === 0 ? styles.stockOut : ''}`}>
            <span className={styles.stockDot} />
            {stockLabel}
          </div>

          <div className={styles.buyRow}>
            <div className={styles.qtyControl}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>

            <button
              className={styles.addBtn}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {t('product.addToCart')}
            </button>

            <button
              className={`${styles.favBtn} ${favorite ? styles.favBtnActive : ''}`}
              onClick={() => toggleFavorite(product.id)}
              aria-pressed={favorite}
              aria-label={favorite ? t('product.removeFromFavorites') : t('product.addToFavorites')}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill={favorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 20.5s-7.5-4.6-10-9.3C.4 7.7 2 4 5.6 4c2 0 3.5 1.1 4.4 2.6C10.9 5.1 12.4 4 14.4 4 18 4 19.6 7.7 18 11.2c-2.5 4.7-10 9.3-10 9.3z" />
              </svg>
            </button>
          </div>

          <dl className={styles.metaList}>
            {product.shippingInformation && (
              <div>
                <dt>{t('product.shipping')}</dt>
                <dd>{product.shippingInformation}</dd>
              </div>
            )}
            {product.warrantyInformation && (
              <div>
                <dt>{t('product.warranty')}</dt>
                <dd>{product.warrantyInformation}</dd>
              </div>
            )}
            {product.returnPolicy && (
              <div>
                <dt>{t('product.returnPolicy')}</dt>
                <dd>{product.returnPolicy}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className={styles.reviews}>
          <h2 className="font-display">{t('product.reviews')}</h2>
          <div className={styles.reviewGrid}>
            {product.reviews.map((review, i) => (
              <div className={styles.reviewCard} key={i}>
                <div className={styles.reviewStars}>
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <p>{review.comment}</p>
                <span className={styles.reviewer}>{review.reviewerName}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className={styles.related}>
          <h2 className="font-display">{t('product.relatedTitle')}</h2>
          <div className={styles.relatedGrid}>
            {related.map((p, i) => (
              <ProductCard product={p} key={p.id} index={i} />
            ))}
          </div>
        </section>
      )}

      <Modal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} labelledBy="gallery-title">
        <div className={styles.galleryModal}>
          <h2 id="gallery-title" className="visually-hidden">
            {product.title}
          </h2>
          <img src={product.images?.[activeImage] || product.thumbnail} alt={product.title} />
        </div>
      </Modal>
    </div>
  );
}
