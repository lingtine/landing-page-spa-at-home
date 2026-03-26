import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';

describe('Robots.txt output', () => {
    const result = robots();

    it('should set User-agent to *', () => {
        expect(result.rules).toBeDefined();
        const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
        expect(rules.userAgent).toBe('*');
    });

    it('should allow /', () => {
        const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
        expect(rules.allow).toBe('/');
    });

    it('should disallow /_next/', () => {
        const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
        expect(rules.disallow).toContain('/_next/');
    });

    it('should set sitemap to https://massagetannha.com/sitemap.xml', () => {
        expect(result.sitemap).toBe('https://massagetannha.com/sitemap.xml');
    });
});

import { OG_LOCALES, SITE_URL } from '@/lib/seo';
import { locales } from '@/lib/i18n';

/**
 * Validates: Requirements 1.5
 * OG locale mapping: vi→vi_VN, en→en_US, ko→ko_KR
 */
describe('OG locale mapping', () => {
    it('should map vi to vi_VN', () => {
        expect(OG_LOCALES['vi']).toBe('vi_VN');
    });

    it('should map en to en_US', () => {
        expect(OG_LOCALES['en']).toBe('en_US');
    });

    it('should map ko to ko_KR', () => {
        expect(OG_LOCALES['ko']).toBe('ko_KR');
    });
});

/**
 * Validates: Requirements 2.4
 * metadataBase must be https://massagetannha.com
 */
describe('metadataBase', () => {
    it('should equal https://massagetannha.com', () => {
        expect(SITE_URL).toBe('https://massagetannha.com');
    });
});

/**
 * Validates: Requirements 7.3
 * HTML lang attribute: locales are valid BCP 47 tags and cover vi, en, ko
 */
describe('HTML lang attribute', () => {
    it('should support vi, en, ko locales', () => {
        expect(locales).toContain('vi');
        expect(locales).toContain('en');
        expect(locales).toContain('ko');
    });

    it('each locale should be a valid BCP 47 language tag', () => {
        const bcp47 = /^[a-z]{2,3}$/;
        for (const locale of locales) {
            expect(locale).toMatch(bcp47);
        }
    });
});
