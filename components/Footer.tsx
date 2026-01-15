'use client';

import { openZalo, HOTLINE_LINK } from '@/lib/zalo';
import { type Locale } from '@/lib/i18n';

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
            <div className="space-y-2 text-text-muted">
              <button
                onClick={() => openZalo('footer', locale)}
                className="block hover:text-white transition-colors"
              >
                {translations.footer.zalo}: {translations.footer.phone}
              </button>
              <a
                href={HOTLINE_LINK}
                className="block hover:text-white transition-colors"
              >
                {translations.footer.hotline}: {translations.footer.phone}
              </a>
              <a
                href={`mailto:${translations.footer.email}`}
                className="block hover:text-white transition-colors"
              >
                {translations.footer.emailLabel}: {translations.footer.email}
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Liên kết nhanh</h3>
            <div className="space-y-2 text-text-muted">
              <a href="#" className="block hover:text-white transition-colors">
                {translations.footer.links.about}
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
            <div className="space-y-2 text-text-muted text-sm">
              <p>{translations.footer.company}</p>
              <p>{translations.footer.address}</p>
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
