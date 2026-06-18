"use client";

import {
  PieChart, Pie, Cell, Tooltip as ReTooltip,
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Legend, ResponsiveContainer, ComposedChart,
} from "recharts";
import { ChevronRight } from "lucide-react";
import { SectionTitle, ScoreBar } from "../shared";
import {
  PROFILE, REVENUE, TOTAL_REVENUE, PL_DATA, BS_DATA,
  HEALTH_ITEMS, HEALTH_SCORE, INDUSTRY,
} from "@/lib/companyData";

function formatYAxis(value: number) {
  if (value >= 10000) return `${(value / 10000).toFixed(0)}조`;
  if (value >= 1000)  return `${(value / 1000).toFixed(0)}천억`;
  return `${value}억`;
}

function CompanyProfile() {
  return (
    <section>
      <SectionTitle>기업 프로필</SectionTitle>
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
      <SectionTitle>매출 산업 구성</SectionTitle>
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

function FinancialStatus() {
  return (
    <section>
      <SectionTitle>재무 현황</SectionTitle>
      <div className="flex gap-3" style={{ minWidth: 0 }}>
        <div className="bg-white rounded-xl" style={{ flex: 1, minWidth: 0, border: "1px solid #f0f0f0", padding: "20px 16px" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#191b1c", marginBottom: 16 }}>주요 손익 현황</p>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={PL_DATA} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={48} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={v => `${(v/1000).toFixed(1)}천`} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={44} />
              <ReTooltip formatter={(value: number, name: string) => [`${value.toLocaleString()}억`, name]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e8e8e8" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="매출액" fill="#c5d9fd" radius={[3, 3, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="영업이익" stroke="#5797f7" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="순이익" stroke="#62c6a8" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl" style={{ flex: 1, minWidth: 0, border: "1px solid #f0f0f0", padding: "20px 16px" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#191b1c", marginBottom: 16 }}>주요 재무 상태</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={BS_DATA} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={48} />
              <ReTooltip formatter={(value: number, name: string) => [`${value.toLocaleString()}억`, name]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e8e8e8" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="자산총계" fill="#5797f7" radius={[3, 3, 0, 0]} />
              <Bar dataKey="부채총계" fill="#f4b942" radius={[3, 3, 0, 0]} />
              <Bar dataKey="자본총계" fill="#62c6a8" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function FinancialHealth() {
  return (
    <section>
      <SectionTitle>재무건전성</SectionTitle>
      <p style={{ fontSize: 17, color: "#191b1c", marginBottom: 20 }}>
        농심의 재무건전성은 필수소비재 섹터 업종 중위수와 시계열 점수로 판정됩니다
      </p>
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
      <SectionTitle>산업 설명</SectionTitle>
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
      <FinancialStatus />
      <FinancialHealth />
      <IndustryDescription />
    </div>
  );
}
