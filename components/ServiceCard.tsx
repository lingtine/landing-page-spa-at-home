'use client';

import { openZalo } from '@/lib/zalo';
import { type Locale } from '@/lib/i18n';

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
  return (
    <div className="bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-border">
      {/* Image */}
      {image && (
        <div className="relative w-full h-48 bg-background">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/400x300/E5E7EB/6B7280?text=${encodeURIComponent(name)}`;
              target.onerror = null; // Prevent infinite loop
            }}
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text mb-2">{name}</h3>
        <p className="text-text-muted mb-3 text-sm">{description}</p>
        
        {/* Details */}
        {details && (
          <p className="text-text-muted mb-4 text-sm leading-relaxed">{details}</p>
        )}
        
        {/* Features */}
        {features && features.length > 0 && (
          <div className="mb-4">
            <ul className="grid grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-text-muted">
                  <span className="text-primary-600 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Duration */}
        {duration && (
          <div className="mb-4 flex items-center text-sm text-text-muted">
            <span className="mr-2">⏱</span>
            <span>{duration}</span>
          </div>
        )}
        
        {/* CTA Button */}
        <button
          onClick={() => openZalo(serviceKey, locale)}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
