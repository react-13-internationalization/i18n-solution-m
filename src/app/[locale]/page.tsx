import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.subtitle}>{t('subtitle')}</p>
      <div className={styles.contentSection}>
        <h2>{t('welcomeHeader')}</h2>
        <p>{t('welcomeText')}</p>
      </div>
    </div>
  );
}
