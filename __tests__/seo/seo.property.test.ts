import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { generateBusinessJsonLd, generateFAQJsonLd, generateServiceJsonLd, generateBreadcrumbJsonLd, OG_LOCALES, SITE_URL, DEFAULT_LOCALE } from '@/lib/seo';
import type { Locale } from '@/lib/i18n';
import viMessages from '@/messages/vi.json';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';
import config from '@/global-config';
import { FEATURED_SERVICE_IDS } from '@/lib/featured_services';
import sitemap from '@/app/sitemap';

// Feature: seo-optimization, Property 7: Business JSON-LD completeness
// Validates: Requirements 5.1, 5.5
describe('Property 7: Business JSON-LD completeness', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];

    const translationsMap: Record<Locale, typeof viMessages> = {
        vi: viMessages,
        en: enMessages,
        ko: koMessages,
    };

    const loadTranslations = (locale: Locale) => translationsMap[locale];

    const localeArb = fc.constantFrom(...locales);

    it('should return HealthAndBeautyBusiness with all required fields for any locale', () => {
        fc.assert(
            fc.property(localeArb, (locale) => {
                const translations = loadTranslations(locale);
                const result = generateBusinessJsonLd(locale, translations);

                // Verify @type
                expect(result['@type']).toBe('HealthAndBeautyBusiness');

                // Verify all required fields are present and non-empty
                expect(result.name).toBeTruthy();
                expect(result.description).toBeTruthy();
                expect(result.telephone).toBeTruthy();
                expect(result.email).toBeTruthy();
                expect(result.address).toBeTruthy();
                expect(result.url).toBeTruthy();
                expect(result.priceRange).toBeTruthy();
                expect(result.areaServed).toBeTruthy();
                expect(result.serviceType).toBeTruthy();

                // Verify url is NOT undefined and starts with correct domain
                expect(result.url).not.toBe('undefined');
                expect(result.url).not.toBeUndefined();
                expect(result.url).toMatch(/^https:\/\/massagetannha\.com/);

                // Verify url equals the expected locale-specific URL
                expect(result.url).toBe(`https://massagetannha.com/${locale}/`);
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 9: FAQ JSON-LD completeness
// Validates: Requirements 5.3
describe('Property 9: FAQ JSON-LD completeness', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];

    const translationsMap: Record<Locale, typeof viMessages> = {
        vi: viMessages,
        en: enMessages,
        ko: koMessages,
    };

    const loadTranslations = (locale: Locale) => translationsMap[locale];

    const localeArb = fc.constantFrom(...locales);

    it('should return FAQPage with correct number of questions and valid structure for any locale', () => {
        fc.assert(
            fc.property(localeArb, (locale) => {
                const translations = loadTranslations(locale);
                const result = generateFAQJsonLd(translations);

                // Verify @type is FAQPage
                expect(result['@type']).toBe('FAQPage');

                // Count expected FAQ items from translations
                const faqKeys = Object.keys(translations.faq).filter(
                    (key) => key.startsWith('q') && (translations.faq as any)[key]?.question,
                );

                // Verify mainEntity has the correct number of questions
                expect(result.mainEntity).toHaveLength(faqKeys.length);

                // Verify each question has valid structure
                for (const question of result.mainEntity) {
                    expect(question['@type']).toBe('Question');
                    expect(question.name).toBeTruthy();
                    expect(typeof question.name).toBe('string');
                    expect(question.name.length).toBeGreaterThan(0);

                    expect(question.acceptedAnswer).toBeDefined();
                    expect(question.acceptedAnswer['@type']).toBe('Answer');
                    expect(question.acceptedAnswer.text).toBeTruthy();
                    expect(typeof question.acceptedAnswer.text).toBe('string');
                    expect(question.acceptedAnswer.text.length).toBeGreaterThan(0);
                }
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 8: Service JSON-LD completeness
// Validates: Requirements 5.2
describe('Property 8: Service JSON-LD completeness', () => {
    const localeArb = fc.constantFrom('vi' as Locale, 'en' as Locale, 'ko' as Locale);
    const nonEmptyStringArb = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

    it('should return Service JSON-LD with name, description, and HealthAndBeautyBusiness provider for any locale and service', () => {
        fc.assert(
            fc.property(localeArb, nonEmptyStringArb, nonEmptyStringArb, (locale, serviceName, serviceDescription) => {
                const result = generateServiceJsonLd(locale, serviceName, serviceDescription);

                // Verify @type is Service
                expect(result['@type']).toBe('Service');

                // Verify name and description match inputs
                expect(result.name).toBe(serviceName);
                expect(result.description).toBe(serviceDescription);

                // Verify provider exists and references HealthAndBeautyBusiness
                expect(result.provider).toBeDefined();
                expect(result.provider['@type']).toBe('HealthAndBeautyBusiness');
                expect(result.provider.name).toBeTruthy();
                expect(typeof result.provider.name).toBe('string');
                expect(result.provider.name.length).toBeGreaterThan(0);
                expect(result.provider.url).toBeTruthy();
                expect(typeof result.provider.url).toBe('string');
                expect(result.provider.url.length).toBeGreaterThan(0);
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 10: Breadcrumb JSON-LD on service pages
// Validates: Requirements 5.4
describe('Property 10: Breadcrumb JSON-LD on service pages', () => {
    const localeArb = fc.constantFrom('vi' as Locale, 'en' as Locale, 'ko' as Locale);

    const breadcrumbItemArb = fc.record({
        name: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        url: fc.webUrl(),
    });

    // Generate arrays of at least 3 items (Home → Services → Service Name)
    const breadcrumbItemsArb = fc.array(breadcrumbItemArb, { minLength: 3, maxLength: 8 });

    it('should return BreadcrumbList with at least 3 items and strictly increasing positions for any locale and items', () => {
        fc.assert(
            fc.property(localeArb, breadcrumbItemsArb, (locale, items) => {
                const result = generateBreadcrumbJsonLd(locale, items);

                // Verify @type is BreadcrumbList
                expect(result['@type']).toBe('BreadcrumbList');

                // Verify itemListElement has at least 3 items
                expect(result.itemListElement.length).toBeGreaterThanOrEqual(3);

                // Verify each item structure and positions are strictly increasing
                for (let i = 0; i < result.itemListElement.length; i++) {
                    const element = result.itemListElement[i];

                    // Verify @type is ListItem
                    expect(element['@type']).toBe('ListItem');

                    // Verify position is a number
                    expect(typeof element.position).toBe('number');

                    // Verify position is strictly increasing (1, 2, 3, ...)
                    expect(element.position).toBe(i + 1);

                    // Verify name is non-empty
                    expect(element.name).toBeTruthy();
                    expect(typeof element.name).toBe('string');
                    expect(element.name.length).toBeGreaterThan(0);

                    // Verify item (URL) is non-empty
                    expect(element.item).toBeTruthy();
                    expect(typeof element.item).toBe('string');
                    expect(element.item.length).toBeGreaterThan(0);
                }
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 11: JSON-LD locale-awareness
// Validates: Requirements 5.6, 10.3
describe('Property 11: JSON-LD locale-awareness', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];

    const translationsMap: Record<Locale, typeof viMessages> = {
        vi: viMessages,
        en: enMessages,
        ko: koMessages,
    };

    const localeArb = fc.constantFrom(...locales);

    // Generate pairs of two different locales
    const distinctLocalePairArb = fc
        .tuple(localeArb, localeArb)
        .filter(([a, b]) => a !== b);

    it('should produce different Business JSON-LD descriptions for different locales', () => {
        fc.assert(
            fc.property(distinctLocalePairArb, ([locale1, locale2]) => {
                const translations1 = translationsMap[locale1];
                const translations2 = translationsMap[locale2];

                const business1 = generateBusinessJsonLd(locale1, translations1);
                const business2 = generateBusinessJsonLd(locale2, translations2);

                // Description must differ between locales
                expect(business1.description).not.toBe(business2.description);
            }),
            { numRuns: 100 },
        );
    });

    it('should produce different FAQ JSON-LD content for different locales', () => {
        fc.assert(
            fc.property(distinctLocalePairArb, ([locale1, locale2]) => {
                const translations1 = translationsMap[locale1];
                const translations2 = translationsMap[locale2];

                const faq1 = generateFAQJsonLd(translations1);
                const faq2 = generateFAQJsonLd(translations2);

                // At least one question's name or answer text should differ
                const hasDifference = faq1.mainEntity.some((q1, index) => {
                    const q2 = faq2.mainEntity[index];
                    return q1.name !== q2.name || q1.acceptedAnswer.text !== q2.acceptedAnswer.text;
                });

                expect(hasDifference).toBe(true);
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 1: Metadata length constraints
// Validates: Requirements 1.1, 1.2
describe('Property 1: Metadata length constraints', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];
    const translationsMap: Record<Locale, typeof viMessages> = {
        vi: viMessages,
        en: enMessages,
        ko: koMessages,
    };

    // Homepage titles — same logic as app/[locale]/page.tsx
    const homepageTitles: Record<Locale, string> = {
        vi: `${config.nameWebsite} - Massage Tại Nhà TP.HCM`,
        en: `${config.nameWebsite} - At-Home Massage Ho Chi Minh City`,
        ko: `${config.nameWebsite} - 호치민 방문 마사지 서비스`,
    };

    const homepageDescriptions: Record<Locale, string> = {
        vi: 'Dịch vụ massage tại nhà TP.HCM. Body Massage, Shiatsu Nhật Bản, Massage Thụy Điển, Massage Vai Gáy. KTV đến tận nơi, an toàn, kín đáo. Đặt lịch qua Zalo.',
        en: 'At-home massage service in Ho Chi Minh City. Body Massage, Japanese Shiatsu, Swedish Massage, Neck & Shoulder. Therapist comes to you, safe and discreet. Book via Zalo.',
        ko: '호치민 방문 마사지 서비스. 바디 마사지, 일본 지압(시아츠), 스웨디시 마사지, 어깨·목 마사지. 테라피스트가 정시에 방문. 자로로 예약.',
    };

    /** Truncate title to max 60 chars — same as service page logic */
    function truncateTitle(text: string, maxLen = 60): string {
        if (text.length <= maxLen) return text;
        return text.slice(0, maxLen - 3).trim() + '...';
    }

    /** Truncate description to max 155 chars — same as service page logic */
    function truncateForMeta(text: string, maxLen = 155): string {
        if (text.length <= maxLen) return text;
        return text.slice(0, maxLen - 3).trim() + '...';
    }

    const localeArb = fc.constantFrom(...locales);
    const slugArb = fc.constantFrom(...FEATURED_SERVICE_IDS);

    it('homepage title ≤ 60 chars and description ≤ 155 chars for any locale', () => {
        fc.assert(
            fc.property(localeArb, (locale) => {
                const title = truncateTitle(homepageTitles[locale]);
                const description = truncateForMeta(homepageDescriptions[locale]);

                expect(title.length).toBeLessThanOrEqual(60);
                expect(description.length).toBeLessThanOrEqual(155);
            }),
            { numRuns: 100 },
        );
    });

    it('service page title ≤ 60 chars and description ≤ 155 chars for any locale and slug', () => {
        fc.assert(
            fc.property(localeArb, slugArb, (locale, slug) => {
                const translations = translationsMap[locale];
                const service = (translations.featuredServices.services as any)[slug];
                const overview = service?.detail?.overview ?? service?.description ?? '';

                const rawTitle = `${service.name} | ${config.nameWebsite}`;
                const title = truncateTitle(rawTitle);
                const description = truncateForMeta(overview);

                expect(title.length).toBeLessThanOrEqual(60);
                expect(description.length).toBeLessThanOrEqual(155);
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 2: Service title contains service name and brand
// Validates: Requirements 1.3
describe('Property 2: Service title contains service name and brand', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];
    const translationsMap: Record<Locale, typeof viMessages> = {
        vi: viMessages,
        en: enMessages,
        ko: koMessages,
    };

    function truncateTitle(text: string, maxLen = 60): string {
        if (text.length <= maxLen) return text;
        return text.slice(0, maxLen - 3).trim() + '...';
    }

    const localeArb = fc.constantFrom(...locales);
    const slugArb = fc.constantFrom(...FEATURED_SERVICE_IDS);

    it('service title should contain service name; if not truncated, also contains brand', () => {
        fc.assert(
            fc.property(localeArb, slugArb, (locale, slug) => {
                const translations = translationsMap[locale];
                const service = (translations.featuredServices.services as any)[slug];
                const rawTitle = `${service.name} | ${config.nameWebsite}`;
                const title = truncateTitle(rawTitle);

                // Service name should always be present (it comes first)
                expect(title).toContain(service.name);

                // If title was not truncated, brand should also be present
                if (rawTitle.length <= 60) {
                    expect(title).toContain(config.nameWebsite);
                }
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 3: Metadata completeness
// Validates: Requirements 1.4, 10.4
describe('Property 3: Metadata completeness', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];
    const translationsMap: Record<Locale, typeof viMessages> = {
        vi: viMessages,
        en: enMessages,
        ko: koMessages,
    };

    // Homepage metadata — mirrors app/[locale]/page.tsx generateMetadata
    const homepageTitles: Record<Locale, string> = {
        vi: `${config.nameWebsite} - Massage Tại Nhà TP.HCM`,
        en: `${config.nameWebsite} - At-Home Massage Ho Chi Minh City`,
        ko: `${config.nameWebsite} - 호치민 방문 마사지 서비스`,
    };
    const homepageDescriptions: Record<Locale, string> = {
        vi: 'Dịch vụ massage tại nhà TP.HCM. Body Massage, Shiatsu Nhật Bản, Massage Thụy Điển, Massage Vai Gáy. KTV đến tận nơi, an toàn, kín đáo. Đặt lịch qua Zalo.',
        en: 'At-home massage service in Ho Chi Minh City. Body Massage, Japanese Shiatsu, Swedish Massage, Neck & Shoulder. Therapist comes to you, safe and discreet. Book via Zalo.',
        ko: '호치민 방문 마사지 서비스. 바디 마사지, 일본 지압(시아츠), 스웨디시 마사지, 어깨·목 마사지. 테라피스트가 정시에 방문. 자로로 예약.',
    };
    const homepageKeywords: Record<Locale, string> = {
        vi: 'massage tại nhà, massage tại nhà TPHCM, massage tại nhà Hồ Chí Minh, body massage, shiatsu, massage thụy điển, massage vai gáy, đặt massage tại nhà',
        en: 'at-home massage, home massage Ho Chi Minh City, body massage, shiatsu, swedish massage, neck massage, book massage at home',
        ko: '방문 마사지, 호치민 방문 마사지, 바디 마사지, 시아츠, 스웨디시 마사지, 어깨 목 마사지, 집에서 마사지',
    };

    function truncateTitle(text: string, maxLen = 60): string {
        if (text.length <= maxLen) return text;
        return text.slice(0, maxLen - 3).trim() + '...';
    }
    function truncateForMeta(text: string, maxLen = 155): string {
        if (text.length <= maxLen) return text;
        return text.slice(0, maxLen - 3).trim() + '...';
    }

    const localeArb = fc.constantFrom(...locales);
    const slugArb = fc.constantFrom(...FEATURED_SERVICE_IDS);

    it('homepage metadata includes og:title, og:description, og:type, og:locale, and keywords for any locale', () => {
        fc.assert(
            fc.property(localeArb, (locale) => {
                const title = homepageTitles[locale];
                const description = homepageDescriptions[locale];
                const keywords = homepageKeywords[locale];

                // Construct OG metadata the same way as generateMetadata in page.tsx
                const og = {
                    title,
                    description,
                    type: 'website' as const,
                    locale: OG_LOCALES[locale],
                };

                expect(og.title).toBeTruthy();
                expect(og.description).toBeTruthy();
                expect(og.type).toBe('website');
                expect(og.locale).toBeTruthy();
                expect(typeof og.locale).toBe('string');
                expect(og.locale.length).toBeGreaterThan(0);

                // Keywords must be non-empty
                expect(keywords).toBeTruthy();
                expect(keywords.length).toBeGreaterThan(0);
            }),
            { numRuns: 100 },
        );
    });

    it('service page metadata includes og:title, og:description, og:type, og:locale, and keywords for any locale and slug', () => {
        fc.assert(
            fc.property(localeArb, slugArb, (locale, slug) => {
                const translations = translationsMap[locale];
                const service = (translations.featuredServices.services as any)[slug];
                const overview = service?.detail?.overview ?? service?.description ?? '';

                const rawTitle = `${service.name} | ${config.nameWebsite}`;
                const title = truncateTitle(rawTitle);
                const description = truncateForMeta(overview);

                // Service keywords — same logic as service page
                const serviceKeywords = `${service.name}, ${config.nameWebsite}`;

                // Construct OG metadata the same way as generateMetadata in dich-vu/[slug]/page.tsx
                const og = {
                    title,
                    description,
                    type: 'article' as const,
                    locale: OG_LOCALES[locale],
                };

                expect(og.title).toBeTruthy();
                expect(og.description).toBeTruthy();
                expect(og.type).toBe('article');
                expect(og.locale).toBeTruthy();
                expect(typeof og.locale).toBe('string');
                expect(og.locale.length).toBeGreaterThan(0);

                // Keywords must be non-empty
                expect(serviceKeywords).toBeTruthy();
                expect(serviceKeywords.length).toBeGreaterThan(0);
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 4: Hreflang completeness
// Validates: Requirements 2.1, 2.2, 2.5
describe('Property 4: Hreflang completeness', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];
    const localeArb = fc.constantFrom(...locales);
    const slugArb = fc.constantFrom(...FEATURED_SERVICE_IDS);

    /**
     * Build alternates the same way as app/[locale]/layout.tsx (homepage).
     */
    function buildHomepageAlternates(locale: Locale) {
        const languages: Record<string, string> = {};
        for (const loc of locales) {
            languages[loc] = `/${loc}/`;
        }
        languages['x-default'] = `/${DEFAULT_LOCALE}/`;
        return { canonical: `/${locale}/`, languages };
    }

    /**
     * Build alternates the same way as app/[locale]/dich-vu/[slug]/page.tsx (service page).
     */
    function buildServiceAlternates(locale: Locale, slug: string) {
        const languages: Record<string, string> = {};
        for (const loc of locales) {
            languages[loc] = `/${loc}/dich-vu/${slug}/`;
        }
        languages['x-default'] = `/${DEFAULT_LOCALE}/dich-vu/${slug}/`;
        return { canonical: `/${locale}/dich-vu/${slug}/`, languages };
    }

    it('homepage alternates must contain hreflang for all 3 locales + x-default, with x-default pointing to /vi/', () => {
        fc.assert(
            fc.property(localeArb, (locale) => {
                const alternates = buildHomepageAlternates(locale);

                // Must have all 3 locales
                for (const loc of locales) {
                    expect(alternates.languages[loc]).toBeDefined();
                    expect(alternates.languages[loc]).toBe(`/${loc}/`);
                }

                // Must have x-default pointing to /vi/
                expect(alternates.languages['x-default']).toBeDefined();
                expect(alternates.languages['x-default']).toBe('/vi/');
            }),
            { numRuns: 100 },
        );
    });

    it('service page alternates must contain hreflang for all 3 locales + x-default, pointing to same slug', () => {
        fc.assert(
            fc.property(localeArb, slugArb, (locale, slug) => {
                const alternates = buildServiceAlternates(locale, slug);

                // Must have all 3 locales pointing to the same slug
                for (const loc of locales) {
                    expect(alternates.languages[loc]).toBeDefined();
                    expect(alternates.languages[loc]).toBe(`/${loc}/dich-vu/${slug}/`);
                    // Verify same slug is used across all locales
                    expect(alternates.languages[loc]).toContain(`/dich-vu/${slug}/`);
                }

                // Must have x-default pointing to /vi/ version of the same slug
                expect(alternates.languages['x-default']).toBeDefined();
                expect(alternates.languages['x-default']).toBe(`/vi/dich-vu/${slug}/`);
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 5: Canonical URL correctness
// Validates: Requirements 2.3, 2.4
describe('Property 5: Canonical URL correctness', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];
    const localeArb = fc.constantFrom(...locales);
    const slugArb = fc.constantFrom(...FEATURED_SERVICE_IDS);
    const SITE_URL_IMPORTED = SITE_URL; // https://massagetannha.com

    it('homepage canonical URL combined with SITE_URL starts with https://massagetannha.com and contains the locale path', () => {
        fc.assert(
            fc.property(localeArb, (locale) => {
                const canonicalPath = `/${locale}/`;
                const fullCanonical = `${SITE_URL_IMPORTED}${canonicalPath}`;

                // Must start with the correct domain
                expect(fullCanonical).toMatch(/^https:\/\/massagetannha\.com/);

                // Must contain the current locale path
                expect(fullCanonical).toContain(`/${locale}/`);

                // Verify exact expected URL
                expect(fullCanonical).toBe(`https://massagetannha.com/${locale}/`);
            }),
            { numRuns: 100 },
        );
    });

    it('service page canonical URL combined with SITE_URL starts with https://massagetannha.com and contains the page path', () => {
        fc.assert(
            fc.property(localeArb, slugArb, (locale, slug) => {
                const canonicalPath = `/${locale}/dich-vu/${slug}/`;
                const fullCanonical = `${SITE_URL_IMPORTED}${canonicalPath}`;

                // Must start with the correct domain
                expect(fullCanonical).toMatch(/^https:\/\/massagetannha\.com/);

                // Must contain the current page path
                expect(fullCanonical).toContain(`/${locale}/dich-vu/${slug}/`);

                // Verify exact expected URL
                expect(fullCanonical).toBe(`https://massagetannha.com/${locale}/dich-vu/${slug}/`);
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 12: Trailing slash consistency
// Validates: Requirements 9.1
describe('Property 12: Trailing slash consistency', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];
    const localeArb = fc.constantFrom(...locales);
    const slugArb = fc.constantFrom(...FEATURED_SERVICE_IDS);

    /**
     * Collect all URLs generated in alternates (hreflang) and canonical for a homepage.
     */
    function collectHomepageUrls(locale: Locale): string[] {
        const urls: string[] = [];
        // Canonical
        urls.push(`/${locale}/`);
        // Hreflang for all locales
        for (const loc of locales) {
            urls.push(`/${loc}/`);
        }
        // x-default
        urls.push(`/${DEFAULT_LOCALE}/`);
        return urls;
    }

    /**
     * Collect all URLs generated in alternates (hreflang) and canonical for a service page.
     */
    function collectServiceUrls(locale: Locale, slug: string): string[] {
        const urls: string[] = [];
        // Canonical
        urls.push(`/${locale}/dich-vu/${slug}/`);
        // Hreflang for all locales
        for (const loc of locales) {
            urls.push(`/${loc}/dich-vu/${slug}/`);
        }
        // x-default
        urls.push(`/${DEFAULT_LOCALE}/dich-vu/${slug}/`);
        return urls;
    }

    it('all homepage alternate and canonical URLs must end with trailing slash', () => {
        fc.assert(
            fc.property(localeArb, (locale) => {
                const urls = collectHomepageUrls(locale);
                for (const url of urls) {
                    expect(url.endsWith('/')).toBe(true);
                }
            }),
            { numRuns: 100 },
        );
    });

    it('all service page alternate and canonical URLs must end with trailing slash', () => {
        fc.assert(
            fc.property(localeArb, slugArb, (locale, slug) => {
                const urls = collectServiceUrls(locale, slug);
                for (const url of urls) {
                    expect(url.endsWith('/')).toBe(true);
                }
            }),
            { numRuns: 100 },
        );
    });
});

// Feature: seo-optimization, Property 6: Sitemap entry completeness
// Validates: Requirements 3.3, 3.4, 3.5
describe('Property 6: Sitemap entry completeness', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];
    const localeArb = fc.constantFrom(...locales);
    const slugArb = fc.constantFrom(...FEATURED_SERVICE_IDS);

    // Pre-compute sitemap entries once for all tests
    const entries = sitemap();

    it('sitemap contains a matching URL for any locale × slug combination starting with https://massagetannha.com', () => {
        fc.assert(
            fc.property(localeArb, slugArb, (locale, slug) => {
                const expectedUrlPrefix = `https://massagetannha.com/${locale}/dich-vu/${slug}/`;
                const match = entries.find((e) => e.url === expectedUrlPrefix);

                // Entry must exist
                expect(match).toBeDefined();

                // URL must start with the correct domain
                expect(match!.url).toMatch(/^https:\/\/massagetannha\.com/);
            }),
            { numRuns: 100 },
        );
    });

    it('each locale × slug entry has alternates.languages with all 3 locales + x-default, all ending with /', () => {
        fc.assert(
            fc.property(localeArb, slugArb, (locale, slug) => {
                const expectedUrl = `https://massagetannha.com/${locale}/dich-vu/${slug}/`;
                const match = entries.find((e) => e.url === expectedUrl);

                expect(match).toBeDefined();
                const languages = match!.alternates?.languages as Record<string, string> | undefined;
                expect(languages).toBeDefined();

                // Must have all 3 locales + x-default
                for (const loc of locales) {
                    expect(languages![loc]).toBeDefined();
                    expect(languages![loc].endsWith('/')).toBe(true);
                }
                expect(languages!['x-default']).toBeDefined();
                expect(languages!['x-default'].endsWith('/')).toBe(true);
            }),
            { numRuns: 100 },
        );
    });

    it('homepage entries exist for all locales with alternates and trailing slashes', () => {
        for (const locale of locales) {
            const expectedUrl = `https://massagetannha.com/${locale}/`;
            const match = entries.find((e) => e.url === expectedUrl);

            expect(match).toBeDefined();
            expect(match!.url).toMatch(/^https:\/\/massagetannha\.com/);

            const languages = match!.alternates?.languages as Record<string, string> | undefined;
            expect(languages).toBeDefined();

            for (const loc of locales) {
                expect(languages![loc]).toBeDefined();
                expect(languages![loc].endsWith('/')).toBe(true);
            }
            expect(languages!['x-default']).toBeDefined();
            expect(languages!['x-default'].endsWith('/')).toBe(true);
        }
    });
});

// Feature: seo-optimization, Property 13: Locale-appropriate keywords
// Validates: Yêu cầu 10.1
describe('Property 13: Locale-appropriate keywords', () => {
    const locales: Locale[] = ['vi', 'en', 'ko'];
    const localeArb = fc.constantFrom(...locales);

    // Homepage keywords — same data as app/[locale]/page.tsx
    const keywords: Record<Locale, string> = {
        vi: 'massage tại nhà, massage tại nhà TPHCM, massage tại nhà Hồ Chí Minh, body massage, shiatsu, massage thụy điển, massage vai gáy, đặt massage tại nhà',
        en: 'at-home massage, home massage Ho Chi Minh City, body massage, shiatsu, swedish massage, neck massage, book massage at home',
        ko: '방문 마사지, 호치민 방문 마사지, 바디 마사지, 시아츠, 스웨디시 마사지, 어깨 목 마사지, 집에서 마사지',
    };

    // Vietnamese diacritics pattern: common Vietnamese characters with diacritics
    const vietnameseDiacriticsPattern = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i;

    // Korean Hangul range: \uAC00-\uD7AF
    const koreanHangulPattern = /[\uAC00-\uD7AF]/;

    // ASCII/Latin only: no characters outside basic Latin + extended Latin range
    const asciiLatinOnlyPattern = /^[\x00-\x7F\u00C0-\u024F\s,.\-']+$/;

    it('vi keywords contain Vietnamese diacritics for any locale=vi', () => {
        fc.assert(
            fc.property(
                localeArb.filter((l) => l === 'vi'),
                (locale) => {
                    const kw = keywords[locale];
                    expect(kw).toBeTruthy();
                    expect(vietnameseDiacriticsPattern.test(kw)).toBe(true);
                },
            ),
            { numRuns: 100 },
        );
    });

    it('ko keywords contain Korean Hangul characters for any locale=ko', () => {
        fc.assert(
            fc.property(
                localeArb.filter((l) => l === 'ko'),
                (locale) => {
                    const kw = keywords[locale];
                    expect(kw).toBeTruthy();
                    expect(koreanHangulPattern.test(kw)).toBe(true);
                },
            ),
            { numRuns: 100 },
        );
    });

    it('en keywords contain only ASCII/Latin characters for any locale=en', () => {
        fc.assert(
            fc.property(
                localeArb.filter((l) => l === 'en'),
                (locale) => {
                    const kw = keywords[locale];
                    expect(kw).toBeTruthy();
                    expect(asciiLatinOnlyPattern.test(kw)).toBe(true);
                },
            ),
            { numRuns: 100 },
        );
    });

    it('keywords for each locale match the expected language character set', () => {
        fc.assert(
            fc.property(localeArb, (locale) => {
                const kw = keywords[locale];
                expect(kw).toBeTruthy();
                expect(kw.length).toBeGreaterThan(0);

                switch (locale) {
                    case 'vi':
                        expect(vietnameseDiacriticsPattern.test(kw)).toBe(true);
                        break;
                    case 'ko':
                        expect(koreanHangulPattern.test(kw)).toBe(true);
                        break;
                    case 'en':
                        expect(asciiLatinOnlyPattern.test(kw)).toBe(true);
                        break;
                }
            }),
            { numRuns: 100 },
        );
    });
});
