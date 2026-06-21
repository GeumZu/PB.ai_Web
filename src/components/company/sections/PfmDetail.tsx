"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
  Tooltip as ReTooltip, ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import {
  PFM_CHART, PFM_LINES, PFM_PREMIUM, PFM_CONCEPTS, PFM_FORMULA,
  PFM_VARS, PFM_WEIGHTS, PFM_CALC, PFM_TABLE_NB, PFM_TABLE_OB,
} from "@/lib/companyData";

const won = (v: number) => `₩${v.toLocaleString()}`;

// 저평가=초록 / 고평가=빨강 / 중립=회색
const toneColor = (t: string) => (t === "under" ? "#16a34a" : t === "over" ? "#eb0d0d" : "#6b6d6f");

// ── 카드 래퍼 ─────────────────────────────────────────────
function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #ebedf0", borderRadius: 12, background: "#fff", padding: 24 }}>
      <h3 style={{ fontSize: 20, fontWeight: 600, color: "#191b1c" }}>{title}</h3>
      {subtitle && <p style={{ fontSize: 14, color: "#8c8e90", marginTop: 4 }}>{subtitle}</p>}
      {children}
    </div>
  );
}

// ── 동종상장기업 데이터 표 ────────────────────────────────
function PfmTable({ t }: { t: typeof PFM_TABLE_NB }) {
  return (
    <Card title={t.title} subtitle={t.subtitle}>
      <div style={{ marginTop: 16, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f7f9fb" }}>
              {t.cols.map((c, i) => (
                <th key={c} style={{ padding: "10px 12px", textAlign: i === 0 ? "left" : "right", color: "#6b6d6f", fontWeight: 600, whiteSpace: "nowrap" }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r) => {
              const hot = r[0] === t.highlight;
              return (
                <tr key={r[0]} style={{ borderTop: "1px solid #f0f1f3", background: hot ? "#f3f8ff" : "transparent" }}>
                  {r.map((cell, i) => (
                    <td key={i} style={{ padding: "10px 12px", textAlign: i === 0 ? "left" : "right", color: i === 0 ? "#191b1c" : "#3c3d3f", fontWeight: i === 0 && hot ? 600 : 400, whiteSpace: "nowrap" }}>{cell}</td>
                  ))}
                </tr>
              );
            })}
            {/* 중위수 행 */}
            <tr style={{ borderTop: "1px solid #e7e9eb", background: "#fafbfc" }}>
              <td style={{ padding: "10px 12px" }}>
                <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "#5797f7", background: "#eef5ff", borderRadius: 6, padding: "2px 8px" }}>{t.median.label}</span>
              </td>
              {t.median.cells.map((c, i) => (
                <td key={i} style={{ padding: "10px 12px", textAlign: "right", color: "#3c3d3f", fontWeight: 600, whiteSpace: "nowrap" }}>{c}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function PfmDetail() {
  return (
    <div className="flex flex-col" style={{ gap: 24, paddingTop: 8 }}>
      {/* 1. PFM 차트 */}
      <div>
        <div className="flex justify-end gap-2" style={{ marginBottom: 8 }}>
          {["5년", "연간"].map((f) => (
            <button key={f} className="flex items-center gap-1" style={{ fontSize: 13, color: "#6b6d6f", border: "1px solid #e0e0e0", borderRadius: 6, padding: "4px 10px" }}>
              {f} <ChevronDown size={14} />
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={PFM_CHART} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} minTickGap={24} />
            <YAxis tickFormatter={(v) => v.toLocaleString()} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={56} domain={[200000, 500000]} />
            <ReTooltip
              formatter={(v, n) => [won(Number(v)), String(n)]}
              contentStyle={{ fontSize: 12, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.5)", backdropFilter: "blur(3px)", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {PFM_LINES.map((l) => (
              <Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2. 평가 프리미엄 */}
      <Card title="평가 프리미엄">
        <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 16 }}>
          {PFM_PREMIUM.map((p) => (
            <div key={p.label}>
              <div style={{ fontSize: 17, fontWeight: 600, color: "#191b1c" }}>{p.label} : {p.value}</div>
              <div style={{ fontSize: 14, marginTop: 6 }}>
                {p.delta && <span style={{ color: toneColor(p.tone), fontWeight: 600, marginRight: 6 }}>{p.delta}</span>}
                <span style={{ color: "#8c8e90" }}>{p.note}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. 핵심 개념 */}
      <Card title="유사기업이용법의 핵심 개념">
        <div className="flex flex-col" style={{ gap: 20, marginTop: 16 }}>
          {PFM_CONCEPTS.map((c) => (
            <div key={c.n} className="flex" style={{ gap: 12 }}>
              <div className="flex items-center justify-center" style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: "#eef5ff", color: "#5797f7", fontSize: 13, fontWeight: 600 }}>{c.n}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c" }}>{c.title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#58595b", marginTop: 4 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. 추정주가(P^M) 계산 과정 */}
      <Card title="추정주가(P^M) 계산 과정">
        {/* 산식 */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#191b1c", marginBottom: 8 }}>유사기업이용법(PFM) 산식</div>
          <div style={{ background: "#f7f9fb", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: "#3c3d3f", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{PFM_FORMULA}</div>
        </div>

        {/* 변수 설명 + 가중치 */}
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c", marginBottom: 10 }}>P(NB) 변수 설명</div>
            {PFM_VARS.map((v) => (
              <div key={v.sym} className="flex" style={{ gap: 8, fontSize: 14, padding: "4px 0" }}>
                <span style={{ color: "#5797f7", fontWeight: 600, minWidth: 46, flexShrink: 0 }}>{v.sym}:</span>
                <span style={{ color: "#58595b" }}>{v.desc}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c", marginBottom: 10 }}>주가배수 가중치</div>
            {PFM_WEIGHTS.items.map((it) => (
              <div key={it} style={{ fontSize: 14, color: "#58595b", padding: "4px 0" }}>{it}</div>
            ))}
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#8c8e90", marginTop: 8 }}>{PFM_WEIGHTS.note}</p>
          </div>
        </div>

        {/* P(NB) / P(OB) 계산 2열 */}
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
          {PFM_CALC.cols.map((col) => (
            <div key={col.title} style={{ background: "#f7f9fb", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#5797f7", marginBottom: 10 }}>{col.title}</div>
              {col.rows.map((r) => (
                <div key={r} style={{ fontSize: 13, color: "#3c3d3f", padding: "3px 0" }}>{r}</div>
              ))}
              <div style={{ borderTop: "1px solid #e7e9eb", marginTop: 10, paddingTop: 10 }}>
                <div style={{ fontSize: 12.5, color: "#6b6d6f", lineHeight: 1.5 }}>{col.formula}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#191b1c", marginTop: 4 }}>= {col.result}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 최종 추정주가 */}
        <div className="flex items-center justify-between" style={{ background: "#eef5ff", borderRadius: 10, padding: "16px 24px", marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c" }}>최종 추정주가</div>
            <div style={{ fontSize: 13, color: "#6b6d6f", marginTop: 2 }}>{PFM_CALC.final.expr}</div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#5797f7" }}>{PFM_CALC.final.value}</div>
        </div>
      </Card>

      {/* 5~6. 동종상장기업 데이터 표 */}
      <PfmTable t={PFM_TABLE_NB} />
      <PfmTable t={PFM_TABLE_OB} />
    </div>
  );
}
