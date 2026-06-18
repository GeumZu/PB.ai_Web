"use client";

import { useState } from "react";
import { Plus, Search, Folder, PieChart, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const MENU = [
  { icon: Plus, label: "새로운 리포트" },
  { icon: Search, label: "리포트 검색" },
  { icon: Folder, label: "라이브러리" },
  { icon: PieChart, label: "포트폴리오" },
];

const REPORTS = ["삼성전자", "농심"];

const CHATS = [
  "미래에도 이익과 매출 상승세가 지속될 수 있는 구조인가요?",
  "현재 부채비율과 자본구조가 업계 평균 대비 어느 정도 수준인지 알 수 있나요?",
  "최근 3~5년간 매출·영업이익·순이익이 어떻게 변했으며, 그 원인은 무엇인가요?",
  "전체 수치 중에서 가장 주목해서 봐야 할 부분은 어디인가요?",
  "시가총액이 뭐예요? 왜 기업 가치를 나타내는 지표로 쓰이나요?",
];

function PBLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="22"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        fill="#64a6fa"
        letterSpacing="-1"
      >
        B
      </text>
    </svg>
  );
}

function SidebarToggleIcon({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="2.25" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5.75" y1="1" x2="5.75" y2="17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"reports" | "chats">("reports");

  return (
    <aside
      className={cn(
        "flex flex-col bg-[#f7f9fb] border-r border-[#e8e8e8] transition-all duration-300 shrink-0 h-full",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* ── 헤더 ── */}
      {collapsed ? (
        <div className="group relative flex items-center justify-center h-[60px] shrink-0">
          <div className="flex items-center justify-center group-hover:opacity-0 transition-opacity duration-150">
            <PBLogo size={32} />
          </div>
          <button
            onClick={() => setCollapsed(false)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            aria-label="사이드바 열기"
          >
            <SidebarToggleIcon className="text-[#191b1c]" />
          </button>
          <div className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 z-50 bg-[#191b1c] text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            사이드바 열기
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between px-5 h-[60px] shrink-0">
          <div className="flex items-center gap-2">
            <PBLogo size={28} />
            <span className="font-semibold text-sm text-[#191b1c]">PB.ai</span>
          </div>
          <button
            onClick={() => setCollapsed(true)}
            className="text-[#8c8c8c] hover:text-[#191b1c] transition-colors p-1 rounded-md hover:bg-[#efefef]"
            aria-label="사이드바 닫기"
          >
            <SidebarToggleIcon />
          </button>
        </div>
      )}

      {/* ── 메뉴 버튼 ── */}
      <div className={cn("space-y-0.5 shrink-0", collapsed ? "px-3 mt-1" : "px-3")}>
        {MENU.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className={cn(
              "flex items-center gap-3 w-full rounded-lg text-sm text-[#191b1c] hover:bg-[#efefef] transition-colors",
              collapsed ? "justify-center px-2 py-2" : "px-3 py-[7px]"
            )}
          >
            <Icon size={17} className="shrink-0 text-[#6c6c6c]" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </div>

      {/* ── 구분선 ── */}
      <div className="mx-3 mt-3 border-t border-black/10 shrink-0" />

      {/* ── 탭 + 콘텐츠 (펼친 상태에서만) ── */}
      {!collapsed && (
        <>
          {/* 탭 */}
          <div className="flex px-5 pt-3 gap-5 shrink-0">
            {(["reports", "chats"] as const).map((tab) => {
              const label = tab === "reports" ? "종목 리포트" : "채팅";
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-2 text-sm font-medium transition-colors relative",
                    activeTab === tab
                      ? "text-[#191b1c] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#191b1c] after:rounded-full"
                      : "text-[#8c8c8c] hover:text-[#191b1c]"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* 탭 콘텐츠 */}
          <div className="flex-1 overflow-y-auto px-3 pt-2 min-h-0">
            {activeTab === "reports" ? (
              <div className="space-y-0.5">
                {REPORTS.map((name) => (
                  <button
                    key={name}
                    className="w-full text-left px-3 py-[7px] text-sm text-[#191b1c] hover:bg-[#efefef] rounded-lg transition-colors truncate block"
                  >
                    {name}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-0.5">
                {CHATS.map((text, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-3 py-[7px] text-sm text-[#191b1c] hover:bg-[#efefef] rounded-lg transition-colors truncate block"
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      {collapsed && <div className="flex-1" />}

      {/* ── 하단 유저 ── */}
      <div className="shrink-0">
        <div className="mx-3 border-t border-black/10" />
        <div className={cn(
          "flex items-center h-[60px]",
          collapsed ? "justify-center px-3" : "justify-between px-5"
        )}>
          {!collapsed ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex items-center justify-center">
                  <span className="text-xs font-medium text-[#5c5c5c]">U</span>
                </div>
                <span className="text-sm font-medium text-[#191b1c]">User</span>
              </div>
              <button className="text-[#8c8c8c] hover:text-[#191b1c] transition-colors">
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <button className="text-[#8c8c8c] hover:text-[#191b1c] transition-colors">
              <LogOut size={17} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
