// i18n utility functions
export type Locale = 'vi' | 'en';

export const locales: Locale[] = ['vi', 'en'];
export const defaultLocale: Locale = 'vi';

// Load translations
export async function getTranslations(locale: Locale) {
  const messages = await import(`@/messages/${locale}.json`);
  return messages.default;
}

// Get locale from pathname
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment === 'en' || firstSegment === 'vi') {
    return firstSegment as Locale;
  }
  
  return defaultLocale;
}

// Get pathname without locale
export function getPathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment === 'en' || firstSegment === 'vi') {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}
