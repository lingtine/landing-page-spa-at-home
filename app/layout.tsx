import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "IDMassage - Dịch vụ Massage tại nhà và khách sạn",
  description: "Dịch vụ massage chuyên nghiệp tại nhà và khách sạn. Đặt lịch nhanh qua Zalo. KTV chuyên nghiệp, đến tận nơi đúng giờ.",
  keywords: "massage tại nhà, massage khách sạn, massage Huế, đặt lịch massage",
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
