"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { MetricRow } from "@/lib/companyData";
import { METRIC_SUBROWS, SUBROW_AMOUNTS } from "@/lib/companyData";

const COLS = ["2023", "시계열평균", "업종중위수", "시계열점수", "업종점수"];

export default function MetricTable({ rows }: { rows: MetricRow[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (name: string) => setOpen((o) => ({ ...o, [name]: !o[name] }));

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
      {rows.map((row) => {
        const subs = METRIC_SUBROWS[row.name];
        const expandable = !!subs;
        const isOpen = !!open[row.name];
        return (
          <div key={row.name}>
            {/* 지표 행 */}
            <div
              className="flex items-center"
              style={{ borderBottom: "1px solid #f3f3f3", padding: "14px 0" }}
            >
              <div className="flex items-center gap-1.5" style={{ flex: 2 }}>
                <span style={{ fontSize: 15, color: "#191b1c" }}>{row.name}</span>
                {expandable && (
                  <button
                    onClick={() => toggle(row.name)}
                    className="flex items-center justify-center rounded transition-colors hover:bg-[#e5f2fe]"
                    style={{ width: 18, height: 18, border: "1px solid #c5d9fd", flexShrink: 0 }}
                    aria-label={`${row.name} ${isOpen ? "접기" : "펼치기"}`}
                  >
                    {isOpen ? <Minus size={12} color="#5797f7" /> : <Plus size={12} color="#5797f7" />}
                  </button>
                )}
              </div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#191b1c" }}>{row.y2023}</div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#6b8fc7" }}>{row.avg}</div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#6b8fc7" }}>{row.median}</div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#191b1c" }}>{row.tScore}</div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 15, color: "#191b1c" }}>{row.iScore}</div>
            </div>

            {/* 펼침: 계산식 구성요소 (분자/분모) */}
            {expandable && isOpen &&
              subs.map((sub, i) => (
                <div
                  key={sub}
                  className="flex items-center"
                  style={{ borderBottom: "1px solid #f3f3f3", padding: "12px 0", background: "#fafbfc" }}
                >
                  <div className="flex items-center" style={{ flex: 2, paddingLeft: 16 }}>
                    <span style={{ fontSize: 14, color: "#6b6d6f" }}>{sub}</span>
                  </div>
                  {[0, 1, 2].map((c) => (
                    <div key={c} style={{ flex: 1, textAlign: "center", fontSize: 14, color: "#6b6d6f" }}>
                      {SUBROW_AMOUNTS[i] ?? SUBROW_AMOUNTS[0]}
                    </div>
                  ))}
                  <div style={{ flex: 1, textAlign: "center", fontSize: 14, color: "#b3b5b7" }}>-</div>
                  <div style={{ flex: 1, textAlign: "center", fontSize: 14, color: "#b3b5b7" }}>-</div>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}
