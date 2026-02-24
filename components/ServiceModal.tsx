'use client';

import { openZalo } from '@/lib/zalo';
import { type Locale } from '@/lib/i18n';
import config from '@/global-config';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  details?: string;
  duration?: string;
  features?: string[];
  image?: string;
  cta: string;
  locale: Locale;
  serviceKey: string;
}

export default function ServiceModal({
  isOpen,
  onClose,
  name,
  description,
  details,
  duration,
  features,
  image,
  cta,
  locale,
  serviceKey,
}: ServiceModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="sticky top-0 bg-card border-b border-border flex justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-background rounded-md transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image; fallback to logo when missing or error */}
          {(image || config.logo) && (
            <div className="relative w-full h-64 bg-background">
              <img
                src={image || config.logo}
                alt={name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = config.logo;
                  target.onerror = null;
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">{name}</h2>
            <p className="text-lg text-text-muted mb-4">{description}</p>
            
            {/* Details */}
            {details && (
              <div className="mb-6">
                <p className="text-text-muted leading-relaxed">{details}</p>
              </div>
            )}
            
            {/* Features */}
            {features && features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text mb-3">Tính năng nổi bật</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start text-text-muted">
                      <span className="text-primary-600 mr-2 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Duration */}
            {duration && (
              <div className="mb-6 flex items-center text-text-muted">
                <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{duration}</span>
              </div>
            )}
            
            {/* CTA Button */}
            <button
              onClick={() => {
                openZalo(serviceKey, locale);
                onClose();
              }}
              className="w-full px-6 py-3 bg-primary-600 text-background rounded-md hover:bg-primary-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
              </svg>
              {cta}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
