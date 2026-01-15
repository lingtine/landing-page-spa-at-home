'use client';

import Link from 'next/link';
import { type Locale } from '@/lib/i18n';
import { openZalo } from '@/lib/zalo';

interface HeaderProps {
  translations: any;
  currentLocale: Locale;
}

export default function Header({ translations, currentLocale }: HeaderProps) {
  // Get alternate locale
  const alternateLocale: Locale = currentLocale === 'vi' ? 'en' : 'vi';
  const alternatePath = `/${alternateLocale}`;
  
  return (
    <header className="bg-dark text-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="text-2xl font-bold text-white">
            IDMassage
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href={`/${currentLocale}`}
              className="text-white/90 hover:text-white transition-colors"
            >
              {translations.header.home}
            </Link>
            <a 
              href={`#services`}
              className="text-white/90 hover:text-white transition-colors"
            >
              {translations.header.services}
            </a>
            <a 
              href={`#faq`}
              className="text-white/90 hover:text-white transition-colors"
            >
              {translations.header.faq}
            </a>
            <a 
              href={`#contact`}
              className="text-white/90 hover:text-white transition-colors"
            >
              {translations.header.contact}
            </a>
          </div>
          
          {/* Language Switch & CTA */}
          <div className="flex items-center space-x-4">
            {/* Language Switch */}
            <Link
              href={alternatePath}
              className="px-3 py-1 text-sm border border-white/20 rounded-md hover:bg-white/10 transition-colors text-white"
            >
              {alternateLocale.toUpperCase()}
            </Link>
            
            {/* Zalo CTA */}
            <button
              onClick={() => openZalo('header', currentLocale)}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              {translations.header.chatZalo}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden mt-4 pt-4 border-t border-white/20">
          <div className="flex flex-col space-y-2">
            <Link 
              href={`/${currentLocale}`}
              className="text-white/90 hover:text-white transition-colors py-1"
            >
              {translations.header.home}
            </Link>
            <a 
              href={`#services`}
              className="text-white/90 hover:text-white transition-colors py-1"
            >
              {translations.header.services}
            </a>
            <a 
              href={`#faq`}
              className="text-white/90 hover:text-white transition-colors py-1"
            >
              {translations.header.faq}
            </a>
            <a 
              href={`#contact`}
              className="text-white/90 hover:text-white transition-colors py-1"
            >
              {translations.header.contact}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
