import config from '@/global-config';
import type { Locale } from '@/lib/i18n';

// SEO Constants
export const SITE_URL = 'https://massagetannha.com';
export const DEFAULT_LOCALE: Locale = 'vi';
export const OG_LOCALES: Record<Locale, string> = {
    vi: 'vi_VN',
    en: 'en_US',
    ko: 'ko_KR',
};

/**
 * Format phone number to international format (+84...)
 */
function formatPhone(phone: string): string {
    return phone.startsWith('0') ? `+84${phone.slice(1)}` : phone;
}

/**
 * Generate JSON-LD for HealthAndBeautyBusiness (homepage).
 * Validates: Requirements 5.1, 5.5, 5.6, 10.3
 */
export function generateBusinessJsonLd(locale: Locale, translations: any) {
    return {
        '@context': 'https://schema.org' as const,
        '@type': 'HealthAndBeautyBusiness' as const,
        name: config.nameWebsite,
        description: translations.hero.subheadline,
        telephone: formatPhone(config.phoneNumber),
        email: config.email,
        address: {
            '@type': 'PostalAddress' as const,
            streetAddress: config.address,
            addressLocality: 'Thành phố Hồ Chí Minh',
            addressCountry: 'VN',
        },
        url: `${SITE_URL}/${locale}/`,
        priceRange: '$',
        areaServed: { '@type': 'City' as const, name: 'Ho Chi Minh City' },
        serviceType: 'At-Home Massage Service',
    };
}

/**
 * Generate JSON-LD for FAQPage from translations.faq.
 * Validates: Requirements 5.3, 5.6, 10.3
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

    // Collect all q* keys from faq (q1, q2, q3, ...)
    const questions = Object.keys(faq)
        .filter((key) => key.startsWith('q') && faq[key]?.question)
        .sort()
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
 * Generate JSON-LD for a Service page with provider reference.
 * Validates: Requirements 5.2
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
        provider: {
            '@type': 'HealthAndBeautyBusiness' as const,
            name: config.nameWebsite,
            url: `${SITE_URL}/${locale}/`,
        },
    };
}

/**
 * Generate JSON-LD for BreadcrumbList with incrementing positions.
 * Validates: Requirements 5.4
 */
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
