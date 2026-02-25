import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import config from "@/global-config";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: `${config.nameWebsite} - Dịch vụ Massage chuyên nghiệp`,
  description: "Dịch vụ massage chuyên nghiệp tại tiệm. Kỹ thuật chuyên sâu, tinh dầu thiên nhiên cao cấp. Đặt lịch nhanh qua Zalo.",
  keywords: "massage chuyên nghiệp, massage Huế, đặt lịch massage",
  icons: {
    icon: config.logo,
    apple: config.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
