import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SideNav from "@/components/SideNav";

export const metadata: Metadata = {
  title: "جستجوی تصاویر با کیفیت - اپلیکیشن عکس",
  description:
    "با استفاده از این اپلیکیشن، تصاویر با کیفیت بالا را جستجو کنید و دانلود نمایید.",
  keywords: "جستجوی عکس, دانلود عکس, تصاویر با کیفیت, گالری تصاویر",
  openGraph: {
    title: "جستجوی تصاویر با کیفیت - اپلیکیشن عکس",
    description: "تصاویر حرفه‌ای را جستجو کرده و دانلود کنید.",
    type: "website",
    url: "https://yourwebsite.com", // لینک اصلی سایت را قرار دهید
    images: [
      {
        url: "https://yourwebsite.com/preview-image.jpg", // تصویر پیش‌نمایش سایت
        width: 1200,
        height: 630,
        alt: "پیش‌نمایش اپلیکیشن جستجوی تصاویر",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "جستجوی تصاویر با کیفیت - اپلیکیشن عکس",
    description: "تصاویر حرفه‌ای را جستجو کرده و دانلود کنید.",
    images: ["https://yourwebsite.com/preview-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col md:flex-row">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-screen md:w-64 flex-shrink-0">
            <SideNav />
          </nav>
          <div className="flex-1 p-4">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
