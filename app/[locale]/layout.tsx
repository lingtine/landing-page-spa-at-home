import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { SITE_URL, DEFAULT_LOCALE } from '@/lib/seo';

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
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${params.locale}";`,
        }}
      />
      {children}
    </>
  );
}
