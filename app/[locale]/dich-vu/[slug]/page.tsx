import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations, locales, type Locale } from '@/lib/i18n';
import { FEATURED_SERVICE_IDS, getFeaturedServiceImage, isFeaturedServiceSlug } from '@/lib/featured_services';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import config from '@/global-config';
import { ZALO_LINK } from '@/lib/zalo';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of FEATURED_SERVICE_IDS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

/** Rút gọn text cho meta description (khoảng 155 ký tự) */
function truncateForMeta(text: string, maxLen = 155): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 3).trim() + '...';
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const slug = params.slug;
  if (!isFeaturedServiceSlug(slug)) return { title: config.nameWebsite };

  const translations = await getTranslations(locale);
  const service = translations?.featuredServices?.services?.[slug];
  if (!service?.name) return { title: config.nameWebsite };

  const overview = (service as { detail?: { overview?: string } })?.detail?.overview ?? service.description ?? '';
  const title = `${service.name} | ${locale === 'vi' ? 'Dịch vụ massage' : locale === 'en' ? 'Massage services' : '마사지 서비스'} | ${config.nameWebsite}`;
  const description = truncateForMeta(overview);

  const ogLocales: Record<Locale, string> = {
    vi: 'vi_VN',
    en: 'en_US',
    ko: 'ko_KR',
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: ogLocales[locale],
    },
  };
}

export default async function DichVuSlugPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as Locale;
  const slug = params.slug;
  if (!isFeaturedServiceSlug(slug)) notFound();

  const translations = await getTranslations(locale);
  const fs = translations?.featuredServices ?? {};
  const service = fs.services?.[slug] as {
    name?: string;
    description?: string;
    tagIntensity?: string;
    tagGoal?: string;
    detail?: {
      overview?: string;
      benefits?: string[];
      suitableFor?: string[];
      procedure?: string;
      notes?: string;
      ctaText?: string;
    };
  } | undefined;

  if (!service?.name) notFound();

  const d = service.detail ?? {};
  const labels = {
    breadcrumbHome: fs.breadcrumbHome ?? 'Trang chủ',
    breadcrumbServices: fs.breadcrumbServices ?? 'Dịch vụ',
    sectionOverview: fs.sectionOverview ?? 'Tổng quan',
    sectionBenefits: fs.sectionBenefits ?? 'Lợi ích nổi bật',
    sectionSuitableFor: fs.sectionSuitableFor ?? 'Phù hợp với',
    sectionProcedure: fs.sectionProcedure ?? 'Quy trình tại nhà (tóm tắt)',
    sectionNotes: fs.sectionNotes ?? 'Lưu ý nhanh',
    ctaBook: fs.ctaBook ?? 'Đặt lịch',
    backToServices: fs.backToServices ?? 'Quay lại dịch vụ',
    tagIntensity: fs.tagIntensity ?? 'Cường độ',
    tagGoal: fs.tagGoal ?? 'Mục tiêu',
  };

  const image = getFeaturedServiceImage(slug);
  const benefits = d.benefits ?? [];
  const suitableFor = d.suitableFor ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header translations={translations} currentLocale={locale} />

      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <nav className="text-sm text-text-muted mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href={`/${locale}`} className="hover:text-primary-600 transition-colors">
                  {labels.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/${locale}#featured-services`} className="hover:text-primary-600 transition-colors">
                  {labels.breadcrumbServices}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-text font-medium" aria-current="page">
                {service.name}
              </li>
            </ol>
          </nav>

          <article>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-background mb-6">
              <img
                src={image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
              {service.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-accent/80 text-text text-xs font-semibold px-2.5 py-1 rounded-full">
                {labels.tagIntensity}: {service.tagIntensity ?? ''}
              </span>
              <span className="bg-accent/80 text-text text-xs font-semibold px-2.5 py-1 rounded-full">
                {labels.tagGoal}: {service.tagGoal ?? ''}
              </span>
            </div>

            <section className="mb-6">
              <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                {labels.sectionOverview}
              </h2>
              <p className="text-text-muted leading-relaxed">{d.overview ?? ''}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                {labels.sectionBenefits}
              </h2>
              <ul className="space-y-1.5">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-text-muted">
                    <span className="text-primary-600 mr-2 mt-0.5 flex-shrink-0">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                {labels.sectionSuitableFor}
              </h2>
              <ul className="space-y-1.5">
                {suitableFor.map((s, index) => (
                  <li key={index} className="flex items-start text-text-muted">
                    <span className="text-primary-500 mr-2 mt-0.5 flex-shrink-0">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                {labels.sectionProcedure}
              </h2>
              <p className="text-text-muted leading-relaxed">{d.procedure ?? ''}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                {labels.sectionNotes}
              </h2>
              <p className="text-text-muted leading-relaxed">{d.notes ?? ''}</p>
            </section>

            {d.ctaText && (
              <div className="p-4 bg-accent/40 rounded-lg border border-border mb-8">
                <p className="text-text text-sm leading-relaxed">{d.ctaText}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={ZALO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-background rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z" />
                </svg>
                {labels.ctaBook}
              </a>
              <Link
                href={`/${locale}#featured-services`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background text-text border border-border rounded-lg hover:bg-accent hover:border-primary-500 transition-colors font-medium"
              >
                {labels.backToServices}
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer translations={translations} locale={locale} />
    </div>
  );
}
