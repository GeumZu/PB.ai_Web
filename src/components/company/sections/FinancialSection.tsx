"use client";

import {
  Bar, BarChart, Line, XAxis, YAxis, CartesianGrid,
  Legend, Tooltip as ReTooltip, ResponsiveContainer, ComposedChart,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { SectionTitle, SubTitle, ScoreBar } from "../shared";
import MetricTable from "../MetricTable";
import {
  PL_DATA, FINANCIAL_SITUATION, HEALTH_ITEMS, HEALTH_SCORE, RATIO_SUMMARY,
  LIQUIDITY, LEVERAGE, INVEST_PROFIT, SALES_MARGIN, GROWTH, ACTIVITY,
} from "@/lib/companyData";

const SIT_COLS = ["년도", "매출액", "자산 총계", "부채 총계", "자본 총계", "영업이익", "순이익"];
const SIT_KEYS = ["year", "매출액", "자산총계", "부채총계", "자본총계", "영업이익", "순이익"] as const;

function formatYAxis(value: number) {
  if (value >= 10000) return `${(value / 10000).toFixed(0)}조`;
  if (value >= 1000)  return `${(value / 1000).toFixed(0)}천억`;
  return `${value}억`;
}

// ── 1. 재무 상황 ──────────────────────────────────────────
function FinancialSituation() {
  return (
    <section>
      <SectionTitle>1. 재무 상황</SectionTitle>

      {/* 차트 2개 */}
      <div className="flex gap-3" style={{ minWidth: 0, marginBottom: 24 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={PL_DATA} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={44} />
              <ReTooltip formatter={(v: number) => `${v.toLocaleString()}억`} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e8e8e8" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="매출액" fill="#f4d58a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={PL_DATA} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `${(v/1000).toFixed(0)}`} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={32} />
              <ReTooltip formatter={(v: number) => `${v.toLocaleString()}억`} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e8e8e8" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="매출액" fill="#5797f7" radius={[3, 3, 0, 0]} />
              <Line type="monotone" dataKey="순이익" stroke="#f4a93a" strokeWidth={2} dot={{ r: 3 }} />
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
        {FINANCIAL_SITUATION.map((row) => (
          <div key={row.year} className="flex items-center" style={{ borderBottom: "1px solid #f3f3f3", padding: "14px 0" }}>
            {SIT_KEYS.map((k, i) => (
              <div key={k} style={{ flex: 1, textAlign: i === 0 ? "left" : "center", fontSize: 14, color: "#191b1c", paddingLeft: i === 0 ? 8 : 0 }}>
                {row[k]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 2. 재무 비율 판정 ─────────────────────────────────────
function RatioJudgment() {
  const flat = RATIO_SUMMARY;

  return (
    <section>
      <SectionTitle>2. 재무 비율 판정</SectionTitle>

      {/* 점수 바 */}
      <div style={{ marginBottom: 24 }}>
        <ScoreBar score={HEALTH_SCORE} />
      </div>

      {/* 6개 박스 */}
      <div className="flex gap-2" style={{ marginBottom: 40 }}>
        {HEALTH_ITEMS.map((item) => (
          <div key={item.label} style={{ flex: 1, height: 100, border: "1px solid #0042fb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontSize: 15, color: "#191b1c" }}>{item.label}</span>
            <span style={{ fontSize: 15, color: "#191b1c" }}>{item.grade}</span>
          </div>
        ))}
      </div>

      {/* 요약 표 */}
      <div>
        {/* 그룹 헤더 (안정성/수익성/활동성/성장성) */}
        <div className="flex" style={{ paddingBottom: 8 }}>
          <div style={{ flex: 1, fontSize: 14, color: "#191b1c", fontWeight: 600 }}>지표</div>
          <div style={{ flex: 2, textAlign: "center", fontSize: 13, color: "#8c8c8c", borderBottom: "1px solid #e8e8e8", paddingBottom: 4 }}>안정성</div>
          <div style={{ flex: 2, textAlign: "center", fontSize: 13, color: "#8c8c8c", borderBottom: "1px solid #e8e8e8", paddingBottom: 4 }}>수익성</div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 13, color: "#8c8c8c" }}>활동성</div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 13, color: "#8c8c8c" }}>성장성</div>
        </div>
        {/* 세부 라벨 */}
        <div className="flex" style={{ borderBottom: "1px solid #e8e8e8", paddingBottom: 12, paddingTop: 4 }}>
          <div style={{ flex: 1 }} />
          {flat.map((r) => (
            <div key={r.label} style={{ flex: 1, textAlign: "center", fontSize: 13, color: "#8c8c8c" }}>{r.label}</div>
          ))}
        </div>
        {/* 지표 점수 */}
        <div className="flex items-center" style={{ borderBottom: "1px solid #f3f3f3", padding: "14px 0" }}>
          <div style={{ flex: 1, fontSize: 15, color: "#191b1c", fontWeight: 600 }}>지표 점수</div>
          {flat.map((r) => (
            <div key={r.label} style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#191b1c" }}>{r.score}</div>
          ))}
        </div>
        {/* 지표 판정 */}
        <div className="flex items-center" style={{ padding: "14px 0" }}>
          <div style={{ flex: 1, fontSize: 15, color: "#191b1c", fontWeight: 600 }}>지표 판정</div>
          {flat.map((r) => (
            <div key={r.label} style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#191b1c" }}>{r.grade}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 그룹 섹션 (제목 + 서브표) ─────────────────────────────
function AnalysisGroup({ title, subs }: { title: string; subs: { sub: string; rows: typeof LIQUIDITY }[] }) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="flex flex-col" style={{ gap: 40 }}>
        {subs.map(({ sub, rows }) => (
          <div key={sub}>
            {sub && <SubTitle>{sub}</SubTitle>}
            <MetricTable rows={rows} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FinancialSection() {
  return (
    <div className="flex flex-col" style={{ gap: 64 }}>
      <FinancialSituation />
      <RatioJudgment />
      <AnalysisGroup title="3. 안정성 분석" subs={[
        { sub: "3.1. 유동성 분석", rows: LIQUIDITY },
        { sub: "3.2. 레버리지 분석", rows: LEVERAGE },
      ]} />
      <AnalysisGroup title="4. 수익성 분석" subs={[
        { sub: "4.1. 투자수익성 분석", rows: INVEST_PROFIT },
        { sub: "4.2. 판매마진 분석", rows: SALES_MARGIN },
      ]} />
      <AnalysisGroup title="5. 성장성 분석" subs={[
        { sub: "", rows: GROWTH },
      ]} />
      <AnalysisGroup title="6. 활동성 분석" subs={[
        { sub: "", rows: ACTIVITY },
      ]} />
    </div>
  );
}
