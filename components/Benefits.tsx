interface BenefitsProps {
  translations: any;
}

export default function Benefits({ translations }: BenefitsProps) {
  const benefits = [
    translations.benefits.professional,
    translations.benefits.punctual,
    translations.benefits.private,
    translations.benefits.clean,
    translations.benefits.fast,
  ];

  const icons = ['👨‍⚕️', '⏰', '🏠', '✨', '⚡'];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          {translations.benefits.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit: any, index: number) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-4xl mb-4">{icons[index]}</div>
              <h3 className="text-xl font-semibold text-text mb-2">
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
