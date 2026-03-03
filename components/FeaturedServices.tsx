'use client';

import { useInView } from '@/lib/useInView';
import { FEATURED_SERVICE_IDS, getFeaturedServiceImage } from '@/lib/featured_services';
import FeaturedServiceCard from './FeaturedServiceCard';
import { type Locale } from '@/lib/i18n';

interface FeaturedServicesProps {
  locale: Locale;
  translations: {
    featuredServices?: {
      title?: string;
      subtitle?: string;
      viewDetail?: string;
      tagIntensity?: string;
      tagGoal?: string;
      services?: Record<
        string,
        {
          name?: string;
          description?: string;
          bullets?: string[];
          tagIntensity?: string;
          tagGoal?: string;
        }
      >;
    };
  };
}

export default function FeaturedServices({ locale, translations }: FeaturedServicesProps) {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>();
  const fs = translations?.featuredServices ?? {};
  const title = fs.title ?? 'Dịch vụ nổi bật';
  const subtitle = fs.subtitle ?? 'Chọn liệu trình phù hợp mục tiêu: thư giãn – giảm đau mỏi – phục hồi năng lượng.';
  const viewDetailLabel = fs.viewDetail ?? 'Xem chi tiết';
  const services = fs.services ?? {};

  return (
    <section
      id="featured-services"
      className="py-20 px-4 bg-background overflow-hidden"
      aria-labelledby="featured-services-title"
    >
      <div className="container mx-auto max-w-6xl" ref={sectionRef}>
        <h2
          id="featured-services-title"
          className={`text-3xl md:text-4xl font-bold text-center text-text mb-4 ${isInView ? 'animate-fade-up' : 'opacity-0'
            }`}
        >
          {title}
        </h2>
        <p
          className={`text-center text-text-muted mb-10 max-w-2xl mx-auto ${isInView ? 'animate-fade-up' : 'opacity-0'
            }`}
          style={{ animationDelay: '80ms' }}
        >
          {subtitle}
        </p>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible md:snap-none -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 ${isInView ? 'animate-fade-up' : 'opacity-0'
            }`}
          style={{ animationDelay: '160ms' }}
        >
          {FEATURED_SERVICE_IDS.map((id, index) => {
            const s = services[id] ?? {};
            const tagIntensityLabel = fs.tagIntensity ?? 'Cường độ';
            const tagGoalLabel = fs.tagGoal ?? 'Mục tiêu';
            return (
              <div
                key={id}
                className="w-full"
              >
                <FeaturedServiceCard
                  id={id}
                  image={getFeaturedServiceImage(id)}
                  locale={locale}
                  name={s.name ?? id}
                  description={s.description ?? ''}
                  bullets={Array.isArray(s.bullets) ? s.bullets : []}
                  tagIntensity={s.tagIntensity ? `${tagIntensityLabel}: ${s.tagIntensity}` : tagIntensityLabel}
                  tagGoal={s.tagGoal ? `${tagGoalLabel}: ${s.tagGoal}` : tagGoalLabel}
                  viewDetailLabel={viewDetailLabel}
                  animDelay={index * 60}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
