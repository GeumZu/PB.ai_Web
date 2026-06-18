import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PB.ai - 기업 분석 AI",
  description: "AI 기반 기업 분석, 투자 대시보드, 포트폴리오 관리 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased" style={{ height: "100dvh", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
