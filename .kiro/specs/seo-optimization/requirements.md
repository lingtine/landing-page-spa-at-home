# Tài liệu Yêu cầu — Tối ưu SEO

## Giới thiệu

Tối ưu SEO toàn diện cho nền tảng web Iku Massage (https://massagetannha.com) — một website dịch vụ massage tại nhà tại TP.HCM, xây dựng bằng Next.js (static export) với hỗ trợ đa ngôn ngữ (Tiếng Việt, Tiếng Anh, Tiếng Hàn). Mục tiêu là cải thiện thứ hạng tìm kiếm trên Google, tăng lưu lượng truy cập tự nhiên (organic traffic), và đảm bảo các công cụ tìm kiếm có thể thu thập dữ liệu (crawl) và lập chỉ mục (index) đầy đủ nội dung đa ngôn ngữ.

## Thuật ngữ

- **Hệ_thống**: Toàn bộ nền tảng web Next.js tại massagetannha.com
- **Trang_chủ**: Trang landing page chính tại `/{locale}/`
- **Trang_dịch_vụ**: Trang chi tiết dịch vụ tại `/{locale}/dich-vu/{slug}/`
- **Metadata_Engine**: Module xử lý sinh metadata (title, description, Open Graph, v.v.) cho mỗi trang
- **Sitemap_Generator**: Module tự động sinh file sitemap.xml
- **Robots_Generator**: Module sinh file robots.txt
- **Schema_Engine**: Module sinh dữ liệu có cấu trúc JSON-LD (Schema.org)
- **i18n_SEO_Module**: Module xử lý các thẻ hreflang và canonical URL cho đa ngôn ngữ
- **Image_Optimizer**: Module xử lý tối ưu hình ảnh (alt text, lazy loading, kích thước)
- **Locale**: Mã ngôn ngữ hỗ trợ: `vi`, `en`, `ko`

## Yêu cầu

### Yêu cầu 1: Metadata động theo ngôn ngữ và trang

**User Story:** Là chủ doanh nghiệp, tôi muốn mỗi trang có metadata (title, description) phù hợp với ngôn ngữ và nội dung cụ thể, để công cụ tìm kiếm hiển thị kết quả chính xác cho từng thị trường.

#### Tiêu chí chấp nhận

1. THE Metadata_Engine SHALL sinh thẻ `<title>` duy nhất cho mỗi tổ hợp trang và Locale, với độ dài tối đa 60 ký tự
2. THE Metadata_Engine SHALL sinh thẻ `<meta name="description">` duy nhất cho mỗi tổ hợp trang và Locale, với độ dài tối đa 155 ký tự
3. WHEN một Trang_dịch_vụ được render, THE Metadata_Engine SHALL bao gồm tên dịch vụ, từ khóa liên quan và tên thương hiệu trong thẻ title
4. THE Metadata_Engine SHALL sinh thẻ Open Graph (`og:title`, `og:description`, `og:type`, `og:locale`, `og:image`, `og:url`) cho mỗi trang
5. WHEN Locale là `vi`, THE Metadata_Engine SHALL sử dụng `og:locale` có giá trị `vi_VN`; WHEN Locale là `en`, giá trị `en_US`; WHEN Locale là `ko`, giá trị `ko_KR`

### Yêu cầu 2: Thẻ hreflang và Canonical URL cho đa ngôn ngữ

**User Story:** Là chủ doanh nghiệp, tôi muốn Google hiểu rõ mối quan hệ giữa các phiên bản ngôn ngữ của cùng một trang, để tránh trùng lặp nội dung và hiển thị đúng phiên bản cho người dùng.

#### Tiêu chí chấp nhận

1. THE i18n_SEO_Module SHALL sinh thẻ `<link rel="alternate" hreflang="{locale}">` cho tất cả 3 Locale (vi, en, ko) trên mỗi trang
2. THE i18n_SEO_Module SHALL sinh thẻ `<link rel="alternate" hreflang="x-default">` trỏ đến phiên bản Tiếng Việt (`/vi/`) trên mỗi trang
3. THE i18n_SEO_Module SHALL sinh thẻ `<link rel="canonical">` trỏ đến URL đầy đủ (bao gồm domain) của trang hiện tại
4. THE i18n_SEO_Module SHALL sử dụng domain `https://massagetannha.com` làm metadataBase thay vì `https://idmassage.com` hiện tại
5. WHEN một Trang_dịch_vụ được render, THE i18n_SEO_Module SHALL sinh hreflang cho cùng slug dịch vụ trên tất cả Locale

### Yêu cầu 3: Sitemap XML tự động

**User Story:** Là chủ doanh nghiệp, tôi muốn có sitemap.xml tự động cập nhật, để công cụ tìm kiếm phát hiện và lập chỉ mục tất cả các trang nhanh chóng.

#### Tiêu chí chấp nhận

1. THE Sitemap_Generator SHALL tạo file `sitemap.xml` tại thư mục gốc của website
2. THE Sitemap_Generator SHALL bao gồm tất cả Trang_chủ cho mỗi Locale (`/vi/`, `/en/`, `/ko/`)
3. THE Sitemap_Generator SHALL bao gồm tất cả Trang_dịch_vụ cho mỗi Locale và mỗi slug dịch vụ
4. THE Sitemap_Generator SHALL bao gồm thẻ `<xhtml:link rel="alternate" hreflang>` cho mỗi URL trong sitemap, trỏ đến các phiên bản ngôn ngữ tương ứng
5. THE Sitemap_Generator SHALL sử dụng URL đầy đủ với domain `https://massagetannha.com`
6. IF website sử dụng static export, THEN THE Sitemap_Generator SHALL sinh sitemap tại thời điểm build

### Yêu cầu 4: File robots.txt

**User Story:** Là chủ doanh nghiệp, tôi muốn kiểm soát cách bot tìm kiếm thu thập dữ liệu website, để đảm bảo chỉ nội dung quan trọng được lập chỉ mục.

#### Tiêu chí chấp nhận

1. THE Robots_Generator SHALL tạo file `robots.txt` tại thư mục gốc của website
2. THE Robots_Generator SHALL cho phép tất cả bot tìm kiếm truy cập nội dung công khai (`User-agent: *`, `Allow: /`)
3. THE Robots_Generator SHALL chặn bot truy cập thư mục `/_next/` và các file hệ thống
4. THE Robots_Generator SHALL bao gồm đường dẫn đến sitemap: `https://massagetannha.com/sitemap.xml`

### Yêu cầu 5: Dữ liệu có cấu trúc JSON-LD (Schema.org)

**User Story:** Là chủ doanh nghiệp, tôi muốn Google hiểu rõ loại hình kinh doanh và dịch vụ của tôi, để hiển thị rich snippets hấp dẫn trong kết quả tìm kiếm.

#### Tiêu chí chấp nhận

1. THE Schema_Engine SHALL sinh JSON-LD với `@type: HealthAndBeautyBusiness` trên Trang_chủ, bao gồm: name, description, telephone, email, address, url, priceRange, areaServed, serviceType
2. THE Schema_Engine SHALL sinh JSON-LD với `@type: Service` cho mỗi Trang_dịch_vụ, bao gồm: name, description, provider (tham chiếu đến HealthAndBeautyBusiness)
3. THE Schema_Engine SHALL sinh JSON-LD với `@type: FAQPage` trên Trang_chủ, bao gồm tất cả câu hỏi và câu trả lời từ phần FAQ
4. THE Schema_Engine SHALL sinh JSON-LD với `@type: BreadcrumbList` trên mỗi Trang_dịch_vụ
5. THE Schema_Engine SHALL đặt trường `url` trong HealthAndBeautyBusiness thành `https://massagetannha.com/{locale}/` thay vì `undefined` hiện tại
6. WHEN Locale thay đổi, THE Schema_Engine SHALL điều chỉnh nội dung JSON-LD theo ngôn ngữ tương ứng

### Yêu cầu 6: Tối ưu hình ảnh cho SEO

**User Story:** Là chủ doanh nghiệp, tôi muốn hình ảnh trên website được tối ưu cho SEO, để cải thiện tốc độ tải trang và xuất hiện trong Google Images.

#### Tiêu chí chấp nhận

1. THE Image_Optimizer SHALL đảm bảo mọi thẻ `<img>` có thuộc tính `alt` mô tả nội dung hình ảnh bằng ngôn ngữ tương ứng với Locale hiện tại
2. THE Image_Optimizer SHALL sử dụng thuộc tính `loading="lazy"` cho hình ảnh nằm ngoài viewport ban đầu (below the fold)
3. THE Image_Optimizer SHALL sử dụng thuộc tính `priority` (hoặc `loading="eager"`) cho hình ảnh hero banner trên Trang_chủ
4. THE Image_Optimizer SHALL cung cấp thuộc tính `width` và `height` hoặc `sizes` cho mỗi hình ảnh để tránh layout shift (CLS)
5. WHEN một Trang_dịch_vụ được render, THE Image_Optimizer SHALL đặt alt text của hình ảnh dịch vụ bằng tên dịch vụ theo Locale hiện tại

### Yêu cầu 7: Cấu trúc HTML ngữ nghĩa và Heading Hierarchy

**User Story:** Là chủ doanh nghiệp, tôi muốn cấu trúc HTML của website tuân thủ chuẩn ngữ nghĩa, để công cụ tìm kiếm hiểu rõ cấu trúc nội dung.

#### Tiêu chí chấp nhận

1. THE Hệ_thống SHALL đảm bảo mỗi trang có đúng một thẻ `<h1>` chứa từ khóa chính
2. THE Hệ_thống SHALL sử dụng thứ tự heading hợp lệ (h1 → h2 → h3) mà không bỏ qua cấp nào
3. THE Hệ_thống SHALL đặt thuộc tính `lang` trên thẻ `<html>` tương ứng với Locale hiện tại (thay vì hardcode `lang="vi"` như hiện tại)
4. THE Hệ_thống SHALL sử dụng thẻ `<main>` bao bọc nội dung chính và thẻ `<nav>` cho navigation
5. THE Hệ_thống SHALL sử dụng thẻ `<article>` cho nội dung chi tiết dịch vụ trên Trang_dịch_vụ

### Yêu cầu 8: Tối ưu tốc độ tải trang (Core Web Vitals)

**User Story:** Là chủ doanh nghiệp, tôi muốn website tải nhanh trên mọi thiết bị, để cải thiện trải nghiệm người dùng và thứ hạng SEO.

#### Tiêu chí chấp nhận

1. THE Hệ_thống SHALL preload font chính (Inter, Playfair Display) bằng `display: swap` để tránh FOIT (Flash of Invisible Text)
2. THE Hệ_thống SHALL sử dụng Next.js `<Image>` component với thuộc tính `sizes` phù hợp cho responsive images
3. THE Hệ_thống SHALL tránh render-blocking resources bằng cách defer hoặc async load các script không thiết yếu
4. IF hình ảnh hero banner có kích thước lớn hơn 200KB, THEN THE Hệ_thống SHALL nén hình ảnh xuống dưới 200KB hoặc sử dụng định dạng WebP/AVIF

### Yêu cầu 9: URL thân thiện SEO và Trailing Slash nhất quán

**User Story:** Là chủ doanh nghiệp, tôi muốn URL của website sạch, nhất quán và thân thiện với SEO, để cải thiện khả năng lập chỉ mục.

#### Tiêu chí chấp nhận

1. THE Hệ_thống SHALL sử dụng trailing slash nhất quán trên tất cả URL (đã cấu hình `trailingSlash: true`)
2. THE Hệ_thống SHALL sử dụng slug tiếng Việt có dấu gạch ngang cho Trang_dịch_vụ (ví dụ: `/vi/dich-vu/massage-thai/`)
3. THE Hệ_thống SHALL đảm bảo trang gốc (`/`) redirect đến `/{defaultLocale}/` để tránh nội dung trùng lặp
4. IF người dùng truy cập URL không tồn tại, THEN THE Hệ_thống SHALL trả về trang 404 với metadata phù hợp

### Yêu cầu 10: Tối ưu SEO cho nội dung đa ngôn ngữ

**User Story:** Là chủ doanh nghiệp phục vụ khách Việt Nam, Hàn Quốc và quốc tế, tôi muốn nội dung SEO được tối ưu riêng cho từng thị trường, để thu hút đúng đối tượng khách hàng.

#### Tiêu chí chấp nhận

1. THE Metadata_Engine SHALL sử dụng từ khóa phù hợp với thị trường mục tiêu cho mỗi Locale (ví dụ: "massage tại nhà TPHCM" cho vi, "호치민 방문 마사지" cho ko, "at-home massage Ho Chi Minh City" cho en)
2. THE Hệ_thống SHALL đảm bảo nội dung trong file messages (`vi.json`, `en.json`, `ko.json`) chứa từ khóa SEO tự nhiên trong headline, subheadline và description
3. THE Schema_Engine SHALL sinh JSON-LD với nội dung phù hợp ngôn ngữ cho mỗi Locale
4. THE Metadata_Engine SHALL sinh thẻ `<meta name="keywords">` với từ khóa phù hợp cho mỗi Locale trên mỗi trang
