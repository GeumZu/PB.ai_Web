"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(240, 242, 244, 0.85)" }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* 카드: 389×394, r=24, border #e7e9eb, padding 80/60/80/60 */}
      <div
        className="relative bg-white flex flex-col items-center"
        style={{
          width: 389,
          height: 394,
          borderRadius: 24,
          border: "1px solid #e7e9eb",
          paddingTop: 80,
          paddingBottom: 80,
          paddingLeft: 60,
          paddingRight: 60,
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* X 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute hover:opacity-50 transition-opacity"
          style={{ top: 20, right: 24, fontSize: 14, color: "#191b1c", lineHeight: 1 }}
          aria-label="닫기"
        >
          ✕
        </button>

        {/* 타이틀 + 설명 */}
        <div className="flex flex-col items-center text-center" style={{ gap: 20 }}>
          <p style={{ fontSize: 36, fontWeight: 700, color: "#191b1c", lineHeight: 1.3 }}>
            Log In
          </p>
          <p style={{ fontSize: 17, color: "#191b1c", lineHeight: 1.55 }}>
            더 많은 정보를 열람하실 수 있고,<br />
            대화 히스토리를 관리할 수 있어요
          </p>
        </div>

        {/* Google 로그인 버튼: 269×48, r=24, border #d7d9db */}
        <button
          className="flex items-center hover:bg-[#f7f9fb] transition-colors"
          style={{
            width: 269,
            height: 48,
            borderRadius: 24,
            border: "1px solid #d7d9db",
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: "#ffffff",
            gap: 8,
          }}
        >
          <GoogleIcon />
          <span className="flex-1 text-center" style={{ fontSize: 15, color: "#393b3c" }}>
            Google로 계속하기
          </span>
          <ArrowRight size={16} className="text-[#697077] shrink-0" />
        </button>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23C18.33 15.87 19.6 13.27 19.6 10.23z" fill="#4285F4"/>
      <path d="M10 20c2.7 0 4.96-.9 6.61-2.43l-3.23-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.75-5.59-4.11H1.07v2.6A9.99 9.99 0 0 0 10 20z" fill="#34A853"/>
      <path d="M4.41 11.91A6.07 6.07 0 0 1 4.1 10c0-.66.11-1.3.31-1.91V5.5H1.07A9.99 9.99 0 0 0 0 10c0 1.62.39 3.15 1.07 4.5l3.34-2.59z" fill="#FBBC05"/>
      <path d="M10 3.98c1.47 0 2.79.5 3.82 1.5l2.86-2.86C14.95.9 12.7 0 10 0A9.99 9.99 0 0 0 1.07 5.5l3.34 2.59C5.2 5.73 7.4 3.98 10 3.98z" fill="#EA4335"/>
    </svg>
  );
}
