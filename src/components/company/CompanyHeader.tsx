"use client";

export const COMPANY_TABS = [
  { id: "overview",  label: "기업 Overview",  badge: "7"   },
  { id: "financial", label: "재무현황분석",   badge: "99+" },
  { id: "invest",    label: "투자지표",        badge: "2"   },
  { id: "valuation", label: "주식가치평가",   badge: "2"   },
  { id: "chat",      label: "채팅",            badge: "2"   },
];

interface CompanyHeaderProps {
  name: string;
  code: string;
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function CompanyHeader({ name, code, activeTab, onTabChange }: CompanyHeaderProps) {
  return (
    <div
      className="sticky top-0 bg-white z-20"
      style={{ borderBottom: "1px solid #f0f0f0", padding: "20px 0 0" }}
    >
      <div className="mx-auto" style={{ maxWidth: 920, paddingLeft: 24, paddingRight: 24 }}>
        {/* 회사 이름 */}
        <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 40, height: 40, background: "#f0f0f0", fontSize: 14, fontWeight: 700, color: "#191b1c", flexShrink: 0 }}
          >
            {name.charAt(0)}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#191b1c" }}>
            {name}({code})
          </h1>
        </div>

        {/* 탭 */}
        <div className="flex gap-8 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {COMPANY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
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
  );
}
