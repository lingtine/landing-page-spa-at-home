'use client';

import Image from 'next/image';
import { useInView } from '@/lib/useInView';
import { openZalo } from '@/lib/zalo';
import type { Locale } from '@/lib/i18n';

/** Binocular/butterfly path: two circles overlapping, soft V-notch at bottom. ViewBox 0 0 400 220. */
const BINOCULAR_PATH =
  'M 0 100 A 95 95 0 0 1 95 195 L 175 195 Q 200 212 225 195 L 305 195 A 95 95 0 0 1 400 100 A 95 95 0 0 1 305 5 A 95 95 0 0 1 95 5 A 95 95 0 0 1 0 100 Z';

interface PremiumIntroProps {
  translations: Record<string, unknown>;
  locale: Locale;
}

export default function PremiumIntro({ translations, locale }: PremiumIntroProps) {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>();
  const t = (translations?.premiumIntro as Record<string, string>) ?? {};
  const headline = t.headline ?? '';
  const description = t.description ?? '';
  const ctaBook = t.ctaBook ?? 'Book an appointment';
  const imageAlt = t.imageAlt ?? 'Premium at-home spa experience';

  return (
    <section
      id="premium-intro"
      className="py-16 md:py-24 px-4 bg-white overflow-hidden"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-5xl flex flex-col items-center gap-12 md:gap-16">
        {/* Centered serif headline (2–3 lines) */}
        <h2
          className={`font-serif text-3xl md:text-4xl text-center text-text text-balance max-w-3xl whitespace-pre-line ${isInView ? 'animate-fade-up' : 'opacity-0'
            }`}
          style={{ animationDelay: '0ms' }}
        >
          {headline}
        </h2>

        {/* Large central image with binocular mask and 2px warm orange stroke */}
        <div
          className={`relative w-full max-w-2xl mx-auto ${isInView ? 'animate-fade-up' : 'opacity-0'
            }`}
          style={{ animationDelay: '100ms', aspectRatio: '400/220' }}
        >
          {/* Hidden SVG defs so clipPath is available to the div below */}
          <svg className="absolute w-0 h-0" aria-hidden>
            <defs>
              <clipPath id="binocular-premium" clipPathUnits="objectBoundingBox" >
                <path d="M 0.68 0.50
    A 0.34 0.44 0 1 0 0.00 0.50
    A 0.34 0.44 0 1 0 0.68 0.50
    Z M 1.00 0.50
    A 0.34 0.44 0 1 0 0.32 0.50
    A 0.34 0.44 0 1 0 1.00 0.50
    M 0.43 0.00 Q 0.50 0.11 0.57 0.00 L 0.57 0.09 Q 0.54 0.15 0.50 0.22 Q 0.46 0.15 0.43 0.09 Z
    M 0.43 1.00 Q 0.50 0.89 0.57 1.00 L 0.57 0.91 Q 0.54 0.85 0.50 0.78 Q 0.46 0.85 0.43 0.91 Z
    " />
              </clipPath>
            </defs>
          </svg>
          <div
            className="absolute inset-0 rounded overflow-hidden"
            style={{ clipPath: 'url(#binocular-premium)' }}
          >
            <Image
              src="/images/about_us.png"
              alt={imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 672px"
              priority={false}
            />
          </div>
          {/* Stroke overlay: same shape, 2px warm orange (primary-500) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 220"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <path
              d={BINOCULAR_PATH}
              fill="none"
              stroke="#88663C"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Two-column row: left paragraph, right outlined rounded CTA */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full max-w-4xl ${isInView ? 'animate-fade-up' : 'opacity-0'
            }`}
          style={{ animationDelay: '150ms' }}
        >
          <p className="text-text-muted text-base md:text-lg text-left">
            {description}
          </p>
          <div className="flex justify-start md:justify-end">
            <button
              type="button"
              onClick={() => openZalo('premium_intro', locale)}
              className="px-8 py-3.5 rounded-full border-2 border-primary-500 text-primary-600 font-semibold text-base hover:bg-primary-500/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {ctaBook}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
