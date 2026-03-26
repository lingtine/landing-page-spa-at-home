import type { MetadataRoute } from 'next';
import { SITE_URL, DEFAULT_LOCALE } from '@/lib/seo';
import { locales } from '@/lib/i18n';
import { FEATURED_SERVICE_IDS } from '@/lib/featured_services';

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    // Homepage entries: one per locale
    for (const locale of locales) {
        const url = `${SITE_URL}/${locale}/`;
        const languages: Record<string, string> = {};
        for (const l of locales) {
            languages[l] = `${SITE_URL}/${l}/`;
        }
        languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}/`;

        entries.push({
            url,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
            alternates: { languages },
        });
    }

    // Service page entries: one per locale × slug
    for (const slug of FEATURED_SERVICE_IDS) {
        for (const locale of locales) {
            const url = `${SITE_URL}/${locale}/dich-vu/${slug}/`;
            const languages: Record<string, string> = {};
            for (const l of locales) {
                languages[l] = `${SITE_URL}/${l}/dich-vu/${slug}/`;
            }
            languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}/dich-vu/${slug}/`;

            entries.push({
                url,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
                alternates: { languages },
            });
        }
    }

    return entries;
}
