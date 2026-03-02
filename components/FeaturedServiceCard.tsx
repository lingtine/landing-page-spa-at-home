'use client';

import Link from 'next/link';
import { openZalo } from '@/lib/zalo';
import { type Locale } from '@/lib/i18n';

interface FeaturedServiceCardProps {
  id: string;
  image: string;
  locale: Locale;
  name: string;
  description: string;
  bullets: string[];
  tagIntensity: string;
  tagGoal: string;
  viewDetailLabel: string;
  animDelay?: number;
  className?: string;
}

export default function FeaturedServiceCard({
  id,
  image,
  locale,
  name,
  description,
  bullets,
  tagIntensity,
  tagGoal,
  viewDetailLabel,
  animDelay = 0,
  className = '',
}: FeaturedServiceCardProps) {
  const href = `/${locale}/dich-vu/${id}`;

  return (
    <div
      className={`bg-card rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-border group h-full flex flex-col ${className}`}
      style={{ animationDelay: animDelay ? `${animDelay}ms` : undefined }}
    >
      <Link
        href={href}
        className="relative w-full aspect-[4/3] overflow-hidden bg-background block"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
          <span className="bg-primary-600/90 text-background text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {tagIntensity}
          </span>
          <span className="bg-primary-600/90 text-background text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {tagGoal}
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-text mb-2 hover:text-primary-600 transition-colors">
          <Link href={href} className="block">
            {name}
          </Link>
        </h3>
        <p className="text-text-muted text-sm mb-4 line-clamp-2">{description}</p>

        <ul className="space-y-1.5 mb-4 flex-1">
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start text-sm text-text-muted">
              <span className="text-primary-600 mr-2 mt-0.5 flex-shrink-0">✓</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 mt-auto">
          <Link
            href={href}
            className="flex-1 px-4 py-2.5 bg-background text-text border border-border rounded-lg hover:bg-accent hover:border-primary-500 transition-all duration-200 font-medium text-sm text-center"
          >
            {viewDetailLabel}
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openZalo(`featured_${id}`, locale);
            }}
            className="w-10 h-10 bg-primary-600 text-background rounded-lg hover:bg-primary-700 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg"
            aria-label={viewDetailLabel}
            title={viewDetailLabel}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
