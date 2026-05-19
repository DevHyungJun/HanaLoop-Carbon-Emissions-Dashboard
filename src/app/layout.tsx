import type { Metadata } from "next";
import { pretendard } from "@/fonts/pretendard";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "./utils";
import { Providers } from "./components/state";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
      className={cn(
        "h-dvh",
        "antialiased",
        pretendard.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body
        className={cn(
          pretendard.className,
          "flex h-dvh flex-col font-sans",
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
