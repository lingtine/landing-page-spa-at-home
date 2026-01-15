# TODO — Landing page “Dịch vụ massage tại nhà & khách sạn” (IDMassage)

> Mục tiêu: làm 1 trang landing page **tông xanh da trời + trắng**, **không có thanh toán/checkout**, người dùng **bấm vào dịch vụ/CTA là mở Zalo** để đặt lịch. Có **chuyển đổi ngôn ngữ** (VI/EN tối thiểu).

---

## 0) Checklist yêu cầu (để tránh lệch scope)

- [ ] Không hiển thị “0 ₫” / bảng giá kiểu sản phẩm
- [ ] Không hiển thị “Phương thức thanh toán” / icon MoMo/Banking
- [ ] Không có Add to cart / Checkout / Payment
- [ ] CTA chính: **Đặt lịch qua Zalo**
- [ ] Có nút đổi ngôn ngữ (VI/EN)
- [ ] Responsive mobile-first, tải nhanh

---

## 1) Cấu trúc nội dung (IA) đề xuất

### A. Header
- [ ] Logo + menu đơn giản (Trang chủ / Dịch vụ / FAQ / Liên hệ)
- [ ] Language switch (VI | EN)
- [ ] CTA nhỏ bên phải: “Chat Zalo”

### B. Hero (đập vào mắt)
- [ ] Headline: “Massage tại nhà & khách sạn — đặt nhanh qua Zalo”
- [ ] Subheadline: 1–2 câu về chất lượng/riêng tư/đến tận nơi
- [ ] 2 CTA:
  - [ ] **Primary:** “Đặt lịch qua Zalo”
  - [ ] Secondary: “Gọi ngay” (tel:)

### C. Dịch vụ (Service cards)
- [ ] Tạo 2–6 cards (tuỳ bạn chia):
  - [ ] Massage tại nhà
  - [ ] Massage tại khách sạn
  - [ ] (Tuỳ chọn) Body / Cổ-vai-gáy / Foot / Đá nóng…
- [ ] Mỗi card gồm:
  - [ ] Tên dịch vụ + mô tả 1–2 dòng
  - [ ] Thời lượng gợi ý (60/90/120 phút) (nếu muốn)
  - [ ] 1 CTA: “Đặt qua Zalo” (mở Zalo trực tiếp)

### D. Điểm mạnh / Cam kết
- [ ] 4–6 bullet + icon:
  - [ ] KTV chuyên nghiệp
  - [ ] Đến tận nơi đúng giờ
  - [ ] Không gian riêng tư
  - [ ] Dụng cụ sạch sẽ
  - [ ] Hỗ trợ đặt lịch nhanh

### E. Quy trình đặt lịch (3 bước)
- [ ] B1: Chọn dịch vụ
- [ ] B2: Chat Zalo gửi địa điểm + giờ
- [ ] B3: KTV đến & thực hiện

### F. FAQ
- [ ] Khu vực phục vụ?
- [ ] Thời gian có mặt?
- [ ] Đổi lịch/huỷ lịch?
- [ ] Có cần chuẩn bị gì?
- [ ] Chính sách bảo mật?

### G. Liên hệ / Footer
- [ ] Zalo + Hotline + Email
- [ ] Link chính sách/điều khoản (nếu có)
- [ ] Thông tin công ty (nếu muốn tăng trust)

---

## 2) Link Zalo & hành vi CTA

### 2.1 Link chuẩn (khuyến nghị)
- [ ] Zalo web: `https://zalo.me/+84886517257`
- [ ] Hotline: `tel:+84886517257`

### 2.2 Fallback (đề xuất)
- [ ] Trên mobile: thử deep-link `zalo://` (nếu bạn dùng JS detect)
- [ ] Nếu fail → mở `https://zalo.me/+84886517257` trong tab mới

### 2.3 Tracking (optional nhưng nên có)
- [ ] GA4 event: `click_zalo`
- [ ] GA4 event params: `service_name`, `locale`, `page`

---

## 3) Đa ngôn ngữ (i18n)

- [ ] MVP: VI + EN
- [ ] Chuẩn bị file dịch:
  - [ ] `messages/vi.json`
  - [ ] `messages/en.json`
- [ ] Các nhóm key cần có:
  - [ ] header/menu
  - [ ] hero headline/subheadline/cta
  - [ ] services (tên + mô tả)
  - [ ] benefits
  - [ ] steps
  - [ ] faq
  - [ ] footer/contact
- [ ] Switch ngôn ngữ:
  - [ ] Lưu lựa chọn bằng cookie
  - [ ] URL theo locale: `/vi/...` và `/en/...` (khuyên dùng)

---

## 4) UI/UX & Theme (xanh + trắng)

- [ ] Design tokens:
  - [ ] Primary: blue-600 / blue-700
  - [ ] Background: white + light-blue tint
  - [ ] Text: slate-800, muted slate-500
- [ ] Component checklist:
  - [ ] Button (primary/outline)
  - [ ] Card
  - [ ] Accordion FAQ
  - [ ] Badge (ví dụ: “Tận nơi”, “Riêng tư”, “Đặt nhanh”)
- [ ] Trạng thái hover/focus rõ ràng (accessibility)

---

## 5) Nội dung & media

- [ ] Viết copy VI (xong) → dịch sang EN
- [ ] Chuẩn bị ảnh:
  - [ ] 1 ảnh hero (wide)
  - [ ] 2–6 ảnh minh hoạ dịch vụ
- [ ] Tối ưu ảnh: WebP/AVIF, lazy-load, kích thước phù hợp

---

## 6) SEO & Performance

- [ ] Meta title/description theo locale
- [ ] OpenGraph image
- [ ] Schema:
  - [ ] `LocalBusiness`
  - [ ] `Service`
- [ ] Lighthouse mobile:
  - [ ] Performance ≥ 90
  - [ ] Accessibility ≥ 90
- [ ] Internal links: Trang chủ / Kỹ thuật viên / Chính sách…

---

## 7) Gợi ý công nghệ: Next.js hay React thuần?

### Khuyến nghị: **Next.js**
- [ ] Là landing page nên SEO quan trọng → Next.js (SSG/ISR) rất hợp
- [ ] i18n (locale routing) gọn, tối ưu ảnh, performance tốt
- [ ] Dễ mở rộng thêm nhiều landing / blog / bài viết SEO sau này

### Khi nào dùng React thuần (Vite)?
- [ ] Nếu bạn không cần SEO (chạy ads, chỉ 1 trang), muốn setup cực nhanh
- [ ] Nhưng: SEO sẽ yếu hơn nếu không thêm SSR/prerender

---

## 8) Triển khai MVP (đề xuất 3 bước)

- [ ] Bước 1: Layout + Hero + Service cards + CTA Zalo
- [ ] Bước 2: i18n (VI/EN) + FAQ + Footer
- [ ] Bước 3: SEO + tối ưu ảnh + tracking + deploy

---

## 9) QA trước khi publish

- [ ] Mobile iOS/Android: bấm CTA mở Zalo ok
- [ ] Desktop: mở zalo.me ok
- [ ] Ngôn ngữ: switch không lỗi, text đúng chỗ
- [ ] Link tel: gọi được trên mobile
- [ ] Không còn section thanh toán/checkout
