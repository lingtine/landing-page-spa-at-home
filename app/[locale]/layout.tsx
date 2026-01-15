import type { Metadata } from 'next';
import { getTranslations, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  
  return {
    metadataBase: new URL('https://idmassage.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'vi': '/vi',
        'en': '/en',
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
  return <>{children}</>;
}
