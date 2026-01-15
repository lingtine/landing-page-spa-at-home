'use client';

import { useState } from 'react';
import { openZalo } from '@/lib/zalo';
import { type Locale } from '@/lib/i18n';
import ServiceModal from './ServiceModal';

interface ServiceCardProps {
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

export default function ServiceCard({
  name,
  description,
  details,
  duration,
  features,
  image,
  cta,
  locale,
  serviceKey,
}: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-border">
        {/* Image - Clickable */}
        {image && (
          <div 
            className="relative w-full h-48 bg-background cursor-pointer group"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/400x300/E5E7EB/6B7280?text=${encodeURIComponent(name)}`;
                target.onerror = null;
              }}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium bg-black/50 px-3 py-1 rounded">Xem chi tiết</span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <h3 
            className="text-xl font-semibold text-text mb-2 cursor-pointer hover:text-primary-600 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            {name}
          </h3>
          <p className="text-text-muted mb-3 text-sm line-clamp-2">{description}</p>
          
          {/* Duration */}
          {duration && (
            <div className="mb-4 flex items-center text-sm text-text-muted">
              <svg className="w-4 h-4 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{duration}</span>
            </div>
          )}
          
          {/* CTA Buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="flex-1 px-4 py-2 bg-background text-text border border-border rounded-md hover:bg-background/80 transition-colors font-medium text-sm"
            >
              Xem chi tiết
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openZalo(serviceKey, locale);
              }}
              className="w-10 h-10 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center flex-shrink-0"
              aria-label={cta}
              title={cta}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        description={description}
        details={details}
        duration={duration}
        features={features}
        image={image}
        cta={cta}
        locale={locale}
        serviceKey={serviceKey}
      />
    </>
  );
}
