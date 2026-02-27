import { getTranslations, getLocaleFromPath, locales, type Locale } from '@/lib/i18n';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PremiumIntro from '@/components/PremiumIntro';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Steps from '@/components/Steps';
import Reviews from '@/components/Reviews';
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
    vi: `${config.nameWebsite} - Massage Tại Nhà TP.HCM`,
    en: `${config.nameWebsite} - At-Home Massage Ho Chi Minh City`,
    ko: `${config.nameWebsite} - 호치민 방문 마사지 서비스`,
  };
  const descriptions: Record<Locale, string> = {
    vi: 'Dịch vụ massage tại nhà TP.HCM. Body Massage, Shiatsu Nhật Bản, Massage Thụy Điển, Massage Vai Gáy. KTV đến tận nơi, an toàn, kín đáo. Đặt lịch qua Zalo.',
    en: 'At-home massage service in Ho Chi Minh City. Body Massage, Japanese Shiatsu, Swedish Massage, Neck & Shoulder. Therapist comes to you, safe and discreet. Book via Zalo.',
    ko: '호치민 방문 마사지 서비스. 바디 마사지, 일본 지압(시아츠), 스웨디시 마사지, 어깨·목 마사지. 테라피스트가 정시에 방문. 자로로 예약.',
  };
  const keywords: Record<Locale, string> = {
    vi: 'massage tại nhà, massage tại nhà TPHCM, massage tại nhà Hồ Chí Minh, body massage, shiatsu, massage thụy điển, massage vai gáy, đặt massage tại nhà',
    en: 'at-home massage, home massage Ho Chi Minh City, body massage, shiatsu, swedish massage, neck massage, book massage at home',
    ko: '방문 마사지, 호치민 방문 마사지, 바디 마사지, 시아츠, 스웨디시 마사지, 어깨 목 마사지, 집에서 마사지',
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
        <PremiumIntro translations={translations} locale={locale} />
        <Reviews translations={translations} />

        <FAQ translations={translations} />
      </main>
      <Footer translations={translations} locale={locale} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HealthAndBeautyBusiness',
            name: config.nameWebsite,
            description: translations.hero.subheadline,
            telephone: config.phoneNumber.startsWith('0') ? `+84${config.phoneNumber.slice(1)}` : config.phoneNumber,
            email: config.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: config.address,
              addressLocality: 'Thành phố Hồ Chí Minh',
              addressCountry: 'VN',
            },
            url: undefined,
            priceRange: '$$',
            areaServed: { '@type': 'City', name: 'Ho Chi Minh City' },
            serviceType: 'At-Home Massage Service',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Dịch vụ Massage Tại Nhà',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Body Massage' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Massage Vai Gáy' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shiatsu Nhật Bản' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Massage Thụy Điển' } },
              ],
            },
          }),
        }}
      />
    </div>
  );
}
