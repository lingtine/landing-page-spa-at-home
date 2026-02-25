# IDMassage Landing Page

Landing page cho dịch vụ massage tại nhà và khách sạn, được xây dựng với Next.js (Static Export).

## Tính năng

- ✅ Static Site Generation (SSG) - Build tĩnh, không cần server
- ✅ Đa ngôn ngữ (VI/EN) với routing theo locale
- ✅ Responsive design mobile-first
- ✅ Theme xanh da trời + trắng
- ✅ CTA Zalo tích hợp với deep link support
- ✅ SEO tối ưu với Schema.org markup
- ✅ FAQ accordion
- ✅ Performance tối ưu

## Yêu cầu

- Node.js 18+ 
- npm hoặc yarn

## Cài đặt

```bash
npm install
```

## Development

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## Build Static

```bash
npm run build
```

Output sẽ được tạo trong thư mục `out/`. Bạn có thể deploy thư mục này lên bất kỳ static hosting nào (Vercel, Netlify, GitHub Pages, etc.).

## Cấu trúc dự án

```
├── app/
│   ├── [locale]/          # Dynamic locale routing
│   │   ├── page.tsx       # Trang chính
│   │   └── layout.tsx     # Layout cho locale
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Root redirect
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Benefits.tsx
│   ├── Steps.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx
├── lib/                   # Utilities
│   ├── i18n.ts           # i18n helpers
│   └── zalo.ts           # Zalo link utilities
├── messages/              # Translation files
│   ├── vi.json
│   └── en.json
└── next.config.js         # Next.js config (static export)
```

## Deploy

### Vercel
```bash
vercel
```

### Netlify
1. Kết nối repository với Netlify
2. Build command: `npm run build`
3. Publish directory: `out`

### GitHub Pages
```bash
npm run build
# Copy thư mục out/ vào gh-pages branch
```

## Thông tin liên hệ

- Zalo: +84886517257
- Hotline: +84886517257
- Email: info@idmassage.com

## License

© 2026
