import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { type Locale } from '@/lib/i18n';
import { SITE_URL, DEFAULT_LOCALE } from '@/lib/seo';
import '../globals.css';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });
const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const path = `/${locale}/`;

  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,
      languages: {
        vi: '/vi/',
        en: '/en/',
        ko: '/ko/',
        'x-default': `/${DEFAULT_LOCALE}/`,
      },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body className={`${inter.className} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
