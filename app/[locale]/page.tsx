import { getTranslations, getLocaleFromPath, locales, type Locale } from '@/lib/i18n';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Steps from '@/components/Steps';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import config from '@/global-config';
import type { Metadata } from 'next';

// Generate static params for all locales
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const translations = await getTranslations(locale);
  
  const titles: Record<Locale, string> = {
    vi: `${config.nameWebsite} - Dịch vụ Massage tại nhà và khách sạn`,
    en: `${config.nameWebsite} - Home & Hotel Massage Service`,
    ko: `${config.nameWebsite} - 홈 & 호텔 마사지 서비스`,
  };
  const descriptions: Record<Locale, string> = {
    vi: 'Dịch vụ massage chuyên nghiệp tại nhà và khách sạn. Đặt lịch nhanh qua Zalo. KTV chuyên nghiệp, đến tận nơi đúng giờ.',
    en: 'Professional massage service at home and hotel. Book quickly via Zalo. Professional therapists, on-time service.',
    ko: '홈·호텔 전문 마사지 서비스. 자로로 빠른 예약. 전문 테라피스트, 정시 방문.',
  };
  const keywords: Record<Locale, string> = {
    vi: 'massage tại nhà, massage khách sạn, massage Huế, đặt lịch massage',
    en: 'home massage, hotel massage, Hue massage, book massage',
    ko: '홈 마사지, 호텔 마사지, 후에 마사지, 마사지 예약',
  };
  const ogLocales: Record<Locale, string> = {
    vi: 'vi_VN',
    en: 'en_US',
    ko: 'ko_KR',
  };
  const title = titles[locale];
  const description = descriptions[locale];
  return {
    title,
    description,
    keywords: keywords[locale],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: ogLocales[locale],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const translations = await getTranslations(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header translations={translations} currentLocale={locale} />
      <main className="flex-grow">
        <Hero translations={translations} locale={locale} />
        <Services translations={translations} locale={locale} />
        <Benefits translations={translations} />
        <Steps translations={translations} />
        <FAQ translations={translations} />
      </main>
      <Footer translations={translations} locale={locale} />
      
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: config.nameWebsite,
            description: translations.hero.subheadline,
            telephone: config.phoneNumber.startsWith('0') ? `+84${config.phoneNumber.slice(1)}` : config.phoneNumber,
            email: config.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: config.address,
              addressCountry: 'VN',
            },
            url: undefined,
            priceRange: '$$',
            areaServed: { '@type': 'City', name: 'Hue' },
            serviceType: 'Massage Service',
          }),
        }}
      />
    </div>
  );
}
