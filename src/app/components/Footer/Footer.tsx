'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>{t('copyright')}</p>

        <div className={styles.links}>
          <Link href="/privacy-policy">{t('privacyPolicy')}</Link>
          <Link href="/terms-of-service">{t('termsOfService')}</Link>
        </div>

        <div className={styles.social}>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('socialMedia.twitter')}
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('socialMedia.facebook')}
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('socialMedia.instagram')}
          </Link>
        </div>

        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo(0, 0)}
        >
          {t('backToTop')}
        </button>
      </div>
    </footer>
  );
}
