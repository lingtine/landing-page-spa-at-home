# Kế hoạch Triển khai: Tối ưu SEO cho massagetannha.com

## Tổng quan

Triển khai tối ưu SEO toàn diện cho website Iku Massage, bao gồm: cập nhật metadata, tạo sitemap/robots, sinh JSON-LD, dynamic HTML lang, tối ưu hình ảnh, và thiết lập testing. Tất cả thay đổi phải tương thích với `output: 'export'` (static export) của Next.js.

## Tasks

- [x] 1. Tạo module SEO helpers và cập nhật cấu hình cơ bản
  - [x] 1.1 Tạo file `lib/seo.ts` với constants và helper functions
    - Định nghĩa `SITE_URL = 'https://massagetannha.com'`, `OG_LOCALES`, `DEFAULT_LOCALE`
    - Implement hàm `generateBusinessJsonLd(locale, translations)` trả về JSON-LD `HealthAndBeautyBusiness` với đầy đủ fields (name, description, telephone, email, address, url, priceRange, areaServed, serviceType) — url phải là `${SITE_URL}/${locale}/`, không được `undefined`
    - Implement hàm `generateFAQJsonLd(translations)` trả về JSON-LD `FAQPage` từ translations.faq
    - Implement hàm `generateServiceJsonLd(locale, serviceName, serviceDescription)` trả về JSON-LD `Service` với provider tham chiếu HealthAndBeautyBusiness
    - Implement hàm `generateBreadcrumbJsonLd(locale, items)` trả về JSON-LD `BreadcrumbList` với position tăng dần
    - Sử dụng dữ liệu từ `global-config.ts` cho thông tin doanh nghiệp
    - _Yêu cầu: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 10.3_

  - [x] 1.2 Viết property test cho `generateBusinessJsonLd`
    - **Property 7: Business JSON-LD completeness**
    - **Validates: Yêu cầu 5.1, 5.5**

  - [x] 1.3 Viết property test cho `generateFAQJsonLd`
    - **Property 9: FAQ JSON-LD completeness**
    - **Validates: Yêu cầu 5.3**

  - [x] 1.4 Viết property test cho `generateServiceJsonLd`
    - **Property 8: Service JSON-LD completeness**
    - **Validates: Yêu cầu 5.2**

  - [x] 1.5 Viết property test cho `generateBreadcrumbJsonLd`
    - **Property 10: Breadcrumb JSON-LD on service pages**
    - **Validates: Yêu cầu 5.4**

  - [x] 1.6 Viết property test cho JSON-LD locale-awareness
    - **Property 11: JSON-LD locale-awareness**
    - **Validates: Yêu cầu 5.6, 10.3**

- [x] 2. Checkpoint — Đảm bảo tất cả tests pass
  - Đảm bảo tất cả tests pass, hỏi người dùng nếu có thắc mắc.

- [x] 3. Cập nhật metadata và hreflang cho layout và các trang
  - [x] 3.1 Cập nhật `app/[locale]/layout.tsx` — sửa `metadataBase` thành `https://massagetannha.com`, thêm hreflang alternates đầy đủ (vi, en, ko, x-default → /vi/)
    - Chuyển `<html>` và `<body>` tags từ `app/layout.tsx` vào `app/[locale]/layout.tsx` để set `lang={params.locale}` động
    - `app/layout.tsx` chỉ còn render `{children}` (không có `<html>`, `<body>`)
    - _Yêu cầu: 2.1, 2.2, 2.3, 2.4, 7.3_

  - [x] 3.2 Cập nhật `app/[locale]/page.tsx` — thêm `og:image`, `og:url` vào Open Graph metadata, đảm bảo canonical URL đúng domain
    - Thêm `metadataBase` override nếu cần
    - Thay thế inline JSON-LD bằng `generateBusinessJsonLd` và `generateFAQJsonLd` từ `lib/seo.ts`
    - _Yêu cầu: 1.1, 1.2, 1.3, 1.4, 1.5, 2.3, 5.1, 5.3, 10.4_

  - [x] 3.3 Cập nhật `app/[locale]/dich-vu/[slug]/page.tsx` — thêm hreflang alternates cho cùng slug trên tất cả locale, thêm `og:image`, `og:url`, keywords
    - Thêm JSON-LD `Service` và `BreadcrumbList` bằng `generateServiceJsonLd` và `generateBreadcrumbJsonLd`
    - Đảm bảo title ≤ 60 ký tự, description ≤ 155 ký tự
    - _Yêu cầu: 1.1, 1.2, 1.3, 1.4, 1.5, 2.5, 5.2, 5.4, 10.4_

  - [x] 3.4 Viết property tests cho metadata
    - **Property 1: Metadata length constraints**
    - **Property 2: Service title contains service name and brand**
    - **Property 3: Metadata completeness**
    - **Validates: Yêu cầu 1.1, 1.2, 1.3, 1.4, 10.4**

  - [x] 3.5 Viết property tests cho hreflang và canonical
    - **Property 4: Hreflang completeness**
    - **Property 5: Canonical URL correctness**
    - **Property 12: Trailing slash consistency**
    - **Validates: Yêu cầu 2.1, 2.2, 2.3, 2.4, 2.5, 9.1**

