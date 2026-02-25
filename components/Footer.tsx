'use client';

import { openZalo, HOTLINE_LINK } from '@/lib/zalo';
import { type Locale } from '@/lib/i18n';
import config from '@/global-config';

interface FooterProps {
  translations: any;
  locale: Locale;
}

export default function Footer({ translations, locale }: FooterProps) {
  const t = translations.footer;

  /** Replace {name} placeholder with website name */
  const titleAbout = (t.titleAbout || '').replace(/\{name\}/g, config.nameWebsite);

  /** Smooth-scroll helper for anchor links */
  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-dark text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Col 1 – About */}
          <div>
            <h3 className="text-xl font-semibold mb-3">{titleAbout}</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">{t.tagline}</p>
            <p className="text-white/60 text-sm flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {config.address}
            </p>
          </div>

          {/* Col 2 – Quick navigation */}
          <div>
            <h3 className="text-xl font-semibold mb-3">{t.titleServices}</h3>
            <div className="space-y-2 text-white/75">
              <a
                href="#services"
                onClick={scrollTo('services')}
                className="flex items-center gap-2 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t.links.services}
              </a>
              <a
                href="#faq"
                onClick={scrollTo('faq')}
                className="flex items-center gap-2 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t.links.faq}
              </a>
              <a
                href="#contact"
                onClick={scrollTo('contact')}
                className="flex items-center gap-2 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t.links.contact}
              </a>
            </div>
          </div>

          {/* Col 3 – Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-3">{t.titleContact}</h3>
            <div className="space-y-3 text-white/75">
              <button
                onClick={() => openZalo('footer', locale)}
                className="flex items-center gap-2 hover:text-white transition-colors text-sm w-full text-left"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
                <span>{t.zalo}: {config.phoneNumber}</span>
              </button>
              <a
                href={HOTLINE_LINK}
                className="flex items-center gap-2 hover:text-white transition-colors text-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{t.hotline}: {config.phoneNumber}</span>
              </a>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors text-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{t.emailLabel}: {config.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/15 pt-6 text-center text-white/50 text-sm space-y-1">
          <p>{t.copyright} {config.nameWebsite}</p>
          <p>{t.license}</p>
        </div>
      </div>
    </footer>
  );
}
