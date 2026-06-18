"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip,
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Legend, ResponsiveContainer, ComposedChart,
} from "recharts";
import { MessageSquare, ChevronRight } from "lucide-react";

// ── 데이터 ──────────────────────────────────────────────
const COMPANY = {
  name: "농심",
  code: "004370",
  profile: [
    { label: "시가총액",        value: "2조 3,266억원" },
    { label: "상장일자",        value: "1976년 6월 30일" },
    { label: "설립일자",        value: "1965년" },
    { label: "종업원수",        value: "5,401명" },
    { label: "대표 이사",       value: "이병학" },
    { label: "발행주식수",      value: "6,082,642주 (25년 7월 29일 기준)" },
    { label: "주요 계열사/관계사", value: "농심홀딩스, 농심켈로그, 농심엔지니어링, 태경농산, 호텔농심" },
  ],
};

const REVENUE_DATA = [
  { name: "라면",      value: 81.8, color: "#5797f7" },
  { name: "스낵",      value: 14.4, color: "#62c6a8" },
  { name: "기타",      value: 18.4, color: "#f4b942" },
  { name: "에누리등",  value: 14.5, color: "#e8e8e8" },
];

const PL_DATA = [
  { year: "2020", 매출액: 27000, 영업이익: 1603, 순이익: 1490 },
  { year: "2021", 매출액: 29000, 영업이익: 1061, 순이익: 996  },
  { year: "2022", 매출액: 31000, 영업이익: 1121, 순이익: 1160 },
  { year: "2023", 매출액: 30500, 영업이익: 2120, 순이익: 1714 },
  { year: "2024", 매출액: 31000, 영업이익: 1630, 순이익: 1576 },
];

const BS_DATA = [
  { year: "2020", 자산총계: 27255, 부채총계: 6765, 자본총계: 20489 },
  { year: "2021", 자산총계: 28999, 부채총계: 6991, 자본총계: 22007 },
  { year: "2022", 자산총계: 30347, 부채총계: 7193, 자본총계: 23153 },
  { year: "2023", 자산총계: 32347, 부채총계: 7939, 자본총계: 24408 },
  { year: "2024", 자산총계: 35974, 부채총계: 9248, 자본총계: 26725 },
];

const HEALTH_ITEMS = [
  { label: "유동성",   grade: "안전", color: "#0042fb" },
  { label: "레버리지", grade: "안전", color: "#0042fb" },
  { label: "투자수익성", grade: "안전", color: "#0042fb" },
  { label: "판매마진", grade: "안전", color: "#0042fb" },
  { label: "활동성",   grade: "안전", color: "#0042fb" },
  { label: "성장성",   grade: "안전", color: "#0042fb" },
];

const INDUSTRY_DATA = [
  { label: "산업명",          value: "식료품 제조업(C10)" },
  { label: "평가기준일",      value: "2025.06" },
  { label: "산업평가 종합등급", value: "2(양호)" },
  { label: "여신정책",        value: "선별확대" },
];

const TABS = [
  { id: "overview",  label: "기업 Overview",  badge: "99+" },
  { id: "financial", label: "재무현황분석",   badge: "7"   },
  { id: "invest",    label: "투자지표",        badge: "2"   },
  { id: "valuation", label: "주식가치평가",   badge: "2"   },
  { id: "chat",      label: "채팅",            badge: "2"   },
];

// ── 섹션 제목 ────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 24, fontWeight: 600, color: "#191b1c", marginBottom: 24 }}>
      {children}
    </h2>
  );
}

