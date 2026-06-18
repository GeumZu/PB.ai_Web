import { use } from "react";
import Sidebar from "@/components/layout/Sidebar";
import CompanyReport from "@/components/company/CompanyReport";

export default function CompanyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  return (
    <div className="flex" style={{ height: "100dvh" }}>
      <Sidebar />
      <CompanyReport code={code} />
    </div>
  );
}
