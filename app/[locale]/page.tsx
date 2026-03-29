import { getTranslations, getLocaleFromPath, locales, type Locale } from '@/lib/i18n';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import config from '@/global-config';
import { SITE_URL, OG_LOCALES, generateBusinessJsonLd, generateFAQJsonLd } from '@/lib/seo';
import type { Metadata } from 'next';

// Lazy load below-the-fold components
const Services = dynamic(() => import('@/components/Services'));
const Benefits = dynamic(() => import('@/components/Benefits'));
const Steps = dynamic(() => import('@/components/Steps'));
const PremiumIntro = dynamic(() => import('@/components/PremiumIntro'));
const Reviews = dynamic(() => import('@/components/Reviews'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const Footer = dynamic(() => import('@/components/Footer'));

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

  const title = titles[locale];
  const description = descriptions[locale];
  const pageUrl = `${SITE_URL}/${locale}/`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: keywords[locale],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: OG_LOCALES[locale],
      url: pageUrl,
      images: [
        {
          url: '/images/banner-hero.png',
          alt: title,
        },
      ],
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

  const businessJsonLd = generateBusinessJsonLd(locale, translations);
  const faqJsonLd = generateFAQJsonLd(translations);

  return (
    <div className="min-h-screen flex flex-col">
      <Header translations={translations} currentLocale={locale} />
      <main className="flex-grow">
        <Hero translations={translations} locale={locale} />

        <FeaturedServices locale={locale} translations={translations} />
        <Services translations={translations} locale={locale} />
        <Benefits translations={translations} />
        <Steps translations={translations} />
        <PremiumIntro translations={translations} locale={locale} />
        <Reviews translations={translations} />

        <FAQ translations={translations} />
      </main>
      <Footer translations={translations} locale={locale} />

      {/* Schema.org JSON-LD — Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      {/* Schema.org JSON-LD — FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
