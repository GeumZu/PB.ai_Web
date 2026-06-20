"use client";

import { useState, useRef, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
  Tooltip as ReTooltip, ResponsiveContainer,
} from "recharts";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionTitle } from "../shared";
import { useInvestmentIndicators } from "@/lib/api/hooks";
import {
  INVEST_LINE_COLORS, INVEST_SUBROWS, SUBROW_AMOUNTS,
  type IndicatorSection, type Fmt,
} from "@/lib/companyData";
import {
  getPeriods, valueAt,
  INTERVAL_OPTIONS, YEARNUM_OPTIONS,
  type Interval, type YearNum,
} from "@/lib/periods";

const METRIC_COL = 150; // 지표명 컬럼 폭
const PERIOD_COL = 84;  // 기간 컬럼 최소 폭

// 값 포맷
function fmtValue(v: number | null, fmt: Fmt): string {
  if (v == null) return "-";
  if (fmt === "won") return `₩${Math.round(v).toLocaleString()}`;
  if (fmt === "percent") return `${Math.round(v * 10) / 10}%`;
  return v.toFixed(2); // ratio
}

function metricFmt(section: IndicatorSection, name: string): Fmt {
  return section.formatOverride?.[name] ?? section.format;
}

// ── 드롭다운 (Interval / YearNum 필터) ────────────────────
function Dropdown<T extends string | number>({
  value, options, onChange,
}: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const current = options.find((o) => o.value === value);
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1"
        style={{ fontSize: 13, color: "#6b6d6f", border: "1px solid #e0e0e0", borderRadius: 6, padding: "4px 10px", background: "#fff" }}
      >
        {current?.label} <ChevronDown size={14} />
      </button>
      {open && (
        <div
          className="absolute right-0 z-20"
          style={{ top: "calc(100% + 4px)", background: "#fff", border: "1px solid #e7e9eb", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", overflow: "hidden", minWidth: 80 }}
        >
          {options.map((o) => (
            <button
              key={String(o.value)}
              onClick={() => { onChange(o.value); setOpen(false); }}
              className="block w-full text-left hover:bg-[#f7f9fb]"
              style={{ fontSize: 13, padding: "8px 12px", color: o.value === value ? "#5797f7" : "#191b1c", fontWeight: o.value === value ? 600 : 400 }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 라인차트 1개 ──────────────────────────────────────────
function IndicatorChart({
  periods, section, keys, fmt,
}: { periods: string[]; section: IndicatorSection; keys: string[]; fmt: Fmt }) {
  const data = periods.map((p) => {
    const row: Record<string, string | number | null> = { period: p };
    keys.forEach((k) => {
      const m = section.metrics.find((mm) => mm.name === k);
      row[k] = m ? valueAt(m.values, p) : null;
    });
    return row;
  });

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="period" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} minTickGap={16} />
          <YAxis
            tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={52}
            tickFormatter={(v) => (fmt === "won" ? v.toLocaleString() : fmt === "percent" ? `${v}%` : v)}
          />
          <ReTooltip
            formatter={(v) => fmtValue(Number(v), fmt)}
            contentStyle={{ fontSize: 12, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.5)", backdropFilter: "blur(3px)", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {keys.map((k, i) => (
            <Line key={k} type="monotone" dataKey={k} stroke={INVEST_LINE_COLORS[i % INVEST_LINE_COLORS.length]} strokeWidth={2} dot={{ r: 3 }} connectNulls />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── 반응형 표 (행=지표 +펼침, 열=기간) ────────────────────
function IndicatorTable({ periods, section }: { periods: string[]; section: IndicatorSection }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (name: string) => setOpen((o) => ({ ...o, [name]: !o[name] }));
  const minWidth = METRIC_COL + periods.length * PERIOD_COL;

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth }}>
        {/* 헤더 (기간) */}
        <div className="flex" style={{ background: "#fafbfc", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0", padding: "12px 0" }}>
          <div style={{ width: METRIC_COL, flexShrink: 0 }} />
          {periods.map((p) => (
            <div key={p} style={{ flex: 1, minWidth: PERIOD_COL, textAlign: "center", fontSize: 13, color: "#6b6d6f", whiteSpace: "nowrap" }}>{p}</div>
          ))}
        </div>
        {/* 지표 행 */}
        {section.metrics.map((m) => {
          const fmt = metricFmt(section, m.name);
          const subs = INVEST_SUBROWS[m.name];
          const expandable = !!subs;
          const isOpen = !!open[m.name];
          return (
            <div key={m.name}>
              <div className="flex items-center" style={{ borderBottom: "1px solid #f3f3f3", padding: "14px 0" }}>
                <div className="flex items-center gap-1.5" style={{ width: METRIC_COL, flexShrink: 0 }}>
                  <span style={{ fontSize: 15, color: "#191b1c", whiteSpace: "nowrap" }}>{m.name}</span>
                  {expandable && (
                    <button
                      onClick={() => toggle(m.name)}
                      className="flex items-center justify-center rounded transition-colors hover:bg-[#e5f2fe]"
                      style={{ width: 18, height: 18, border: "1px solid #c5d9fd", flexShrink: 0 }}
                      aria-label={`${m.name} ${isOpen ? "접기" : "펼치기"}`}
                    >
                      {isOpen ? <Minus size={12} color="#5797f7" /> : <Plus size={12} color="#5797f7" />}
                    </button>
                  )}
                </div>
                {periods.map((p) => {
                  const v = valueAt(m.values, p);
                  return (
                    <div key={p} style={{ flex: 1, minWidth: PERIOD_COL, textAlign: "center", fontSize: 15, color: v == null ? "#b3b5b7" : "#191b1c", whiteSpace: "nowrap" }}>
                      {fmtValue(v, fmt)}
                    </div>
                  );
                })}
              </div>
              {/* 펼침: 계산식 구성요소 (분자/분모) */}
              {expandable && isOpen &&
                subs.map((sub, si) => (
                  <div key={sub} className="flex items-center" style={{ borderBottom: "1px solid #f3f3f3", height: 40, background: "#fafbfc" }}>
                    <div className="flex items-center" style={{ width: METRIC_COL, flexShrink: 0, paddingLeft: 16 }}>
                      <span style={{ fontSize: 14, color: "#6b6d6f", whiteSpace: "nowrap" }}>{sub}</span>
                    </div>
                    {periods.map((p) => (
                      <div key={p} style={{ flex: 1, minWidth: PERIOD_COL, textAlign: "center", fontSize: 14, color: "#6b6d6f", whiteSpace: "nowrap" }}>
                        {SUBROW_AMOUNTS[si] ?? SUBROW_AMOUNTS[0]}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 섹션 (제목 + 차트 2개 + 필터 + 표) ────────────────────
function Section({ section }: { section: IndicatorSection }) {
  const [interval, setInterval] = useState<Interval>("annual");
  const [yearNum, setYearNum] = useState<YearNum>(5);
  const periods = getPeriods(yearNum, interval);

  return (
    <section>
      <SectionTitle description={section.description}>{section.title}</SectionTitle>

      {/* 차트 2개 */}
      <div className="flex gap-3" style={{ minWidth: 0, marginBottom: 16 }}>
        <IndicatorChart periods={periods} section={section} keys={section.leftKeys} fmt={section.format} />
        <IndicatorChart periods={periods} section={section} keys={section.rightKeys} fmt={section.format} />
      </div>

      {/* 필터: YearNum + Interval */}
      <div className="flex justify-end gap-2" style={{ marginBottom: 8 }}>
        <Dropdown value={yearNum} options={YEARNUM_OPTIONS} onChange={setYearNum} />
        <Dropdown value={interval} options={INTERVAL_OPTIONS} onChange={setInterval} />
      </div>

      {/* 표 */}
      <IndicatorTable periods={periods} section={section} />
    </section>
  );
}

export default function IndicatorsSection({ code }: { code: string }) {
  const { data, isLoading } = useInvestmentIndicators(code);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col" style={{ gap: 64 }}>
        {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-[480px] w-full" />)}
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ gap: 64 }}>
      {data.sections.map((s) => (
        <Section key={s.id} section={s} />
      ))}
    </div>
  );
}
