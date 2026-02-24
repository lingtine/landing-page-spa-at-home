'use client';

import { openZalo, HOTLINE_LINK } from '@/lib/zalo';
import { type Locale } from '@/lib/i18n';
import config from '@/global-config';

interface FooterProps {
  translations: any;
  locale: Locale;
}

export default function Footer({ translations, locale }: FooterProps) {
  return (
    <footer id="contact" className="bg-dark text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liên hệ</h3>
            <div className="space-y-3 text-white/80">
              <button
                onClick={() => openZalo('footer', locale)}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
                <span>{translations.footer.zalo}: {config.phoneNumber}</span>
              </button>
              <a
                href={HOTLINE_LINK}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{translations.footer.hotline}: {config.phoneNumber}</span>
              </a>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{translations.footer.emailLabel}: {config.email}</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liên kết nhanh</h3>
            <div className="space-y-2 text-white/80">
              <a href="#" className="block hover:text-white transition-colors">
                {translations.footer.links.about} {config.nameWebsite}
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                {translations.footer.links.technicians}
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                {translations.footer.links.privacy}
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                {translations.footer.links.terms}
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                {translations.footer.links.rules}
              </a>
            </div>
          </div>
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Thông tin công ty</h3>
            <div className="space-y-2 text-white/80 text-sm">
              <p>{translations.footer.company}</p>
              <p>{config.address}</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>{translations.footer.copyright}</p>
          <p className="mt-2">{translations.footer.license}</p>
        </div>
      </div>
    </footer>
  );
}
