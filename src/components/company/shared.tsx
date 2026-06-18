"use client";

import { MessageSquare } from "lucide-react";

// ── 섹션 제목 (번호 + 제목) ──────────────────────────────
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 24, fontWeight: 600, color: "#191b1c", marginBottom: 24 }}>
      {children}
    </h2>
  );
}

// ── 서브 제목 (3.1. 유동성 분석 등) ───────────────────────
export function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: 20, fontWeight: 600, color: "#191b1c", marginBottom: 16 }}>
      {children}
    </h3>
  );
}

// ── 재무건전성 점수 바 (-1 ~ 1) ──────────────────────────
export function ScoreBar({ score }: { score: number }) {
  const pct = ((score - (-1)) / 2) * 100; // -1~1 → 0~100%
  return (
    <div style={{ position: "relative", marginTop: 28, marginBottom: 8 }}>
      {/* 점수 라벨 */}
      <div style={{ fontSize: 14, color: "#191b1c", position: "absolute", bottom: 30, left: `calc(${pct}% - 16px)` }}>
        {score.toFixed(3)}
      </div>
      {/* 삼각형 마커 */}
      <div
        style={{
          position: "absolute", bottom: 12,
          left: `calc(${pct}% - 8px)`,
          width: 0, height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "12px solid #3c3c3c",
        }}
      />
      {/* 색상 바 */}
      <div className="flex" style={{ height: 5, marginTop: 8 }}>
        <div style={{ flex: 1, background: "#eb0d0d" }} />
        <div style={{ flex: 1.5, background: "#ffa353" }} />
        <div style={{ flex: 1, background: "#0042fb" }} />
      </div>
      {/* 눈금 */}
      <div className="flex justify-between" style={{ marginTop: 4 }}>
        {["-1", "-0.5", "0", "0.5", "1"].map((l) => (
          <span key={l} style={{ fontSize: 13, color: "#191b1c" }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// ── New chat 우측 플로팅 버튼 ─────────────────────────────
export function ChatButton() {
  return (
    <div
      className="fixed flex flex-col items-center justify-center gap-3 cursor-pointer"
      style={{
        right: 0, top: "50%", transform: "translateY(-50%)",
        width: 52, height: 237,
        background: "#64a6fa",
        borderRadius: "8px 0 0 8px",
        zIndex: 30,
      }}
    >
      <MessageSquare size={18} color="#fff" />
      <span
        style={{
          fontSize: 15, fontWeight: 500, color: "#fff",
          writingMode: "vertical-rl", textOrientation: "mixed",
          letterSpacing: 2,
        }}
      >
        New chat
      </span>
    </div>
  );
}
