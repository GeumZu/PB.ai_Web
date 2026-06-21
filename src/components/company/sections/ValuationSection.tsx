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

const won = (v: number) => `₩${v.toLocaleString()}`;

// ── 범위 바 (회색 트랙 + 파란 핸들 + min/중앙/max 라벨) ────
function RangeBar({
  label, suffix, valueLabel, min, mid, max, handle, band, dense, children,
}: {
  label: string; suffix?: string; valueLabel?: string;
  min: number; mid: number; max: number; handle: number; band: boolean;
  dense?: boolean; children?: React.ReactNode;
}) {
  const pct = ((handle - min) / (max - min)) * 100;
  const fs = dense ? 15 : 17;
  return (
    <div className="flex items-start" style={{ gap: 24, padding: dense ? "6px 0" : "8px 0" }}>
      <div style={{ width: 220, flexShrink: 0 }}>
        <div className="flex items-baseline gap-1.5">
          <span style={{ fontSize: fs, fontWeight: 600, color: "#191b1c" }}>{label}</span>
          {suffix && <span style={{ fontSize: 14, color: "#6b6d6f" }}>{suffix}</span>}
          {valueLabel && <span style={{ fontSize: fs, fontWeight: 600, color: "#5797f7" }}>{valueLabel}</span>}
        </div>
        {children}
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingTop: 6 }}>
        <div style={{ position: "relative", height: 8 }}>
          <div style={{ position: "absolute", inset: 0, background: "#e7e9eb", borderRadius: 999 }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: band ? "100%" : `${pct}%`, background: "#9dcbfd", borderRadius: 999 }} />
          <div style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%,-50%)", width: 16, height: 16, borderRadius: "50%", background: "#5797f7", border: "2px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
        </div>
        <div className="flex justify-between" style={{ marginTop: 10 }}>
          {[min, mid, max].map((v, i) => (
            <span key={i} style={{ fontSize: 15, color: v === handle ? "#191b1c" : "#939597", fontWeight: v === handle ? 600 : 400 }}>{won(v)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 아코디언 항목 ─────────────────────────────────────────
function Accordion({ section }: { section: VSection }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid #e7e9eb", borderRadius: 12, overflow: "hidden" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full hover:bg-[#f7f9fb] transition-colors"
        style={{ padding: "18px 20px", background: "#fff" }}
      >
        <span style={{ fontSize: 17, fontWeight: 500, color: "#191b1c" }}>{section.num}. {section.title}</span>
        {open ? <ChevronDown size={18} color="#6b6d6f" /> : <ChevronRight size={18} color="#6b6d6f" />}
      </button>
      {open && (
        <div style={{ padding: "0 20px 18px", background: "#fff" }}>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#58595b" }}>{section.desc}</p>
          {section.price != null && (
            <div className="flex items-center gap-2" style={{ marginTop: 12 }}>
              <span style={{ fontSize: 14, color: "#6b6d6f" }}>추정주가</span>
              <span style={{ fontSize: 17, fontWeight: 600, color: "#5797f7" }}>{won(section.price)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ValuationSection({ code }: { code: string }) {
  const { data, isLoading } = useValuation(code);
  const [modelsOpen, setModelsOpen] = useState(false);

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
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} minTickGap={24} />
            <YAxis tickFormatter={(v) => v.toLocaleString()} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={56} domain={[200000, 500000]} />
            <ReTooltip
              formatter={(v, n) => [won(Number(v)), String(n)]}
              contentStyle={{ fontSize: 12, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.5)", backdropFilter: "blur(3px)", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="실제주가" stroke="#eb0d0d" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="평균추정주가" stroke="#5797f7" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>

        <div style={{ background: "#f7f9fb", borderRadius: 12, padding: "20px 24px", marginTop: 16 }}>
          <RangeBar
            label={ranges.market.label} suffix={ranges.market.suffix}
            min={ranges.market.min} mid={ranges.market.mid} max={ranges.market.max}
            handle={ranges.market.handle} band={ranges.market.band}
          />
          <div style={{ height: 1, background: "#e7e9eb", margin: "8px 0" }} />
          <RangeBar
            label={ranges.model.label} valueLabel={won(ranges.model.value)}
            min={ranges.model.min} mid={ranges.model.mid} max={ranges.model.max}
            handle={ranges.model.handle} band={ranges.model.band}
          >
            <button onClick={() => setModelsOpen((o) => !o)} className="flex items-center gap-1" style={{ fontSize: 13, color: "#939597", marginTop: 6 }}>
              4가지 모델 <ChevronDown size={13} style={{ transform: modelsOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
            </button>
          </RangeBar>

          {modelsOpen && (
            <div className="flex flex-col">
              {models.map((m) => (
                <RangeBar
                  key={m.key} dense
                  label={m.short} valueLabel={won(m.price)}
                  min={ranges.model.min} mid={ranges.model.mid} max={ranges.model.max}
                  handle={m.price} band={false}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2~6 아코디언 */}
      <div className="flex flex-col" style={{ gap: 12 }}>
        {sections.map((s) => <Accordion key={s.num} section={s} />)}
      </div>
    </div>
  );
}
