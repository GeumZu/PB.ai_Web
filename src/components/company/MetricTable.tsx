"use client";

import { Plus } from "lucide-react";
import type { MetricRow } from "@/lib/companyData";

const COLS = ["2023", "시계열평균", "업종중위수", "시계열점수", "업종점수"];

export default function MetricTable({ rows }: { rows: MetricRow[] }) {
  return (
    <div style={{ width: "100%" }}>
      {/* 헤더 */}
      <div
        className="flex"
        style={{
          background: "#fafbfc",
          borderTop: "1px solid #f0f0f0",
          borderBottom: "1px solid #f0f0f0",
          padding: "12px 0",
        }}
      >
        <div style={{ flex: 2 }} />
        {COLS.map((c) => (
          <div key={c} style={{ flex: 1, textAlign: "center", fontSize: 14, color: "#6b6d6f" }}>
            {c}
          </div>
        ))}
      </div>

      {/* 행 */}
      {rows.map((row) => (
        <div
          key={row.name}
          className="flex items-center"
          style={{ borderBottom: "1px solid #f3f3f3", padding: "14px 0" }}
        >
          {/* 지표명 + 플러스 아이콘 */}
          <div className="flex items-center gap-1.5" style={{ flex: 2 }}>
            <span style={{ fontSize: 15, color: "#191b1c" }}>{row.name}</span>
            <button
              className="flex items-center justify-center rounded"
              style={{ width: 18, height: 18, border: "1px solid #c5d9fd", flexShrink: 0 }}
              aria-label={`${row.name} 펼치기`}
            >
              <Plus size={12} color="#5797f7" />
            </button>
          </div>
          {/* 2023 (진한색) */}
          <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#191b1c" }}>{row.y2023}</div>
          {/* 시계열평균 / 업종중위수 (연한 파랑) */}
          <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#6b8fc7" }}>{row.avg}</div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#6b8fc7" }}>{row.median}</div>
          {/* 점수 */}
          <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#191b1c" }}>{row.tScore}</div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#191b1c" }}>{row.iScore}</div>
        </div>
      ))}
    </div>
  );
}
