'use client';

import { useState } from 'react';
import { openZalo } from '@/lib/zalo';
import { type Locale } from '@/lib/i18n';
import ServiceModal from './ServiceModal';
import { useInView } from '@/lib/useInView';
import config from '@/global-config';

interface ServicePrice {
  mode: string;
  label: string;
  before_23_30: Record<string, number>;
  after_23_30: Record<string, number>;
  addons?: Record<string, number>;
}

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
  animDelay?: number;
  servicePrices?: ServicePrice[];
  currency?: string;
}

/** Format số thành dạng 449.000₫ */
const formatVND = (amount: number) => amount.toLocaleString('vi-VN') + '₫';

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
  animDelay = 0,
  servicePrices,
  currency,
}: ServiceCardProps) {
  /** Giá khởi điểm: chế độ random_ktv, 60 phút, trước 23:30 */
  const startingPrice = servicePrices?.find((p) => p.mode === 'random_ktv')?.before_23_30['60'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <>
      {/* Scroll-reveal wrapper */}
      <div
        ref={ref}
        className={isInView ? 'animate-fade-up' : 'opacity-0'}
        style={{ animationDelay: `${animDelay}ms` }}
      >
        {/* Card: hover lift + shadow */}
        <div className="bg-card rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-border group cursor-pointer h-full flex flex-col">
          {/* Image block: dùng logo chủ động khi chưa có ảnh thật */}
          <div
            className="relative w-full h-48 bg-background overflow-hidden"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={image ?? config.logo}
              alt={name}
              className={`w-full h-full transition-transform duration-500 ease-in-out ${
                image
                  ? 'object-cover group-hover:scale-110'
                  : 'object-contain p-6'
              }`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = config.logo;
                target.className = target.className
                  .replace('object-cover', 'object-contain')
                  .replace('group-hover:scale-110', '');
                target.onerror = null;
              }}
            />

            {/* Badge giá khởi điểm */}
            {startingPrice && (
              <span className="absolute top-3 left-3 bg-primary-600/90 text-background text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                Từ {formatVND(startingPrice)}
              </span>
            )}

            {/* Overlay: dark tint + label on hover */}
            <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold bg-primary-600/80 px-4 py-1.5 rounded-full backdrop-blur-sm">
                Xem chi tiết
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            {/* Title */}
            <h3
              className="text-xl font-semibold text-text mb-2 hover:text-primary-600 transition-colors duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              {name}
            </h3>
            <p className="text-text-muted mb-3 text-sm line-clamp-2">{description}</p>

            {/* Duration */}
            {duration && (
              <div className="mb-4 flex items-center text-sm text-text-muted">
                <svg className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{duration}</span>
              </div>
            )}

            {/* CTAs */}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                className="flex-1 px-4 py-2 bg-background text-text border border-border rounded-lg hover:bg-accent hover:border-primary-500 transition-all duration-200 font-medium text-sm"
              >
                Xem chi tiết
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); openZalo(serviceKey, locale); }}
                className="w-10 h-10 bg-primary-600 text-background rounded-lg hover:bg-primary-700 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg"
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
      </div>

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
        servicePrices={servicePrices}
        currency={currency}
      />
    </>
  );
}
