import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFragranceById } from '../../api/productsApi';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../../components/Modal/Modal';
import { Loader } from '../../components/Loader/Loader';
import { CheckoutCardForm } from '../../components/CheckoutCardForm/CheckoutCardForm';
import styles from './Cart.module.scss';

type CheckoutStep = 'card' | 'processing';

export function Cart() {
  const { t } = useLanguage();
  const { items, removeItem, setQuantity, clearCart } = useCart();
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('card');
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);

    Promise.all(items.map((item) => fetchFragranceById(item.productId)))
      .then((results) => {
        if (cancelled) return;
        const map: Record<number, Product> = {};
        results.forEach((p) => {
          map[p.id] = p;
        });
        setProducts(map);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [items]);

  const subtotal = items.reduce((sum, item) => {
    const product = products[item.productId];
    if (!product) return sum;
    const price = product.price * (1 - product.discountPercentage / 100);
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    setCheckoutStep('card');
    setCheckoutOpen(true);
  };

  const handleConfirmPayment = () => {
    setCheckoutStep('processing');
    window.setTimeout(() => {
      setCheckoutOpen(false);
      setCheckoutStep('card');
      setSuccessOpen(true);
    }, 1200);
  };

  const closeSuccess = () => {
    clearCart();
    setSuccessOpen(false);
  };

  if (loading) return <Loader label={t('common.loading')} />;

  if (items.length === 0) {
    return (
      <div className={`container ${styles.empty}`}>
        <span className={styles.emptyIcon}>✦</span>
        <p>{t('cart.empty')}</p>
        <Link to="/shop" className={styles.emptyCta}>
          {t('cart.emptyCta')}
        </Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={`font-display ${styles.title}`}>{t('cart.title')}</h1>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {items.map((item) => {
            const product = products[item.productId];
            if (!product) return null;
            const price = product.price * (1 - product.discountPercentage / 100);

            return (
              <li className={styles.row} key={item.productId}>
                <Link to={`/product/${product.id}`} className={styles.rowImage}>
                  <img src={product.thumbnail} alt={product.title} />
                </Link>

                <div className={styles.rowInfo}>
                  <Link to={`/product/${product.id}`} className={styles.rowTitle}>
                    {product.title}
                  </Link>
                  {product.brand && <span className={styles.rowBrand}>{product.brand}</span>}
                </div>

                <div className={styles.qtyControl}>
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <span className={styles.rowPrice}>
                  {t('common.currency')}
                  {(price * item.quantity).toFixed(0)}
                </span>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.productId)}
                  aria-label={t('cart.remove')}
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>{t('cart.subtotal')}</span>
            <span className={styles.summaryTotal}>
              {t('common.currency')}
              {subtotal.toFixed(0)}
            </span>
          </div>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            {t('cart.checkout')}
          </button>
        </div>
      </div>

      <Modal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        labelledBy="checkout-title"
      >
        {checkoutStep === 'card' && (
          <CheckoutCardForm
            amount={`${t('common.currency')}${subtotal.toFixed(0)}`}
            onPay={handleConfirmPayment}
          />
        )}

        {checkoutStep === 'processing' && (
          <div className={styles.checkoutModal}>
            <Loader label={t('cart.processing')} />
          </div>
        )}
      </Modal>

      <Modal isOpen={successOpen} onClose={closeSuccess} labelledBy="payment-done-title">
        <div className={styles.checkoutModal}>
          <span className={styles.checkoutIcon}>✦</span>
          <h2 id="payment-done-title" className="font-display">
            {t('cart.paymentDoneTitle')}
          </h2>
          <p className={styles.checkoutSubtitle}>{t('cart.checkoutSuccess')}</p>
          <button className={styles.checkoutClose} onClick={closeSuccess}>
            {t('product.close')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
