'use client';

import { useInView } from '@/lib/useInView';

interface StepsProps {
  translations: any;
}

export default function Steps({ translations }: StepsProps) {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>();

  const steps = [
    translations.steps.step1,
    translations.steps.step2,
    translations.steps.step3,
  ];

  return (
    <section className="py-20 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-4xl" ref={sectionRef}>
        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-center text-text mb-12 ${
            isInView ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {translations.steps.title}
        </h2>

        {/* Steps: staggered fade-up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step: any, index: number) => (
            <div
              key={index}
              className={`group text-center ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${100 + index * 130}ms` }}
            >
              {/* Circle: scale + glow on hover */}
              <div className="w-16 h-16 bg-primary-600 text-background rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-600/30 transition-all duration-300">
                {index + 1}
              </div>

              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute" aria-hidden />
              )}

              <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
