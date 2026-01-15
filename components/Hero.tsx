'use client';

import { openZalo, HOTLINE_LINK } from '@/lib/zalo';
import { type Locale } from '@/lib/i18n';

interface HeroProps {
  translations: any;
  locale: Locale;
}

export default function Hero({ translations, locale }: HeroProps) {
  return (
    <section className="bg-background py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 text-balance">
          {translations.hero.headline}
        </h1>
        <p className="text-lg md:text-xl text-text-muted mb-8 max-w-2xl mx-auto text-balance">
          {translations.hero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => openZalo('hero_primary', locale)}
            className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
            </svg>
            {translations.hero.ctaPrimary}
          </button>
          <a
            href={HOTLINE_LINK}
            className="px-8 py-4 bg-card text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-background transition-colors font-semibold text-lg flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {translations.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
