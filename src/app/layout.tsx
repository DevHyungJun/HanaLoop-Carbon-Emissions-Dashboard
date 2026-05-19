import type { Metadata } from "next";
import { pretendard } from "@/fonts/pretendard";
import "./globals.css";

export const metadata: Metadata = {
  title: "HanaLoop Carbon Emissions Dashboard",
  description: "탄소 배출량 모니터링 및 분석 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} h-full antialiased`}
    >
      <body
        className={`${pretendard.className} min-h-full flex flex-col font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
