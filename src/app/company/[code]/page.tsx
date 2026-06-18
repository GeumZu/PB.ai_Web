import { use } from "react";
import Sidebar from "@/components/layout/Sidebar";
import OverviewPage from "@/components/company/OverviewPage";

export default function CompanyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  return (
    <div className="flex" style={{ height: "100dvh" }}>
      <Sidebar />
      <OverviewPage code={code} />
    </div>
  );
}
