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
            className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            {translations.hero.ctaPrimary}
          </button>
          <a
            href={HOTLINE_LINK}
            className="px-8 py-4 bg-card text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-accent transition-colors font-semibold text-lg"
          >
            {translations.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
