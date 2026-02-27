'use client';

import Image from 'next/image';
import { useInView } from '@/lib/useInView';

interface BenefitsProps {
  translations: any;
}

export default function Benefits({ translations }: BenefitsProps) {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>();
  const b = translations?.benefits ?? {};
  const headline = b.headline ?? '';
  const subheadline = b.subheadline ?? '';
  const reasonsTitle = b.reasonsTitle ?? '';
  const reasons: Array<{ title: string; description: string }> = Array.isArray(b.reasons) ? b.reasons : [];
  const commitment = b.commitment ?? '';
  const imageAlt = b.imageAlt ?? 'Why us';

  return (
    <section className="py-20 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-6xl" ref={sectionRef}>
        {/* Two columns: image left, content right; stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Left: why_us image */}
          <div
            className={`relative w-full aspect-[4/3] md:aspect-[3/4] rounded-xl overflow-hidden bg-card ${
              isInView ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            <Image
              src="/images/why_us.png"
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>

          {/* Right: headline, subheadline, 6 reasons, commitment */}
          <div className="flex flex-col gap-6">
            <h2
              className={`text-2xl md:text-3xl font-bold text-text ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '100ms' }}
            >
              {headline}
            </h2>
            <p
              className={`text-text-muted text-base md:text-lg ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '150ms' }}
            >
              {subheadline}
            </p>
            <h3
              className={`text-xl font-semibold text-text mt-2 ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              {reasonsTitle}
            </h3>
            <ul className="space-y-4">
              {reasons.map((item: { title: string; description: string }, index: number) => (
                <li
                  key={index}
                  className={`${isInView ? 'animate-fade-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${250 + index * 80}ms` }}
                >
                  <span className="font-semibold text-text">
                    {index + 1}) {item.title}
                  </span>
                  <p className="text-text-muted text-sm mt-1 ml-0 pl-0">{item.description}</p>
                </li>
              ))}
            </ul>
            <p
              className={`text-sm text-text-muted border-l-2 border-primary-500/50 pl-4 mt-2 ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${250 + reasons.length * 80}ms` }}
            >
              {commitment}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