- [x] 4. Tạo sitemap.xml và robots.txt
  - [x] 4.1 Tạo file `app/sitemap.ts` — sinh sitemap.xml tại build time
    - Bao gồm trang chủ cho mỗi locale (`/vi/`, `/en/`, `/ko/`) với priority 1.0
    - Bao gồm trang dịch vụ cho mỗi locale × slug (4 dịch vụ × 3 locale = 12 URL) với priority 0.8
    - Mỗi entry có `alternates.languages` cho tất cả locale + x-default
    - Tất cả URL bắt đầu bằng `https://massagetannha.com` và kết thúc bằng `/`
    - _Yêu cầu: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 4.2 Tạo file `app/robots.ts` — sinh robots.txt tại build time
    - `User-agent: *`, `Allow: /`, `Disallow: /_next/`
    - Sitemap URL: `https://massagetannha.com/sitemap.xml`
    - _Yêu cầu: 4.1, 4.2, 4.3, 4.4_

  - [x] 4.3 Viết property test cho sitemap
    - **Property 6: Sitemap entry completeness**
    - **Validates: Yêu cầu 3.3, 3.4, 3.5**

  - [x] 4.4 Viết unit tests cho robots.txt output
    - Verify exact content: User-agent, Allow, Disallow, Sitemap URL
    - _Yêu cầu: 4.1, 4.2, 4.3, 4.4_

- [x] 5. Checkpoint — Đảm bảo tất cả tests pass
  - Đảm bảo tất cả tests pass, hỏi người dùng nếu có thắc mắc.

- [x] 6. Tối ưu hình ảnh và cấu trúc HTML ngữ nghĩa
  - [x] 6.1 Cập nhật `app/[locale]/dich-vu/[slug]/page.tsx` — thay `<img>` bằng Next.js `<Image>` component
    - Thêm `width`, `height`, `sizes` phù hợp
    - Alt text lấy từ tên dịch vụ theo locale hiện tại
    - Sử dụng `loading="lazy"` (mặc định của Next.js Image)
    - Bọc nội dung dịch vụ trong thẻ `<article>` (đã có)
    - _Yêu cầu: 6.1, 6.2, 6.4, 6.5, 7.5, 8.2_

  - [x] 6.2 Cập nhật `components/Hero.tsx` — đảm bảo hero banner có `priority`, `sizes="100vw"`, alt text theo locale
    - _Yêu cầu: 6.3, 8.2_

  - [x] 6.3 Cập nhật `components/FeaturedServiceCard.tsx` — thêm `width`, `height`, `loading="lazy"`, alt text theo locale
    - _Yêu cầu: 6.1, 6.2, 6.4_

  - [x] 6.4 Đảm bảo cấu trúc HTML ngữ nghĩa trên trang chủ
    - Kiểm tra và đảm bảo mỗi trang có đúng 1 thẻ `<h1>`
    - Đảm bảo heading hierarchy hợp lệ (h1 → h2 → h3)
    - Đảm bảo `<main>` bao bọc nội dung chính, `<nav>` cho navigation
    - _Yêu cầu: 7.1, 7.2, 7.4_

- [x] 7. Cài đặt testing framework và viết unit tests
  - [x] 7.1 Cài đặt `fast-check` và `vitest` vào devDependencies, tạo cấu hình vitest
    - Tạo `vitest.config.ts` với path aliases tương thích `tsconfig.json`
    - Thêm script `"test": "vitest --run"` vào `package.json`
    - _Yêu cầu: (hỗ trợ testing)_

  - [x] 7.2 Viết unit tests cho OG locale mapping, metadataBase, HTML lang
    - Verify vi→vi_VN, en→en_US, ko→ko_KR
    - Verify metadataBase = `https://massagetannha.com`
    - Verify HTML lang matches locale
    - _Yêu cầu: 1.5, 2.4, 7.3_

  - [x] 7.3 Viết property test cho locale-appropriate keywords
    - **Property 13: Locale-appropriate keywords**
    - **Validates: Yêu cầu 10.1**

- [x] 8. Final checkpoint — Đảm bảo tất cả tests pass
  - Đảm bảo tất cả tests pass, hỏi người dùng nếu có thắc mắc.

## Ghi chú

- Tasks đánh dấu `*` là optional, có thể bỏ qua để triển khai MVP nhanh hơn
- Mỗi task tham chiếu đến yêu cầu cụ thể để đảm bảo traceability
- Checkpoints giúp kiểm tra tiến độ từng giai đoạn
- Property tests sử dụng `fast-check` để validate correctness properties từ design document
- Tất cả code phải tương thích với `output: 'export'` (static export) của Next.js
