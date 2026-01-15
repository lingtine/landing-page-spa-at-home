interface StepsProps {
  translations: any;
}

export default function Steps({ translations }: StepsProps) {
  const steps = [
    translations.steps.step1,
    translations.steps.step2,
    translations.steps.step3,
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          {translations.steps.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step: any, index: number) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
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
