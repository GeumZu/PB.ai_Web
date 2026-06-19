"use client";

import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import { ChevronRight } from "lucide-react";
import { SectionTitle, ScoreBar } from "../shared";
import FinancialStatusBlock from "../FinancialStatusBlock";
import {
  PROFILE, REVENUE, TOTAL_REVENUE,
  HEALTH_ITEMS, HEALTH_SCORE, INDUSTRY, SECTION_DESC,
} from "@/lib/companyData";

function CompanyProfile() {
  return (
    <section>
      <SectionTitle num={1} description={SECTION_DESC.profile}>기업 프로필</SectionTitle>
      <div>
        <div className="flex" style={{ borderBottom: "1px solid #d7d9db", paddingBottom: 8 }}>
          <span style={{ width: 180, fontSize: 15, color: "#191b1c", flexShrink: 0 }}>구분</span>
          <span style={{ fontSize: 15, color: "#191b1c" }}>내용</span>
        </div>
        {PROFILE.map(({ label, value }) => (
          <div key={label} className="flex" style={{ borderBottom: "1px solid #f0f0f0", padding: "14px 0" }}>
            <span style={{ width: 180, fontSize: 17, color: "#191b1c", flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 17, color: "#191b1c", flex: 1 }}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RevenueComposition() {
  return (
    <section>
      <SectionTitle num={2} description={SECTION_DESC.revenue}>매출 산업 구성</SectionTitle>
      <div className="flex items-center gap-8" style={{ background: "#f7f9fb", borderRadius: 10, padding: "20px 32px" }}>
        <div style={{ width: 214, height: 214, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={REVENUE} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" startAngle={90} endAngle={-270}>
                {REVENUE.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          <div style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 13, color: "#6b6d6f" }}>총 매출액</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: "#191b1c" }}>{TOTAL_REVENUE}</p>
          </div>
          {REVENUE.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: "#191b1c", width: 80 }}>{d.name}</span>
              <span style={{ fontSize: 14, color: "#6b6d6f" }}>{Math.abs(d.value)}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinancialHealth() {
  return (
    <section>
      <SectionTitle num={4} description={SECTION_DESC.health}>재무건전성</SectionTitle>
      <div className="flex gap-[5px] flex-wrap" style={{ marginBottom: 20 }}>
        {HEALTH_ITEMS.map((item) => (
          <div key={item.label} style={{ width: 100, height: 100, border: "1px solid #0042fb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontSize: 15, color: "#191b1c" }}>{item.label}</span>
            <span style={{ fontSize: 15, color: "#0042fb", fontWeight: 600 }}>{item.grade}</span>
          </div>
        ))}
      </div>
      <ScoreBar score={HEALTH_SCORE} />
      <div className="flex items-center gap-1" style={{ marginTop: 16 }}>
        <ChevronRight size={14} color="#4d76d4" />
        <span style={{ fontSize: 12, color: "#4d76d4", cursor: "pointer" }}>재무 건전성 상세하게 알아보기</span>
      </div>
    </section>
  );
}

function IndustryDescription() {
  return (
    <section>
      <SectionTitle num={5} description={SECTION_DESC.industry}>산업 설명</SectionTitle>
      <div style={{ border: "1px solid #d7d9db", borderRadius: 4, overflow: "hidden" }}>
        {INDUSTRY.map(({ label, value }, i) => (
          <div key={label} className="flex" style={{ borderBottom: i < INDUSTRY.length - 1 ? "1px solid #d7d9db" : "none" }}>
            <div style={{ width: 174, padding: "12px 24px", background: "#f7f9fb", borderRight: "1px solid #d7d9db", fontSize: 15, color: "#191b1c", flexShrink: 0 }}>{label}</div>
            <div style={{ flex: 1, padding: "12px 24px", fontSize: 15, color: "#191b1c" }}>{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function OverviewSection() {
  return (
    <div className="flex flex-col" style={{ gap: 64 }}>
      <CompanyProfile />
      <RevenueComposition />
      <FinancialStatusBlock num={3} title="재무 현황" description={SECTION_DESC.financial} />
      <FinancialHealth />
      <IndustryDescription />
    </div>
  );
}
