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
  const [isScrolled, setIsScrolled] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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

  useEffect(() => {
    function onScroll() { setIsScrolled(window.scrollY > 12); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkCls =
    'px-3 py-1.5 rounded-full text-sm font-medium text-primary-600 hover:bg-accent/70 hover:text-primary-700 transition-all duration-200 whitespace-nowrap';

  return (
    <>
      {/* Outer wrapper: sticky, pointer-events-none so transparent padding is click-through */}
      <header className="sticky top-0 z-50 w-full pointer-events-none">
        <div className="px-3 sm:px-6 pt-4 pb-2">
          {/* Floating pill nav */}
          <nav
            className={`pointer-events-auto relative max-w-5xl mx-auto rounded-full flex items-center h-14 px-3 transition-all duration-500 ${isScrolled
              ? 'bg-card/95 backdrop-blur-md border border-border/50 shadow-2xl'
              : 'bg-transparent border border-transparent shadow-none'
              }`}
          >
            {/* ── Left side: flex-1 keeps logo absolutely centered ── */}
            <div className="flex items-center gap-0.5 flex-1">
              {/* Mobile logo — shown only on mobile, positioned left */}
              <Link
                href={`/${currentLocale}`}
                className="md:hidden flex items-center group outline-none"
              >
                <div className={`rounded-xl flex items-center transition-all duration-500 ${
                  isScrolled
                    ? 'bg-card shadow-sm border border-border/40 px-2 py-1'
                    : 'bg-white/90 shadow-md border border-white/40 px-2 py-1'
                }`}>
                  <img
                    src={config.logo}
                    alt={config.nameWebsite}
                    className="h-8 w-auto object-contain"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                    }}
                  />
                </div>
              </Link>

              {/* Desktop left links */}
              <div className="hidden md:flex items-center gap-0.5">
                <Link href={`/${currentLocale}`} className={linkCls}>
                  {translations.header.home}
                </Link>
                <a href="#services" onClick={scrollToSection('services')} className={linkCls}>
                  {translations.header.services}
                </a>
                <a href="#faq" onClick={scrollToSection('faq')} className={linkCls}>
                  {translations.header.faq}
                </a>
              </div>
            </div>

            {/* ── Center logo: desktop only, enlarged at top, compact when scrolled ── */}
            <div
              className={`hidden md:block absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${isScrolled ? '-translate-y-1/2 top-1/2' : 'top-1/2 -translate-y-1/2'
                }`}
            >
              <Link
                href={`/${currentLocale}`}
                className="flex flex-col items-center group outline-none"
              >
                <div className={`rounded-2xl flex flex-col items-center transition-all duration-500 ${isScrolled
                  ? 'bg-card shadow-sm border border-border/40 px-2.5 py-1.5 gap-0'
                  : 'bg-white/90 shadow-xl border border-white/40 px-2.5 py-2 gap-1 group-hover:shadow-2xl group-hover:-translate-y-0.5'
                  }`}>
                  <img
                    src={config.logo}
                    alt={config.nameWebsite}
                    className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-8' : 'h-14'
                      }`}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* ── Right side: flex-1 keeps logo absolutely centered ── */}
            <div className="flex items-center flex-1 justify-end">
              {/* Desktop right links + lang + CTA */}
              <div className="hidden md:flex items-center gap-1.5">
                <a href="#contact" onClick={scrollToSection('contact')} className={linkCls}>
                  {translations.header.contact}
                </a>

                {/* Language dropdown */}
                <div className="relative" ref={langDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsLangOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-border/60 text-primary-600 hover:bg-accent/70 transition-all duration-200"
                    aria-expanded={isLangOpen}
                    aria-haspopup="listbox"
                    aria-label="Select language"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span>{localeOptions[currentLocale].code}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isLangOpen && (
                    <ul
                      className="absolute right-0 top-full mt-2 py-1 w-52 rounded-2xl border border-border bg-card shadow-xl z-50 overflow-hidden"
                      role="listbox"
                    >
                      {locales.map((loc) => {
                        const opt = localeOptions[loc];
                        const isActive = loc === currentLocale;
                        return (
                          <li key={loc} role="option" aria-selected={isActive}>
                            <Link
                              href={`/${loc}`}
                              onClick={() => setIsLangOpen(false)}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${isActive
                                ? 'bg-accent text-primary-600 font-medium'
                                : 'text-primary-600 hover:bg-accent/60'
                                }`}
                            >
                              <span className="text-base">{opt.flag}</span>
                              <span>{opt.code}</span>
                              <span className="ml-auto text-text-muted text-xs">{opt.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {/* Chat Zalo CTA */}
                <button
                  onClick={() => openZalo('header', currentLocale)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-background rounded-full hover:bg-primary-700 hover:scale-105 active:scale-95 transition-all duration-200 text-sm font-semibold shadow-md"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z" />
                  </svg>
                  {translations.header.chatZalo}
                </button>
              </div>

              {/* Mobile: Zalo icon + Hamburger */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={() => openZalo('header', currentLocale)}
                  className="p-2 bg-primary-600 text-background rounded-full hover:bg-primary-700 transition-colors"
                  aria-label="Chat Zalo"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 text-primary-600 hover:bg-accent/70 rounded-full transition-colors"
                  aria-label="Menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={closeMobileMenu} />
          <div className="fixed top-0 right-0 h-full w-72 bg-card z-50 md:hidden shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span className="text-lg font-bold text-primary-600">{config.nameWebsite}</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-accent/70 rounded-full transition-colors text-primary-600"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer links */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/${currentLocale}`}
                    onClick={closeMobileMenu}
                    className="px-4 py-3 rounded-full text-primary-600 hover:bg-accent/60 font-medium transition-colors"
                  >
                    {translations.header.home}
                  </Link>
                  <a href="#services" onClick={scrollToSection('services')} className="px-4 py-3 rounded-full text-primary-600 hover:bg-accent/60 font-medium transition-colors">
                    {translations.header.services}
                  </a>
                  <a href="#faq" onClick={scrollToSection('faq')} className="px-4 py-3 rounded-full text-primary-600 hover:bg-accent/60 font-medium transition-colors">
                    {translations.header.faq}
                  </a>
                  <a href="#contact" onClick={scrollToSection('contact')} className="px-4 py-3 rounded-full text-primary-600 hover:bg-accent/60 font-medium transition-colors">
                    {translations.header.contact}
                  </a>

                  {/* Language */}
                  <div className="pt-4 mt-2 border-t border-border">
                    <p className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wider px-4">Ngôn ngữ</p>
                    <div className="space-y-1">
                      {locales.map((loc) => {
                        const opt = localeOptions[loc];
                        const isActive = loc === currentLocale;
                        return (
                          <Link
                            key={loc}
                            href={`/${loc}`}
                            onClick={closeMobileMenu}
                            className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm transition-colors ${isActive
                              ? 'bg-accent text-primary-600 font-medium'
                              : 'text-primary-600 hover:bg-accent/60'
                              }`}
                          >
                            <span className="text-base">{opt.flag}</span>
                            <span className="font-medium">{opt.code}</span>
                            <span className="ml-auto text-text-muted text-xs">{opt.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button
                      onClick={() => { openZalo('header_mobile', currentLocale); closeMobileMenu(); }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-background rounded-full hover:bg-primary-700 transition-colors font-semibold"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z" />
                      </svg>
                      {translations.header.chatZalo}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
