'use client';

import config from '@/global-config';
import { useInView } from '@/lib/useInView';

interface BenefitsProps {
  translations: any;
}

export default function Benefits({ translations }: BenefitsProps) {
  const title = (translations.benefits.title || '').replace(/\{name\}/g, config.nameWebsite);
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>();

  const benefits = [
    translations.benefits.professional,
    translations.benefits.punctual,
    translations.benefits.private,
  ];

  const icons = ['🤲', '✨', '🌿'];

  return (
    <section className="py-20 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-6xl" ref={sectionRef}>
        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-center text-text mb-12 ${
            isInView ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {title}
        </h2>

        {/* Staggered cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit: any, index: number) => (
            <div
              key={index}
              className={`group bg-card rounded-xl p-6 shadow-md border border-transparent
                hover:shadow-2xl hover:-translate-y-2 hover:border-primary-500/30
                transition-all duration-300 text-center cursor-default
                ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${100 + index * 100}ms` }}
            >
              {/* Icon with scale on hover */}
              <div className="text-4xl mb-4 inline-block group-hover:scale-125 transition-transform duration-300 select-none">
                {icons[index]}
              </div>
              <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {benefit.title}
              </h3>
              <p className="text-text-muted">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
