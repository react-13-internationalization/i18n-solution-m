import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default async function LocaleLayout({ children, params }:
    {children: React.ReactNode, params: Promise<{ locale: Locale }>}) {

  const { locale } = await params;
    
  if (!routing.locales.includes(locale)) {
      notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <div className="page-container">
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="content">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
