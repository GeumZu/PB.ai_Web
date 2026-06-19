"use client";

import { SectionTitle, SubTitle, ScoreBar } from "../shared";
import MetricTable from "../MetricTable";
import FinancialStatusBlock from "../FinancialStatusBlock";
import {
  HEALTH_ITEMS, HEALTH_SCORE, RATIO_SUMMARY, SECTION_DESC,
  LIQUIDITY, LEVERAGE, INVEST_PROFIT, SALES_MARGIN, GROWTH, ACTIVITY,
} from "@/lib/companyData";

// ── 2. 재무 비율 판정 ─────────────────────────────────────
function RatioJudgment() {
  const flat = RATIO_SUMMARY;

  return (
    <section>
      <SectionTitle num={2} description={SECTION_DESC.ratio}>재무 비율 판정</SectionTitle>

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
function AnalysisGroup({ num, title, description, subs }: {
  num: number;
  title: string;
  description?: React.ReactNode;
  subs: { sub: string; rows: typeof LIQUIDITY }[];
}) {
  return (
    <section>
      <SectionTitle num={num} description={description}>{title}</SectionTitle>
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
      <FinancialStatusBlock num={1} title="재무 상황" description={SECTION_DESC.situation} />
      <RatioJudgment />
      <AnalysisGroup num={3} title="안정성 분석" description={SECTION_DESC.stability} subs={[
        { sub: "3.1. 유동성 분석", rows: LIQUIDITY },
        { sub: "3.2. 레버리지 분석", rows: LEVERAGE },
      ]} />
      <AnalysisGroup num={4} title="수익성 분석" description={SECTION_DESC.profitability} subs={[
        { sub: "4.1. 투자수익성 분석", rows: INVEST_PROFIT },
        { sub: "4.2. 판매마진 분석", rows: SALES_MARGIN },
      ]} />
      <AnalysisGroup num={5} title="성장성 분석" description={SECTION_DESC.growth} subs={[
        { sub: "", rows: GROWTH },
      ]} />
      <AnalysisGroup num={6} title="활동성 분석" description={SECTION_DESC.activity} subs={[
        { sub: "", rows: ACTIVITY },
      ]} />
    </div>
  );
}
