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

// 기간 라벨: "2025/06" → "25년 1-6월", "2024" → "2024년"
function formatPeriod(year: string) {
  if (year.includes("/")) {
    const [y] = year.split("/");
    return `${y.slice(2)}년 1-6월`;
  }
  return `${year}년`;
}

// 금액(억) → "₩2조 5000억"
function formatWon(value: number) {
  const jo = Math.floor(value / 10000);
  const eok = value % 10000;
  if (jo > 0 && eok > 0) return `₩${jo}조 ${eok}억`;
  if (jo > 0) return `₩${jo}조`;
  return `₩${value.toLocaleString()}억`;
}

interface TipEntry { name?: string; value?: number; color?: string; }
interface TipProps { active?: boolean; payload?: TipEntry[]; label?: string; }

// 호버 툴팁 (Figma Frame 1260: pad 8, gap 4, r8, 반투명 50%)
function ChartTooltip({ active, payload, label }: TipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        borderRadius: 8,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span style={{ fontSize: 12, color: "#58595b" }}>{formatPeriod(label ?? "")}</span>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center" style={{ gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: p.color, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "#58595b" }}>{p.name}</span>
          <span style={{ fontSize: 13, color: "#191b1c", marginLeft: 4 }}>{formatWon(Number(p.value))}</span>
        </div>
      ))}
    </div>
  );
}

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
                  <ReTooltip cursor={{ fill: "transparent" }} content={<ChartTooltip />} />
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
                  <ReTooltip cursor={{ fill: "transparent" }} content={<ChartTooltip />} />
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
