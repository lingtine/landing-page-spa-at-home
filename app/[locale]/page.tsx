import { getTranslations, getLocaleFromPath, locales, type Locale } from '@/lib/i18n';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Steps from '@/components/Steps';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
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
  
  const title = locale === 'vi' 
    ? 'IDMassage - Dịch vụ Massage tại nhà và khách sạn'
    : 'IDMassage - Home & Hotel Massage Service';
    
  const description = locale === 'vi'
    ? 'Dịch vụ massage chuyên nghiệp tại nhà và khách sạn. Đặt lịch nhanh qua Zalo. KTV chuyên nghiệp, đến tận nơi đúng giờ.'
    : 'Professional massage service at home and hotel. Book quickly via Zalo. Professional therapists, on-time service.';
  
  return {
    title,
    description,
    keywords: locale === 'vi' 
      ? 'massage tại nhà, massage khách sạn, massage Huế, đặt lịch massage'
      : 'home massage, hotel massage, Hue massage, book massage',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
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
            name: 'IDMassage',
            description: translations.hero.subheadline,
            telephone: '+84886517257',
            email: 'info@idmassage.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '04 Đống Đa',
              addressLocality: 'Phường Thuận Hoá',
              addressRegion: 'Thành phố Huế',
              addressCountry: 'VN',
            },
            url: 'https://idmassage.com',
            priceRange: '$$',
            areaServed: {
              '@type': 'City',
              name: 'Hue',
            },
            serviceType: 'Massage Service',
          }),
        }}
      />
    </div>
  );
}
