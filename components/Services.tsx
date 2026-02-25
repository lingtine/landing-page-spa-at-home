'use client';

import { type Locale } from '@/lib/i18n';
import { useInView } from '@/lib/useInView';
import { openZalo } from '@/lib/zalo';
import serviceData from '@/lib/data_service.json';

interface ServicesProps {
  translations: any;
  locale: Locale;
}

const DURATIONS = ['60', '90', '120'] as const;
const formatVND = (n: number) => n.toLocaleString('vi-VN') + '₫';

export default function Services({ translations, locale }: ServicesProps) {
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>();

  const randomKTV = serviceData.service_prices.find((p) => p.mode === 'random_ktv')!;
  const chooseKTV = serviceData.service_prices.find((p) => p.mode === 'choose_ktv')!;
  const addons = randomKTV.addons ?? {};

  return (
    <section id="services" className="py-20 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-3xl" ref={sectionRef}>

        {/* Tiêu đề */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-center text-text mb-4 ${
            isInView ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {translations.services.title}
        </h2>
        <p
          className={`text-center text-text-muted mb-10 ${
            isInView ? 'animate-fade-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '80ms' }}
        >
          Giá áp dụng cho dịch vụ massage
        </p>

        {/* Bảng giá */}
        <div
          className={`bg-card rounded-2xl shadow-lg border border-border overflow-hidden ${
            isInView ? 'animate-fade-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '160ms' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                {/* Tầng 1: nhóm cột */}
                <tr className="bg-accent/60">
                  <th
                    className="text-left px-5 py-3 text-text font-semibold border-r border-border"
                    rowSpan={2}
                  >
                    Thời lượng
                  </th>
                  <th
                    className="text-center px-4 py-2.5 text-primary-600 font-semibold border-r border-border"
                    colSpan={2}
                  >
                    KTV ngẫu nhiên
                  </th>
                  <th
                    className="text-center px-4 py-2.5 text-primary-700 font-semibold"
                    colSpan={2}
                  >
                    Chọn KTV
                  </th>
                </tr>
                {/* Tầng 2: khung giờ */}
                <tr className="bg-accent/30 text-xs text-text-muted">
                  <th className="px-4 py-2 text-center font-medium border-r border-border/60">Trước 23:30</th>
                  <th className="px-4 py-2 text-center font-medium border-r border-border">Sau 23:30</th>
                  <th className="px-4 py-2 text-center font-medium border-r border-border/60">Trước 23:30</th>
                  <th className="px-4 py-2 text-center font-medium">Sau 23:30</th>
                </tr>
              </thead>
              <tbody>
                {DURATIONS.map((min, idx) => (
                  <tr
                    key={min}
                    className={`${idx % 2 === 0 ? 'bg-card' : 'bg-background/60'} hover:bg-accent/20 transition-colors`}
                  >
                    <td className="px-5 py-3.5 font-semibold text-text border-r border-border">
                      {min} phút
                    </td>
                    <td className="px-4 py-3.5 text-center text-text border-r border-border/60">
                      {formatVND(randomKTV.before_23_30[min])}
                    </td>
                    <td className="px-4 py-3.5 text-center text-text-muted border-r border-border">
                      {formatVND(randomKTV.after_23_30[min])}
                    </td>
                    <td className="px-4 py-3.5 text-center font-semibold text-primary-600 border-r border-border/60">
                      {formatVND(chooseKTV.before_23_30[min])}
                    </td>
                    <td className="px-4 py-3.5 text-center font-medium text-primary-500">
                      {formatVND(chooseKTV.after_23_30[min])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ghi chú + phụ phí */}
          <div className="px-5 py-4 bg-background/50 border-t border-border space-y-1.5 text-xs text-text-muted">
            <p className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Giá sau 23:30 áp dụng cho các ca đặt lịch muộn.
            </p>
            {Object.entries(addons).map(([key, val]) => (
              <p key={key} className="flex items-center gap-2">
                <span className="text-primary-500 font-bold text-sm">+</span>
                {key === 'cao_gio_or_giac_hoi' ? 'Phụ phí Cao gió / Giác hơi' : key}:
                <span className="font-semibold text-text">{formatVND(val as number)}</span>
              </p>
            ))}
          </div>
        </div>

        {/* CTA đặt lịch */}
        <div
          className={`mt-8 text-center ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationDelay: '240ms' }}
        >
          <button
            onClick={() => openZalo('services', locale)}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 text-background rounded-full hover:bg-primary-700 hover:scale-105 active:scale-95 transition-all duration-200 font-semibold text-base shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.81-.96l-.27-.15-2.88.84.84-2.88-.15-.27C5.35 14.68 5 13.38 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
            </svg>
            Đặt lịch qua Zalo
          </button>
        </div>
      </div>
    </section>
  );
}
