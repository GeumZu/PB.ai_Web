"use client";

import { useState } from "react";
import CompanyHeader from "./CompanyHeader";
import { ChatButton } from "./shared";
import OverviewSection from "./sections/OverviewSection";
import FinancialSection from "./sections/FinancialSection";
import IndicatorsSection from "./sections/IndicatorsSection";
import ValuationSection from "./sections/ValuationSection";
import { COMPANY } from "@/lib/companyData";

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: 400, color: "#8c8c8c", fontSize: 16 }}>
      {label} 화면은 준비 중이에요
    </div>
  );
}

export default function CompanyReport({ code }: { code: string }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="flex-1 overflow-y-auto relative bg-white">
      <CompanyHeader
        name={COMPANY.name}
        code={code}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mx-auto" style={{ maxWidth: 920, padding: "40px 24px 80px" }}>
        {activeTab === "overview"  && <OverviewSection code={code} />}
        {activeTab === "financial" && <FinancialSection code={code} />}
        {activeTab === "invest"    && <IndicatorsSection code={code} />}
        {activeTab === "valuation" && <ValuationSection code={code} />}
        {activeTab === "chat"      && <Placeholder label="채팅" />}
      </div>

      <ChatButton />
    </main>
  );
}
