'use client';

import Link from 'next/link';
import { useState } from 'react';
import { type Locale } from '@/lib/i18n';
import { openZalo } from '@/lib/zalo';

interface HeaderProps {
  translations: any;
  currentLocale: Locale;
}

export default function Header({ translations, currentLocale }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get alternate locale
  const alternateLocale: Locale = currentLocale === 'vi' ? 'en' : 'vi';
  const alternatePath = `/${alternateLocale}`;
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  return (
    <>
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
            
            {/* Desktop Language Switch & CTA */}
            <div className="hidden md:flex items-center space-x-4">
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
            
            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => openZalo('header', currentLocale)}
                className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                aria-label="Chat Zalo"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
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
          <div className="fixed top-0 right-0 h-full w-64 bg-dark text-white z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <span className="text-xl font-bold">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-white/10 rounded-md transition-colors"
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
                    className="text-white/90 hover:text-white transition-colors py-2"
                  >
                    {translations.header.home}
                  </Link>
                  <a 
                    href={`#services`}
                    onClick={closeMobileMenu}
                    className="text-white/90 hover:text-white transition-colors py-2"
                  >
                    {translations.header.services}
                  </a>
                  <a 
                    href={`#faq`}
                    onClick={closeMobileMenu}
                    className="text-white/90 hover:text-white transition-colors py-2"
                  >
                    {translations.header.faq}
                  </a>
                  <a 
                    href={`#contact`}
                    onClick={closeMobileMenu}
                    className="text-white/90 hover:text-white transition-colors py-2"
                  >
                    {translations.header.contact}
                  </a>
                  
                  {/* Language Switch */}
                  <div className="pt-4 border-t border-white/20">
                    <Link
                      href={alternatePath}
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors text-center"
                    >
                      {alternateLocale.toUpperCase()}
                    </Link>
                  </div>
                  
                  {/* Zalo CTA */}
                  <button
                    onClick={() => {
                      openZalo('header_mobile', currentLocale);
                      closeMobileMenu();
                    }}
                    className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium"
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
