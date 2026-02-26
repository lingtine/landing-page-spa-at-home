import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import config from "@/global-config";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: `${config.nameWebsite} - Massage Tại Nhà TP.HCM`,
  description: "Dịch vụ massage tại nhà TP.HCM. Body Massage, Shiatsu Nhật Bản, Massage Thụy Điển, Massage Vai Gáy. KTV đến tận nơi, an toàn, kín đáo. Đặt lịch qua Zalo.",
  keywords: "massage tại nhà, massage tại nhà TPHCM, massage tại nhà Hồ Chí Minh, body massage, shiatsu, massage thụy điển, massage vai gáy, đặt massage tại nhà",
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
