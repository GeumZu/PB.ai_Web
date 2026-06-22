"use client";

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
  Tooltip as ReTooltip, ResponsiveContainer,
} from "recharts";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useValuation } from "@/lib/api/hooks";
import type { ValuationSection as VSection } from "@/lib/companyData";
import { PFM_SUMMARY } from "@/lib/companyData";
import PfmDetail from "./PfmDetail";

const won = (v: number) => `₩${v.toLocaleString()}`;

// ── 범위 바 (얇은 회색 트랙 + 파란 점 + min/중앙/max 라벨) ──
// band: [lo, hi] 값이 주어지면 파란 범위 밴드를 그림(시장범위 전용). 없으면 채움 없이 점만.
// accent: 라벨을 파란색으로 (시장범위·투자모델평균값)
function RangeBar({
  label, suffix, valueLabel, min, mid, max, handle, band, accent, dense, children,
}: {
  label: string; suffix?: string; valueLabel?: string;
  min: number; mid: number; max: number; handle: number;
  band?: [number, number]; accent?: boolean;
  dense?: boolean; children?: React.ReactNode;
}) {
  const toPct = (v: number) => ((v - min) / (max - min)) * 100;
  const pct = toPct(handle);
  const fs = dense ? 15 : 17;
  return (
    <div className="flex items-start" style={{ gap: 24, padding: dense ? "8px 0" : "10px 0" }}>
      <div style={{ width: 220, flexShrink: 0 }}>
        <div className="flex items-baseline">
          <span style={{ fontSize: fs, fontWeight: 600, color: accent ? "#5797f7" : "#191b1c" }}>{label}</span>
          {suffix && <span style={{ fontSize: 14, color: "#939597", marginLeft: 6 }}>{suffix}</span>}
          {valueLabel && <span style={{ fontSize: fs, fontWeight: 600, color: "#5797f7", marginLeft: 4 }}>{valueLabel}</span>}
        </div>
        {children}
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingTop: 8 }}>
        <div style={{ position: "relative", height: 4 }}>
          <div style={{ position: "absolute", inset: 0, background: "#e7e9eb", borderRadius: 999 }} />
          {band && (
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${toPct(band[0])}%`, width: `${toPct(band[1]) - toPct(band[0])}%`, background: "#5797f7", borderRadius: 999 }} />
          )}
          <div style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%,-50%)", width: 12, height: 12, borderRadius: "50%", background: "#5797f7", border: "2px solid #fff", boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }} />
        </div>
        <div className="flex justify-between" style={{ marginTop: 10 }}>
          {[min, mid, max].map((v, i) => {
            const hot = !!band && v === handle; // 시장범위 현재값만 파랑 강조
            return (
              <span key={i} style={{ fontSize: 14, color: hot ? "#5797f7" : "#939597", fontWeight: hot ? 600 : 400 }}>{won(v)}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 방법론 선택 버튼 (StockValuationTabs) ─────────────────
// 컴팩트한 버튼 목록. 선택된 방법의 상세는 목록 아래 별도 패널로 렌더한다.
function MethodButton({ section, active, onClick }: { section: VSection; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full hover:bg-[#f7f9fb] transition-colors"
      style={{ border: "1px solid #e7e9eb", borderRadius: 12, padding: "18px 20px", background: active ? "#f7f9fb" : "#fff" }}
    >
      <span style={{ fontSize: 17, fontWeight: 500, color: "#191b1c" }}>{section.num}. {section.title}</span>
      {active ? <ChevronDown size={18} color="#6b6d6f" /> : <ChevronRight size={18} color="#6b6d6f" />}
    </button>
  );
}

export default function ValuationSection({ code }: { code: string }) {
  const { data, isLoading } = useValuation(code);
  const [modelsOpen, setModelsOpen] = useState(false);
  const [activeMethod, setActiveMethod] = useState<number | null>(null);
  const [descOpen, setDescOpen] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col" style={{ gap: 24 }}>
        <Skeleton className="h-[420px] w-full" />
        {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-[58px] w-full" />)}
      </div>
    );
  }

  const { chart, ranges, models, sections } = data;

  return (
    <div className="flex flex-col" style={{ gap: 32 }}>
      {/* 1. 종합분석 */}
      <section>
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: "#191b1c" }}>1. 종합분석</h2>
          <div className="flex gap-2">
            {["5년", "연간"].map((f) => (
              <button key={f} className="flex items-center gap-1" style={{ fontSize: 13, color: "#6b6d6f", border: "1px solid #e0e0e0", borderRadius: 6, padding: "4px 10px" }}>
                {f} <ChevronDown size={14} />
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chart} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} interval={2} />
            <YAxis tickFormatter={(v) => v.toLocaleString()} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={56} domain={[200000, 500000]} ticks={[200000, 250000, 300000, 350000, 400000, 450000, 500000]} />
            <ReTooltip
              formatter={(v, n) => [won(Number(v)), String(n)]}
              contentStyle={{ fontSize: 12, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.5)", backdropFilter: "blur(3px)", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="실제주가" stroke="#eb0d0d" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="평균추정주가" stroke="#5797f7" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>

        <div style={{ background: "#fff", border: "1px solid #ebedf0", borderRadius: 16, padding: "20px 24px", marginTop: 16 }}>
          <RangeBar
            accent
            label={ranges.market.label} suffix={ranges.market.suffix}
            min={ranges.market.min} mid={ranges.market.mid} max={ranges.market.max}
            handle={ranges.market.handle} band={ranges.market.band}
          />
          <RangeBar
            accent
            label={ranges.model.label} valueLabel={won(ranges.model.value)}
            min={ranges.model.min} mid={ranges.model.mid} max={ranges.model.max}
            handle={ranges.model.handle}
          >
            <button onClick={() => setModelsOpen((o) => !o)} className="flex items-center gap-1" style={{ fontSize: 13, color: "#939597", marginTop: 6 }}>
              4가지 모델 <ChevronDown size={13} style={{ transform: modelsOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
            </button>
          </RangeBar>

          {modelsOpen && (
            <>
              <div style={{ height: 1, background: "#e7e9eb", margin: "6px 0 4px" }} />
              <div className="flex flex-col">
                {models.map((m) => (
                  <RangeBar
                    key={m.key} dense
                    label={m.short} valueLabel={won(m.price)}
                    min={ranges.model.min} mid={ranges.model.mid} max={ranges.model.max}
                    handle={m.price}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 방법론 버튼 목록(2~6) — Figma StockValuationTabs */}
      <div className="flex flex-col" style={{ gap: 12 }}>
        {sections.map((s) => (
          <MethodButton
            key={s.num}
            section={s}
            active={activeMethod === s.num}
            onClick={() => { setActiveMethod((cur) => (cur === s.num ? null : s.num)); setDescOpen(false); }}
          />
        ))}
      </div>

      {/* 선택된 방법론 상세 패널 (버튼 목록 아래에 별도 섹션으로) */}
      {(() => {
        const sec = sections.find((s) => s.num === activeMethod);
        if (!sec) return null;
        return (
          <section style={{ marginTop: 4 }}>
            {/* 제목: 호버 시 primary/500, 클릭 시 설명 토글. 활성이어도 비호버면 원래 색 */}
            <div style={{ marginBottom: 16 }}>
              <h2
                onClick={() => setDescOpen((o) => !o)}
                className="pb-section-title pb-section-title--clickable"
                style={{ display: "inline-block", fontSize: 24, fontWeight: 600, userSelect: "none" }}
              >
                {sec.title}
              </h2>
              {descOpen && (
                <div style={{ marginTop: 12, background: "#f7f9fb", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: "#58595b" }}>
                  {sec.num === 2 ? PFM_SUMMARY : sec.desc}
                </div>
              )}
            </div>
            {sec.num === 2 ? (
              <PfmDetail />
            ) : (
              sec.price != null && (
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 14, color: "#6b6d6f" }}>추정주가</span>
                  <span style={{ fontSize: 17, fontWeight: 600, color: "#5797f7" }}>{won(sec.price)}</span>
                </div>
              )
            )}
          </section>
        );
      })()}
    </div>
  );
}
