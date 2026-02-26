'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from '@/lib/useInView';

interface ReviewItem {
  name: string;
  text: string;
}

interface ReviewsProps {
  translations: {
    reviews?: {
      title?: string;
      items?: ReviewItem[];
    };
  };
}

const AVATAR_ICON = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-md border border-border/50 text-center h-full flex flex-col">
      <div className="w-12 h-12 rounded-full bg-primary-600 text-background flex items-center justify-center mx-auto mb-4 flex-shrink-0">
        {AVATAR_ICON}
      </div>
      <p className="text-text-muted text-sm md:text-base leading-relaxed line-clamp-5 flex-grow">
        &ldquo;{item.text}&rdquo;
      </p>
      <p className="mt-4 font-medium text-primary-600 flex-shrink-0">{item.name}</p>
    </div>
  );
}

const GAP_PX = 16;

export default function Reviews({ translations }: ReviewsProps) {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidthPx, setCardWidthPx] = useState(280);
  const [isMobile, setIsMobile] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);

  const title = translations?.reviews?.title ?? '';
  const items: ReviewItem[] = translations?.reviews?.items ?? [];
  const count = items.length;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => {
      const w = el.offsetWidth;
      const mobile = !mq.matches;
      setIsMobile(mobile);
      setCardWidthPx(mobile ? w : (w - 2 * GAP_PX) / 3);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (count > 0 ? (i + 1) % count : 0));
  }, [count]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (count > 0 ? (i - 1 + count) % count : 0));
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [count, goNext]);

  if (!title || count === 0) return null;

  const stepPx = isMobile ? cardWidthPx : cardWidthPx + GAP_PX;
  const translatePx = -currentIndex * stepPx;

  return (
    <section
      className="py-20 px-4 bg-background overflow-hidden"
      aria-roledescription="carousel"
      aria-label={title}
    >
      <div className="container mx-auto max-w-6xl" ref={sectionRef}>
        <h2
          className={`text-3xl md:text-4xl font-bold text-center text-text mb-12 ${
            isInView ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {title}
        </h2>

        <div
          className={`relative ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationDelay: '100ms' }}
        >
          <div ref={viewportRef} className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                gap: isMobile ? 0 : GAP_PX,
                transform: `translateX(${translatePx}px)`,
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 min-w-0"
                  style={{ width: cardWidthPx }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                >
                  <ReviewCard item={item} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={goPrev}
              className="p-2 rounded-full text-primary-600 hover:bg-accent/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2 flex-wrap justify-center max-w-full" role="tablist" aria-label="Review navigation">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to review ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex-shrink-0 ${
                    index === currentIndex ? 'bg-primary-600' : 'bg-border hover:bg-primary-500/50'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              className="p-2 rounded-full text-primary-600 hover:bg-accent/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
