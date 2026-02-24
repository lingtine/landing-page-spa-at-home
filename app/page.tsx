'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { locales, defaultLocale } from '@/lib/i18n';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    const saved = localStorage.getItem('locale');
    const locale = saved && locales.includes(saved as 'vi' | 'en' | 'ko') ? saved : defaultLocale;
    router.replace(`/${locale}`);
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-text-muted">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
