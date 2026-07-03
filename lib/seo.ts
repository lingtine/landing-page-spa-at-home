import config from '@/global-config';
import type { Locale } from '@/lib/i18n';

export const SITE_URL = 'https://massagetannha.com';
export const DEFAULT_LOCALE: Locale = 'vi';
export const OG_LOCALES: Record<Locale, string> = {
    vi: 'vi_VN',
    en: 'en_US',
    ko: 'ko_KR',
};

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function formatPhone(phone: string): string {
    return phone.startsWith('0') ? `+84${phone.slice(1)}` : phone;
}

function absoluteUrl(path: string): string {
    return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

function areaServedNameFor(locale: Locale, area: (typeof config.areaServed)[number]) {
    if (locale === 'en') return area.nameEn;
    if (locale === 'ko') return area.nameKo;
    return area.name;
}

/**
 * LocalBusiness (HealthAndBeautyBusiness subtype) — full profile for Local Pack + AI answer engines.
 */
export function generateBusinessJsonLd(locale: Locale, translations: any) {
    return {
        '@context': 'https://schema.org' as const,
        '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'] as const,
        '@id': BUSINESS_ID,
        name: config.nameWebsite,
        alternateName: 'Iku Massage Tại Nhà',
        description: translations.hero?.subheadline ?? '',
        url: `${SITE_URL}/${locale}/`,
        telephone: formatPhone(config.phoneNumber),
        email: config.email,
        image: [
            absoluteUrl('/images/banner-hero.webp'),
            absoluteUrl('/images/logo.png'),
        ],
        logo: absoluteUrl('/images/logo.png'),
        priceRange: config.priceRange,
        currenciesAccepted: 'VND',
        paymentAccepted: 'Cash, Bank Transfer, Momo, ZaloPay',
        address: {
            '@type': 'PostalAddress' as const,
            streetAddress: config.address,
            addressLocality: config.addressLocality,
            addressRegion: config.addressRegion,
            postalCode: config.postalCode,
            addressCountry: config.addressCountry,
        },
        geo: {
            '@type': 'GeoCoordinates' as const,
            latitude: config.geo.latitude,
            longitude: config.geo.longitude,
        },
        openingHoursSpecification: [{
            '@type': 'OpeningHoursSpecification' as const,
            dayOfWeek: config.openingHoursSpec.dayOfWeek,
            opens: config.openingHoursSpec.opens,
            closes: config.openingHoursSpec.closes,
        }],
        areaServed: config.areaServed.map((area) => ({
            '@type': 'AdministrativeArea' as const,
            name: areaServedNameFor(locale, area),
            containedInPlace: {
                '@type': 'City' as const,
                name: 'Ho Chi Minh City',
            },
        })),
        serviceType: 'At-Home Massage Service',
        sameAs: [config.facebook, config.zalo],
        knowsLanguage: ['vi', 'en', 'ko'],
    };
}

/**
 * WebSite schema — helps brand SERP + entity clarity for AI answer engines.
 */
export function generateWebSiteJsonLd(locale: Locale) {
    return {
        '@context': 'https://schema.org' as const,
        '@type': 'WebSite' as const,
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/${locale}/`,
        name: config.nameWebsite,
        inLanguage: OG_LOCALES[locale],
        publisher: { '@id': BUSINESS_ID },
    };
}

/**
 * FAQPage — dynamically built from translations.faq (any number of qN keys).
 */
export function generateFAQJsonLd(translations: any) {
    const faq = translations.faq;
    if (!faq) {
        return {
            '@context': 'https://schema.org' as const,
            '@type': 'FAQPage' as const,
            mainEntity: [],
        };
    }

    const questions = Object.keys(faq)
        .filter((key) => /^q\d+$/.test(key) && faq[key]?.question)
        .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))
        .map((key) => ({
            '@type': 'Question' as const,
            name: faq[key].question,
            acceptedAnswer: {
                '@type': 'Answer' as const,
                text: faq[key].answer,
            },
        }));

    return {
        '@context': 'https://schema.org' as const,
        '@type': 'FAQPage' as const,
        mainEntity: questions,
    };
}

/**
 * SpeakableSpecification — tells voice/AI which parts of the page are safe to read aloud.
 */
export function generateSpeakableJsonLd() {
    return {
        '@context': 'https://schema.org' as const,
        '@type': 'WebPage' as const,
        speakable: {
            '@type': 'SpeakableSpecification' as const,
            cssSelector: ['h1', '.hero-subheadline', '.faq-answer'],
        },
    };
}

/**
 * Service page schema with provider reference by @id and areaServed.
 */
export function generateServiceJsonLd(
    locale: Locale,
    serviceName: string,
    serviceDescription: string,
) {
    return {
        '@context': 'https://schema.org' as const,
        '@type': 'Service' as const,
        name: serviceName,
        description: serviceDescription,
        serviceType: 'At-Home Massage',
        areaServed: {
            '@type': 'City' as const,
            name: 'Ho Chi Minh City',
        },
        provider: { '@id': BUSINESS_ID },
    };
}

export function generateBreadcrumbJsonLd(
    locale: Locale,
    items: Array<{ name: string; url: string }>,
) {
    return {
        '@context': 'https://schema.org' as const,
        '@type': 'BreadcrumbList' as const,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem' as const,
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
