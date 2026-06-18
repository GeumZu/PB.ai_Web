"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/search/SearchBar";
import LoginModal from "@/components/auth/LoginModal";

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="flex" style={{ height: "100dvh" }}>
      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* 로그인 버튼 — Figma: 93×46px */}
        <div className="absolute top-[20px] right-6 z-10">
          <button
            onClick={() => setLoginOpen(true)}
            className="flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            style={{ width: 93, height: 46, backgroundColor: "#64a6fa", borderRadius: 40, fontSize: 17, fontWeight: 600 }}
          >
            로그인
          </button>
        </div>

        {/* 중앙 콘텐츠 — Figma: 타이틀 + 검색바만 */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
          <h1 className="text-[32px] font-medium text-[#191b1c] tracking-tight">
            어떤 회사를 분석해볼까요?
          </h1>
          <SearchBar />
        </div>
      </main>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
