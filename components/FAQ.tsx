'use client';

import { useState } from 'react';

interface FAQProps {
  translations: any;
}

export default function FAQ({ translations }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    translations.faq.q1,
    translations.faq.q2,
    translations.faq.q3,
    translations.faq.q4,
    translations.faq.q5,
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          {translations.faq.title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq: any, index: number) => (
            <div
              key={index}
              className="bg-card rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors"
              >
                <span className="font-semibold text-text">{faq.question}</span>
                <span className="text-primary-600 text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-border">
                  <p className="text-text-muted">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
