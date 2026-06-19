"use client";

import {
  Bar, BarChart, Line, XAxis, YAxis, CartesianGrid,
  Legend, Tooltip as ReTooltip, ResponsiveContainer, ComposedChart,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionTitle } from "./shared";
import { useFinancialOverview } from "@/lib/api/hooks";

const SIT_COLS = ["년도", "매출액", "자산 총계", "부채 총계", "자본 총계", "영업이익", "순이익"];
const SIT_KEYS = ["year", "매출액", "자산총계", "부채총계", "자본총계", "영업이익", "순이익"] as const;

function formatYAxis(value: number) {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}조`;
  if (value >= 1000)  return `${(value / 1000).toFixed(0)}천억`;
  return `${value}억`;
}

// 호버 툴팁: 반투명(50%, 뒤 비침) + corner radius 8
const TOOLTIP_STYLE = {
  fontSize: 12,
  borderRadius: 8,
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(2px)",
  WebkitBackdropFilter: "blur(2px)",
  border: "1px solid rgba(232, 232, 232, 0.6)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
} as const;

/**
 * 기업 Overview의 "재무 현황"과 재무현황분석의 "재무 상황"이 공유하는 블록.
 * (매출액 막대차트 + 매출액·순이익 복합차트 + 5년 표)
 */
export default function FinancialStatusBlock({
  code,
  num,
  title,
  description,
}: {
  code: string;
  num?: number;
  title: string;
  description?: React.ReactNode;
}) {
  const { data, isLoading } = useFinancialOverview(code);

  return (
    <section>
      <SectionTitle num={num} description={description}>{title}</SectionTitle>

      {isLoading || !data ? (
        <Skeleton className="h-[460px] w-full" />
      ) : (
        <>
          {/* 차트 2개 */}
          <div className="flex gap-3" style={{ minWidth: 0, marginBottom: 16 }}>
            {/* 좌: 매출액 막대 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data.plData} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={48} />
                  <ReTooltip cursor={{ fill: "transparent" }} formatter={(v: number) => `${v.toLocaleString()}억`} contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="매출액" fill="#f4c75e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* 우: 매출액 막대 + 순이익 선 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={data.plData} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={48} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={v => `${(v/1000).toFixed(1)}천`} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={40} />
                  <ReTooltip cursor={{ fill: "transparent" }} formatter={(v: number) => `${v.toLocaleString()}억`} contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar yAxisId="left" dataKey="매출액" fill="#5797f7" radius={[8, 8, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="순이익" stroke="#ed5b9a" strokeWidth={2} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
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
          <div>
            <div className="flex" style={{ background: "#fafbfc", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0", padding: "12px 0" }}>
              {SIT_COLS.map((c, i) => (
                <div key={c} style={{ flex: 1, textAlign: i === 0 ? "left" : "center", fontSize: 13, color: "#6b6d6f", paddingLeft: i === 0 ? 8 : 0 }}>{c}</div>
              ))}
            </div>
            {data.situation.map((row) => (
              <div key={row.year} className="flex items-center" style={{ borderBottom: "1px solid #f3f3f3", padding: "14px 0" }}>
                {SIT_KEYS.map((k, i) => (
                  <div key={k} style={{ flex: 1, textAlign: i === 0 ? "left" : "center", fontSize: 14, color: "#191b1c", paddingLeft: i === 0 ? 8 : 0 }}>
                    {row[k]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
