import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LangSwitcher from '../LangSwitcher';
import styles from './Header.module.css';

export default function Header() {
  const t = useTranslations('Navigation');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          {t('home')}
        </Link>
        <Link href="/about" className={styles.link}>
          {t('about')}
        </Link>
        <LangSwitcher caption={t('changeLanguage')} />
      </nav>
    </header>
  );
}
