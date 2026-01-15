'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Detect preferred language or default to 'vi'
    const savedLocale = localStorage.getItem('locale') || 'vi';
    router.replace(`/${savedLocale}`);
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-600">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