// ── 기업 프로필 ──────────────────────────────────────────
function CompanyProfile() {
  return (
    <section>
      <SectionTitle>기업 프로필</SectionTitle>
      <div>
        <div className="flex" style={{ borderBottom: "1px solid #d7d9db", paddingBottom: 8, marginBottom: 0 }}>
          <span style={{ width: 180, fontSize: 15, color: "#191b1c", flexShrink: 0 }}>구분</span>
          <span style={{ fontSize: 15, color: "#191b1c" }}>내용</span>
        </div>
        {COMPANY.profile.map(({ label, value }) => (
          <div
            key={label}
            className="flex"
            style={{ borderBottom: "1px solid #f0f0f0", padding: "14px 0" }}
          >
            <span style={{ width: 180, fontSize: 17, color: "#191b1c", flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 17, color: "#191b1c", flex: 1 }}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 매출 산업 구성 ────────────────────────────────────────
function RevenueComposition() {
  const COLORS = REVENUE_DATA.map(d => d.color);
  return (
    <section>
      <SectionTitle>매출 산업 구성</SectionTitle>
      <div
        className="flex items-center gap-8"
        style={{ background: "#f7f9fb", borderRadius: 10, padding: "20px 32px" }}
      >
        {/* 도넛 차트 */}
        <div style={{ width: 214, height: 214, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={REVENUE_DATA}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={95}
                dataKey="value"
                startAngle={90} endAngle={-270}
              >
                {REVENUE_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 총 매출액 + 범례 */}
        <div className="flex flex-col gap-2">
          <div style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 13, color: "#6b6d6f" }}>총 매출액</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: "#191b1c" }}>34,387억</p>
          </div>
          {REVENUE_DATA.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: "#191b1c", width: 80 }}>{d.name}</span>
              <span style={{ fontSize: 14, color: "#6b6d6f" }}>{d.value > 0 ? "" : "-"}{Math.abs(d.value)}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 재무 현황 ─────────────────────────────────────────────
function formatYAxis(value: number) {
  if (value >= 10000) return `${(value / 10000).toFixed(0)}조`;
  if (value >= 1000)  return `${(value / 1000).toFixed(0)}천억`;
  return `${value}억`;
}

function FinancialStatus() {
  return (
    <section>
      <SectionTitle>재무 현황</SectionTitle>
      <div className="flex gap-3" style={{ minWidth: 0 }}>
        {/* 손익 현황 */}
        <div className="bg-white rounded-xl" style={{ flex: 1, minWidth: 0, border: "1px solid #f0f0f0", padding: "20px 16px" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#191b1c", marginBottom: 16 }}>주요 손익 현황</p>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={PL_DATA} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={48} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={v => `${(v/1000).toFixed(1)}천`} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={44} />
              <ReTooltip
                formatter={(value: number, name: string) => [`${value.toLocaleString()}억`, name]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e8e8e8" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="매출액" fill="#c5d9fd" radius={[3, 3, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="영업이익" stroke="#5797f7" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="순이익" stroke="#62c6a8" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* 재무상태 */}
        <div className="bg-white rounded-xl" style={{ flex: 1, minWidth: 0, border: "1px solid #f0f0f0", padding: "20px 16px" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#191b1c", marginBottom: 16 }}>주요 재무 상태</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={BS_DATA} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={48} />
              <ReTooltip
                formatter={(value: number, name: string) => [`${value.toLocaleString()}억`, name]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e8e8e8" }}
              />
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

// ── 재무건전성 ────────────────────────────────────────────
function FinancialHealth() {
  const score = 0.855;
  const pct = ((score - (-1)) / 2) * 100; // -1~1 range → 0~100%

  return (
    <section>
      <SectionTitle>재무건전성</SectionTitle>
      <p style={{ fontSize: 17, color: "#191b1c", marginBottom: 20 }}>
        농심의 재무건전성은 필수소비재 섹터 업종 중위수와 시계열 점수로 판정됩니다
      </p>

      {/* 6개 박스 */}
      <div className="flex gap-[5px] flex-wrap" style={{ marginBottom: 20 }}>
        {HEALTH_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              width: 100, height: 100, border: `1px solid ${item.color}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <span style={{ fontSize: 15, color: "#191b1c" }}>{item.label}</span>
            <span style={{ fontSize: 15, color: item.color, fontWeight: 600 }}>{item.grade}</span>
          </div>
        ))}
      </div>

      {/* 점수 바 */}
      <div style={{ position: "relative", marginBottom: 8, marginTop: 28 }}>
        {/* 삼각형 마커 */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: `calc(${pct}% - 10px)`,
            width: 0, height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "14px solid #3c3c3c",
          }}
        />
        <div style={{ fontSize: 13, color: "#191b1c", position: "absolute", bottom: 28, left: `calc(${pct}% - 16px)` }}>
          {score}
        </div>

        {/* 색상 바 */}
        <div className="flex" style={{ height: 5, borderRadius: 3, overflow: "hidden", marginTop: 8 }}>
          <div style={{ flex: 151, background: "#eb0d0d" }} />
          <div style={{ flex: 294, background: "#ffa353" }} />
          <div style={{ flex: 143, background: "#0042fb" }} />
        </div>

        {/* 레이블 */}
        <div className="flex justify-between" style={{ marginTop: 4 }}>
          {["-1", "-0.5", "0", "0.5", "1"].map((l) => (
            <span key={l} style={{ fontSize: 13, color: "#191b1c" }}>{l}</span>
          ))}
        </div>
      </div>

      {/* 상세 링크 */}
      <div className="flex items-center gap-1" style={{ marginTop: 16 }}>
        <ChevronRight size={14} color="#4d76d4" />
        <span style={{ fontSize: 12, color: "#4d76d4", cursor: "pointer" }}>재무 건전성 상세하게 알아보기</span>
      </div>
    </section>
  );
}

// ── 산업 설명 ─────────────────────────────────────────────
function IndustryDescription() {
  return (
    <section>
      <SectionTitle>산업 설명</SectionTitle>
      <div style={{ border: "1px solid #d7d9db", borderRadius: 4, overflow: "hidden" }}>
        {INDUSTRY_DATA.map(({ label, value }, i) => (
          <div key={label} className="flex" style={{ borderBottom: i < INDUSTRY_DATA.length - 1 ? "1px solid #d7d9db" : "none" }}>
            <div
              style={{
                width: 174, padding: "12px 24px",
                background: "#f7f9fb", borderRight: "1px solid #d7d9db",
                fontSize: 15, color: "#191b1c", flexShrink: 0,
              }}
            >
              {label}
            </div>
            <div style={{ flex: 1, padding: "12px 24px", fontSize: 15, color: "#191b1c" }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 메인 ─────────────────────────────────────────────────
export default function OverviewPage({ code }: { code: string }) {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  return (
    <main className="flex-1 overflow-y-auto relative bg-white">
      {/* 스티키 헤더 */}
      <div
        className="sticky top-0 bg-white z-20"
        style={{ borderBottom: "1px solid #f0f0f0", padding: "20px 0 0" }}
      >
        <div className="mx-auto" style={{ maxWidth: 748, paddingLeft: 24, paddingRight: 24 }}>
          {/* 회사 이름 */}
          <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 40, height: 40, background: "#f0f0f0", fontSize: 14, fontWeight: 700, color: "#191b1c", flexShrink: 0 }}
            >
              농
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#191b1c" }}>
              {COMPANY.name}({COMPANY.code})
            </h1>
          </div>

          {/* 탭 */}
          <div className="flex gap-8 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative pb-3 flex items-center gap-1.5 transition-colors shrink-0"
                style={{
                  fontSize: 15,
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? "#191b1c" : "#8c8c8c",
                  borderBottom: activeTab === tab.id ? "2px solid #5797f7" : "2px solid transparent",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
                {tab.badge && (
                  <span
                    style={{
                      fontSize: 10, fontWeight: 600,
                      background: activeTab === tab.id ? "#5797f7" : "#e0e0e0",
                      color: activeTab === tab.id ? "#fff" : "#8c8c8c",
                      borderRadius: 20, padding: "1px 5px",
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="mx-auto" style={{ maxWidth: 748, padding: "40px 24px 80px" }}>
        <div className="flex flex-col" style={{ gap: 64 }}>
          <CompanyProfile />
          <RevenueComposition />
          <FinancialStatus />
          <FinancialHealth />
          <IndustryDescription />
        </div>
      </div>

      {/* New chat 버튼 (우측 고정) */}
      <div
        className="fixed flex flex-col items-center justify-center gap-3 cursor-pointer"
        style={{
          right: 0, top: "50%", transform: "translateY(-50%)",
          width: 52, height: 237,
          background: "#64a6fa",
          borderRadius: "8px 0 0 8px",
          zIndex: 30,
        }}
      >
        <MessageSquare size={18} color="#fff" />
        <span
          style={{
            fontSize: 15, fontWeight: 500, color: "#fff",
            writingMode: "vertical-rl", textOrientation: "mixed",
            letterSpacing: 2,
          }}
        >
          New chat
        </span>
      </div>
    </main>
  );
}
