'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { type Locale, locales } from '@/lib/i18n';
import { openZalo } from '@/lib/zalo';
import config from '@/global-config';

const localeOptions: Record<Locale, { code: string; flag: string; name: string }> = {
  en: { code: 'EN', flag: '🇺🇸', name: 'English' },
  vi: { code: 'VI', flag: '🇻🇳', name: 'Tiếng Việt' },
  ko: { code: 'KO', flag: '🇰🇷', name: '한국어' },
};

interface HeaderProps {
  translations: any;
  currentLocale: Locale;
}

export default function Header({ translations, currentLocale }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  /** Cuộn mượt tới section theo id; trên mobile đóng menu trước */
  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMobileMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-card text-primary-600 shadow-sm sticky top-0 z-50 border-b border-border">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${currentLocale}`} className="text-2xl font-bold text-primary-600">
              {config.nameWebsite}
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href={`/${currentLocale}`}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                {translations.header.home}
              </Link>
              <a
                href="#services"
                onClick={scrollToSection('services')}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                {translations.header.services}
              </a>
              <a
                href="#faq"
                onClick={scrollToSection('faq')}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                {translations.header.faq}
              </a>
              <a
                href="#contact"
                onClick={scrollToSection('contact')}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                {translations.header.contact}
              </a>
            </div>
            
            {/* Desktop Language Switch & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Select Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsLangOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-primary-500 rounded-md hover:bg-accent transition-colors text-primary-600 bg-card min-w-[7rem]"
                  aria-expanded={isLangOpen}
                  aria-haspopup="listbox"
                  aria-label="Select language"
                >
                  <span className="text-base" aria-hidden>{localeOptions[currentLocale].flag}</span>
                  <span>{localeOptions[currentLocale].code}</span>
                  <svg
                    className={`w-4 h-4 ml-auto transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isLangOpen && (
                  <ul
                    className="absolute right-0 top-full mt-1 py-1 w-56 rounded-lg border border-border bg-card shadow-lg z-50"
                    role="listbox"
                    aria-label="Language options"
                  >
                    {locales.map((loc) => {
                      const opt = localeOptions[loc];
                      const isActive = loc === currentLocale;
                      return (
                        <li key={loc} role="option" aria-selected={isActive}>
                          <Link
                            href={`/${loc}`}
                            onClick={() => setIsLangOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              isActive
                                ? 'bg-accent text-primary-600 font-medium'
                                : 'text-primary-600 hover:bg-accent/70'
                            }`}
                          >
                            <span className="text-lg">{opt.flag}</span>
                            <span>{opt.code}</span>
                            <span className="ml-auto text-text-muted">{opt.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Zalo CTA */}
              <button
                onClick={() => openZalo('header', currentLocale)}
                className="px-4 py-2 bg-primary-600 text-background rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                {translations.header.chatZalo}
              </button>
            </div>
            
            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => openZalo('header', currentLocale)}
                className="p-2 bg-primary-600 text-background rounded-md hover:bg-primary-700 transition-colors"
                aria-label="Chat Zalo"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-primary-600 hover:bg-accent rounded-md transition-colors"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-64 bg-card text-primary-600 z-50 md:hidden transform transition-transform duration-300 ease-in-out border-l border-border">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-xl font-bold">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col space-y-4">
                  <Link 
                    href={`/${currentLocale}`}
                    onClick={closeMobileMenu}
                    className="text-primary-600 hover:text-primary-700 transition-colors py-2"
                  >
                    {translations.header.home}
                  </Link>
                  <a
                    href="#services"
                    onClick={scrollToSection('services')}
                    className="text-primary-600 hover:text-primary-700 transition-colors py-2"
                  >
                    {translations.header.services}
                  </a>
                  <a
                    href="#faq"
                    onClick={scrollToSection('faq')}
                    className="text-primary-600 hover:text-primary-700 transition-colors py-2"
                  >
                    {translations.header.faq}
                  </a>
                  <a
                    href="#contact"
                    onClick={scrollToSection('contact')}
                    className="text-primary-600 hover:text-primary-700 transition-colors py-2"
                  >
                    {translations.header.contact}
                  </a>
                  
                  {/* Language Select (mobile): flag + code + name */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">Ngôn ngữ</p>
                    <div className="space-y-1 rounded-lg border border-border overflow-hidden">
                      {locales.map((loc) => {
                        const opt = localeOptions[loc];
                        const isActive = loc === currentLocale;
                        return (
                          <Link
                            key={loc}
                            href={`/${loc}`}
                            onClick={() => { closeMobileMenu(); }}
                            className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                              isActive ? 'bg-accent text-primary-600 font-medium' : 'hover:bg-accent/70 text-primary-600'
                            }`}
                          >
                            <span className="text-lg">{opt.flag}</span>
                            <span>{opt.code}</span>
                            <span className="ml-auto text-text-muted">{opt.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Zalo CTA */}
                  <button
                    onClick={() => {
                      openZalo('header_mobile', currentLocale);
                      closeMobileMenu();
                    }}
                    className="w-full px-4 py-2 bg-primary-600 text-background rounded-md hover:bg-primary-700 transition-colors font-medium"
                  >
                    {translations.header.chatZalo}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
