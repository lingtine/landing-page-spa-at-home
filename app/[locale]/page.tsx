import { getTranslations, locales, type Locale } from '@/lib/i18n';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import config from '@/global-config';
import {
  SITE_URL,
  OG_LOCALES,
  generateBusinessJsonLd,
  generateFAQJsonLd,
  generateWebSiteJsonLd,
  generateSpeakableJsonLd,
} from '@/lib/seo';
import type { Metadata } from 'next';

const Services = dynamic(() => import('@/components/Services'));
const Benefits = dynamic(() => import('@/components/Benefits'));
const Steps = dynamic(() => import('@/components/Steps'));
const PremiumIntro = dynamic(() => import('@/components/PremiumIntro'));
const Reviews = dynamic(() => import('@/components/Reviews'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const Footer = dynamic(() => import('@/components/Footer'));

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;

  const titles: Record<Locale, string> = {
    vi: `${config.nameWebsite} – Massage Tại Nhà TP.HCM Uy Tín`,
    en: `${config.nameWebsite} – At-Home Massage in Ho Chi Minh City`,
    ko: `${config.nameWebsite} – 호치민 방문 마사지 전문`,
  };
  const descriptions: Record<Locale, string> = {
    vi: 'Massage tại nhà TP.HCM: Body, Thái, Aroma, Đá Nóng, Shiatsu, Thụy Điển. KTV xác minh đến tận nơi 8:00–23:30. Giá minh bạch, đặt lịch Zalo trong 30 giây.',
    en: 'At-home massage in Ho Chi Minh City: Body, Thai, Aroma, Hot Stone, Shiatsu, Swedish. Verified therapist to your door 8AM–11:30PM. Transparent pricing, book on Zalo in 30 seconds.',
    ko: '호치민 방문 마사지 전문: 바디·타이·아로마·핫스톤·시아츠·스웨디시. 검증된 테라피스트가 08:00–23:30 방문. 투명 요금, 자로로 30초 예약.',
  };
  const keywords: Record<Locale, string> = {
    vi: 'massage tại nhà, massage tại nhà TPHCM, massage tại nhà Hồ Chí Minh, dịch vụ massage tại nhà, đặt KTV massage, massage therapist tại nhà, body massage, shiatsu, massage thụy điển, massage thái, massage aroma, massage đá nóng, massage vai gáy',
    en: 'at-home massage, home massage Ho Chi Minh City, at-home massage therapist HCMC, mobile massage HCMC, book massage at home, body massage, shiatsu, swedish massage, thai massage, aromatherapy massage, hot stone massage, masseuse home service',
    ko: '방문 마사지, 호치민 방문 마사지, 방문 마사지사, 홈 마사지, 바디 마사지, 시아츠, 스웨디시 마사지, 타이 마사지, 아로마 마사지, 핫스톤 마사지, 어깨 목 마사지, 집에서 마사지',
  };

  const title = titles[locale];
  const description = descriptions[locale];
  const pageUrl = `${SITE_URL}/${locale}/`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: keywords[locale],
    applicationName: config.nameWebsite,
    authors: [{ name: config.nameWebsite, url: SITE_URL }],
    creator: config.nameWebsite,
    publisher: config.nameWebsite,
    category: 'Health & Beauty',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: OG_LOCALES[locale],
      alternateLocale: Object.values(OG_LOCALES).filter((l) => l !== OG_LOCALES[locale]),
      url: pageUrl,
      siteName: config.nameWebsite,
      images: [
        {
          url: '/images/banner-hero.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/banner-hero.png'],
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
  const websiteJsonLd = generateWebSiteJsonLd(locale);
  const speakableJsonLd = generateSpeakableJsonLd();

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
    </div>
  );
}
