import { useMemo, useState, type FormEvent } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './CheckoutCardForm.module.scss';

interface CheckoutCardFormProps {
  amount: string;
  onPay: () => void;
}

function detectBrand(digits: string): 'visa' | 'mastercard' | 'amex' | null {
  if (/^4/.test(digits)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  return null;
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function CheckoutCardForm({ amount, onPay }: CheckoutCardFormProps) {
  const { t } = useLanguage();
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cvcFocused, setCvcFocused] = useState(false);

  const digits = cardNumber.replace(/\D/g, '');
  const brand = useMemo(() => detectBrand(digits), [digits]);

  const isExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  const isValid = digits.length === 16 && cardHolder.trim().length > 1 && isExpiryValid && cvc.length >= 3;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) return;
    onPay();
  };

  return (
    <div className={styles.wrap}>
      <h2 id="checkout-title" className={`font-display ${styles.title}`}>
        {t('cart.payTitle')}
      </h2>

      <div className={`${styles.cardPreview} ${cvcFocused ? styles.flipped : ''}`}>
        <div className={styles.cardFront}>
          <div className={styles.cardTopRow}>
            <span className={styles.chip} />
            {brand && <span className={styles.brand}>{brand}</span>}
          </div>
          <span className={styles.cardNumber}>{cardNumber || '•••• •••• •••• ••••'}</span>
          <div className={styles.cardBottomRow}>
            <span className={styles.cardHolderPreview}>
              {cardHolder.trim() || t('cart.cardHolderPlaceholder')}
            </span>
            <span className={styles.expiryPreview}>{expiry || 'MM/YY'}</span>
          </div>
        </div>
        <div className={styles.cardBack}>
          <div className={styles.magneticStrip} />
          <div className={styles.signatureStrip}>
            <span>{cvc || '•••'}</span>
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>{t('cart.cardNumber')}</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          />
        </label>

        <label className={styles.field}>
          <span>{t('cart.cardHolder')}</span>
          <input
            type="text"
            autoComplete="cc-name"
            placeholder={t('cart.cardHolderPlaceholder')}
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </label>

        <div className={styles.fieldRow}>
          <label className={styles.field}>
            <span>{t('cart.expiry')}</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            />
          </label>

          <label className={styles.field}>
            <span>{t('cart.cvc')}</span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              onFocus={() => setCvcFocused(true)}
              onBlur={() => setCvcFocused(false)}
            />
          </label>
        </div>

        <button type="submit" className={styles.payBtn} disabled={!isValid}>
          {t('cart.payButton', { amount })}
        </button>

        <p className={styles.demoNotice}>{t('cart.demoNotice')}</p>
      </form>
    </div>
  );
}
