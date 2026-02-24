// Zalo link utility – uses global config
import config from '@/global-config';

const raw = config.phoneNumber.replace(/\s/g, '').replace(/^0/, '84');
export const ZALO_PHONE = raw.startsWith('84') ? `+${raw}` : `+84${raw}`;
export const ZALO_LINK = config.zalo;
export const HOTLINE_LINK = `tel:${config.phoneNumber.replace(/\s/g, '')}`;

// Open Zalo with fallback
export function openZalo(serviceName?: string, locale?: string) {
  // Try deep link first on mobile
  if (typeof window !== 'undefined') {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Try Zalo deep link
      const deepLink = `zalo://chat?phone=${ZALO_PHONE.replace(/\D/g, '')}`;
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = deepLink;
      document.body.appendChild(iframe);
      
      // Fallback after 500ms if deep link fails
      setTimeout(() => {
        document.body.removeChild(iframe);
        window.open(ZALO_LINK, '_blank');
      }, 500);
    } else {
      // Desktop: open web version
      window.open(ZALO_LINK, '_blank');
    }
    
    // Track event (if GA4 is available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_zalo', {
        service_name: serviceName || 'general',
        locale: locale || 'vi',
        page: window.location.pathname,
      });
    }
  }
}
