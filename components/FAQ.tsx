'use client';

import { useState } from 'react';
import { useInView } from '@/lib/useInView';

interface FAQProps {
  translations: any;
}

export default function FAQ({ translations }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>();

  const faqs = [
    translations.faq.q1,
    translations.faq.q2,
    translations.faq.q3,
    translations.faq.q4,
    translations.faq.q5,
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-3xl" ref={sectionRef}>
        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-center text-text mb-12 ${
            isInView ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {translations.faq.title}
        </h2>

        {/* Accordion items: staggered fade-up */}
        <div className="space-y-4">
          {faqs.map((faq: any, index: number) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-card rounded-xl shadow-md border border-transparent hover:border-primary-500/30 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                  isInView ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${80 + index * 80}ms` }}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/70 transition-colors duration-200 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-text group-hover:text-primary-600 transition-colors duration-200 pr-4">
                    {faq.question}
                  </span>
                  {/* Chevron: rotates 45deg when open */}
                  <span
                    className={`text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                    aria-hidden
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                {/* Answer: smooth height via max-height transition */}
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 py-4 text-text-muted border-t border-border leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
