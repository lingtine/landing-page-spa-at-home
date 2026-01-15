'use client';

import ServiceCard from './ServiceCard';
import { type Locale } from '@/lib/i18n';

interface ServicesProps {
  translations: any;
  locale: Locale;
}

export default function Services({ translations, locale }: ServicesProps) {
  const services = [
    {
      key: 'atHome',
      ...translations.services.atHome,
    },
    {
      key: 'atHotel',
      ...translations.services.atHotel,
    },
    {
      key: 'body',
      ...translations.services.body,
    },
    {
      key: 'neck',
      ...translations.services.neck,
    },
    {
      key: 'foot',
      ...translations.services.foot,
    },
    {
      key: 'hotStone',
      ...translations.services.hotStone,
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          {translations.services.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
