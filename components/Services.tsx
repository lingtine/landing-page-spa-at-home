'use client';

import ServiceCard from './ServiceCard';
import { type Locale } from '@/lib/i18n';
import { useInView } from '@/lib/useInView';

interface ServicesProps {
  translations: any;
  locale: Locale;
}

export default function Services({ translations, locale }: ServicesProps) {
  const { ref: titleRef, isInView: titleVisible } = useInView<HTMLDivElement>();

  const services = [
    { key: 'atHome',    ...translations.services.atHome },
    { key: 'atHotel',   ...translations.services.atHotel },
    { key: 'body',      ...translations.services.body },
    { key: 'neck',      ...translations.services.neck },
    { key: 'foot',      ...translations.services.foot },
    { key: 'hotStone',  ...translations.services.hotStone },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Title: fade-up on scroll */}
        <div ref={titleRef}>
          <h2
            className={`text-3xl md:text-4xl font-bold text-center text-text mb-12 transition-none ${
              titleVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            {translations.services.title}
          </h2>
        </div>

        {/* Cards: staggered per column (0, 80, 160 ms) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.key}
              name={service.name}
              description={service.description}
              details={service.details}
              duration={service.duration}
              features={service.features}
              image={service.image}
              cta={service.cta}
              locale={locale}
              serviceKey={service.key}
              animDelay={(index % 3) * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
