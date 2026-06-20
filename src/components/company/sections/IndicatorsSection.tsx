"use client";

import { useState } from "react";
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
  type IndicatorSection, type IndicatorMetric, type Fmt,
} from "@/lib/companyData";

// 값 포맷
function fmtValue(v: number | null, fmt: Fmt): string {
  if (v == null) return "-";
  if (fmt === "won") return `₩${v.toLocaleString()}`;
  if (fmt === "percent") return `${v}%`;
  return v.toFixed(2); // ratio
}

function metricFmt(section: IndicatorSection, name: string): Fmt {
  return section.formatOverride?.[name] ?? section.format;
}

// 라인차트 1개 (특정 시리즈들)
function IndicatorChart({
  years, metrics, keys, fmt,
}: { years: string[]; metrics: IndicatorMetric[]; keys: string[]; fmt: Fmt }) {
  const data = years.map((year, i) => {
    const row: Record<string, string | number | null> = { year };
    keys.forEach((k) => {
      const m = metrics.find((mm) => mm.name === k);
      row[k] = m ? m.values[i] : null;
    });
    return row;
  });

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
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

// 연도열 표 (행=지표 +펼침, 열=연도)
function IndicatorTable({ years, section }: { years: string[]; section: IndicatorSection }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (name: string) => setOpen((o) => ({ ...o, [name]: !o[name] }));

  return (
    <div style={{ width: "100%" }}>
      {/* 헤더 (연도) */}
      <div className="flex" style={{ background: "#fafbfc", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0", padding: "12px 0" }}>
        <div style={{ flex: 1.4 }} />
        {years.map((y) => (
          <div key={y} style={{ flex: 1, textAlign: "center", fontSize: 14, color: "#6b6d6f" }}>{y}</div>
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
              <div className="flex items-center gap-1.5" style={{ flex: 1.4 }}>
                <span style={{ fontSize: 15, color: "#191b1c" }}>{m.name}</span>
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
              {m.values.map((v, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 15, color: v == null ? "#b3b5b7" : "#191b1c" }}>
                  {fmtValue(v, fmt)}
                </div>
              ))}
            </div>
            {/* 펼침: 계산식 구성요소 (분자/분모) */}
            {expandable && isOpen &&
              subs.map((sub, si) => (
                <div key={sub} className="flex items-center" style={{ borderBottom: "1px solid #f3f3f3", height: 40, background: "#fafbfc" }}>
                  <div className="flex items-center" style={{ flex: 1.4, paddingLeft: 16 }}>
                    <span style={{ fontSize: 14, color: "#6b6d6f", whiteSpace: "nowrap" }}>{sub}</span>
                  </div>
                  {section.metrics[0].values.map((_, yi) => (
                    <div key={yi} style={{ flex: 1, textAlign: "center", fontSize: 14, color: "#6b6d6f", whiteSpace: "nowrap" }}>
                      {SUBROW_AMOUNTS[si] ?? SUBROW_AMOUNTS[0]}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}

function Section({ years, section }: { years: string[]; section: IndicatorSection }) {
  return (
    <section>
      <SectionTitle description={section.description}>{section.title}</SectionTitle>

      {/* 차트 2개 */}
      <div className="flex gap-3" style={{ minWidth: 0, marginBottom: 16 }}>
        <IndicatorChart years={years} metrics={section.metrics} keys={section.leftKeys} fmt={section.format} />
        <IndicatorChart years={years} metrics={section.metrics} keys={section.rightKeys} fmt={section.format} />
      </div>

      {/* 필터 */}
      <div className="flex justify-end gap-2" style={{ marginBottom: 8 }}>
        {["5년", "연간"].map((f) => (
          <button key={f} className="flex items-center gap-1" style={{ fontSize: 13, color: "#6b6d6f", border: "1px solid #e0e0e0", borderRadius: 6, padding: "4px 10px" }}>
            {f} <ChevronDown size={14} />
          </button>
        ))}
      </div>

      {/* 표 */}
      <IndicatorTable years={years} section={section} />
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
        <Section key={s.id} years={data.years} section={s} />
      ))}
    </div>
  );
}
