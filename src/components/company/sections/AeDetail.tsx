"use client";

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as ReTooltip, ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { AE_CHART, AE_LINES, AE_PREMIUM, AE_CONCEPTS, AE_CALC, AE_TABLE, AE_INPUTS } from "@/lib/companyData";

const won = (v: number) => `₩${v.toLocaleString()}`;
// 저평가=파랑 / 고평가=빨강 / 중립=회색
const toneColor = (t: string) => (t === "under" ? "#5797f7" : t === "over" ? "#eb0d0d" : "#6b6d6f");
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

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

// ── 접기/펼치기 (라벨 + 설명은 항상, 내용은 토글) ─────────
function Collapsible({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-1 transition-colors text-[#58595b] hover:text-[#5797f7]" style={{ fontSize: 15, fontWeight: 600 }}>
        {label}
        <ChevronDown size={16} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
      </button>
      {note && <p style={{ fontSize: 13, color: "#8c8e90", marginTop: 6 }}>{note}</p>}
      {open && <div style={{ marginTop: 10 }}>{children}</div>}
    </div>
  );
}

export default function AeDetail() {
  return (
    <div className="flex flex-col" style={{ gap: 24, paddingTop: 8 }}>
      {/* 1. 차트 (실제주가 + P(AE)) */}
      <div>
        <div className="flex justify-end gap-2" style={{ marginBottom: 8 }}>
          {["5년", "연간"].map((f) => (
            <button key={f} className="flex items-center gap-1" style={{ fontSize: 13, color: "#6b6d6f", border: "1px solid #e0e0e0", borderRadius: 6, padding: "4px 10px" }}>
              {f} <ChevronDown size={14} />
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={AE_CHART} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} interval={2} />
            <YAxis tickFormatter={(v) => v.toLocaleString()} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={56} domain={[200000, 500000]} ticks={[200000, 250000, 300000, 350000, 400000, 450000, 500000]} />
            <ReTooltip
              formatter={(v, n) => [won(Number(v)), String(n)]}
              contentStyle={{ fontSize: 12, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.5)", backdropFilter: "blur(3px)", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
            />
            {[...AE_LINES].reverse().map((l) => (
              <Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
        {/* 커스텀 범례 (순서 고정) */}
        <div className="flex items-center justify-center" style={{ gap: 16, marginTop: 4 }}>
          {AE_LINES.map((l) => (
            <span key={l.key} className="flex items-center" style={{ gap: 6, fontSize: 12, color: "#58595b" }}>
              <span style={{ position: "relative", display: "inline-block", width: 16, height: 2, background: l.color }}>
                <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 7, height: 7, borderRadius: "50%", background: l.color }} />
              </span>
              {l.name}
            </span>
          ))}
        </div>
      </div>

      {/* 2. 평가 프리미엄 */}
      <Card title="평가 프리미엄">
        <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: 16 }}>
          {AE_PREMIUM.map((p, i) => (
            <div key={p.label} style={{ paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? "1px solid #ebedf0" : "none" }}>
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
      <Card title="초과이익할인법의 핵심 개념">
        <div className="flex flex-col" style={{ gap: 20, marginTop: 16 }}>
          {AE_CONCEPTS.map((c) => (
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

      {/* 4. 추정주가(P^AE) 계산 과정 */}
      <Card title="추정주가(P^AE) 계산 과정" subtitle={AE_CALC.subtitle}>
        {/* 산식 (접기/펼치기) */}
        <div style={{ marginTop: 16 }}>
          <Collapsible label="초과이익할인법 산식">
            <div style={{ background: "#f7f9fb", borderRadius: 8, padding: "12px 16px", fontSize: 13.5, color: "#3c3d3f", fontFamily: MONO }}>
              <div style={{ fontWeight: 600, color: "#191b1c" }}>{AE_CALC.formula}</div>
              <div style={{ marginTop: 8, whiteSpace: "pre-line", lineHeight: 1.7 }}>{AE_CALC.formulaCalc}</div>
            </div>
          </Collapsible>
        </div>

        {/* 핵심 계산식 + 변수 설명 */}
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c", marginBottom: 12 }}>핵심 계산식</div>
            <div className="flex flex-col" style={{ gap: 12 }}>
              {AE_CALC.coreFormulas.map((f) => (
                <div key={f.label}>
                  <div style={{ fontSize: 13, color: "#6b6d6f", marginBottom: 4 }}>{f.label}</div>
                  <div style={{ background: "#f7f9fb", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#3c3d3f", fontFamily: MONO }}>{f.code}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c", marginBottom: 12 }}>변수 설명</div>
            {AE_CALC.vars.map((v) => (
              <div key={v.sym} className="flex" style={{ gap: 8, fontSize: 14, padding: "4px 0" }}>
                <span style={{ color: "#5797f7", fontWeight: 600, minWidth: 54, flexShrink: 0 }}>{v.sym}:</span>
                <span style={{ color: "#58595b" }}>{v.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 연도별 초과이익 예측 표 */}
        <div style={{ border: "1px solid #ebedf0", borderRadius: 12, padding: 20, marginTop: 24 }}>
          <h4 style={{ fontSize: 17, fontWeight: 600, color: "#191b1c" }}>{AE_TABLE.title}</h4>
          <p style={{ fontSize: 13, color: "#8c8e90", marginTop: 4, marginBottom: 12 }}>{AE_TABLE.subtitle}</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f7f9fb" }}>
                  <th style={{ padding: "10px 12px", textAlign: "left", color: "#6b6d6f", fontWeight: 600, whiteSpace: "nowrap" }}></th>
                  {AE_TABLE.years.map((y) => (
                    <th key={y} style={{ padding: "10px 12px", textAlign: "right", color: "#6b6d6f", fontWeight: 600, whiteSpace: "nowrap" }}>{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AE_TABLE.rows.map((r) => (
                  <tr key={r.label} style={{ borderTop: "1px solid #f0f1f3" }}>
                    <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                      <span style={{ color: "#191b1c", fontWeight: 500 }}>{r.label}</span>{" "}
                      <span style={{ color: "#939597", fontSize: 12 }}>{r.sub}</span>
                    </td>
                    {r.cells.map((c, i) => (
                      <td key={i} style={{ padding: "10px 12px", textAlign: "right", color: "#3c3d3f", whiteSpace: "nowrap" }}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ background: "#f7f9fb", borderRadius: 8, padding: "10px 14px", marginTop: 12, fontSize: 13 }}>
            <span style={{ color: "#6b6d6f", fontWeight: 600 }}>{AE_TABLE.sumLabel} </span>
            <span style={{ color: "#191b1c" }}>{AE_TABLE.sum}</span>
          </div>
        </div>

        {/* 최종 추정주가 */}
        <div className="flex items-center justify-between" style={{ background: "#eef5ff", borderRadius: 10, padding: "16px 24px", marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c" }}>최종 추정주가</div>
            <div style={{ fontSize: 13, color: "#6b6d6f", marginTop: 2 }}>{AE_CALC.final.expr}</div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#5797f7" }}>{AE_CALC.final.value}</div>
        </div>
      </Card>

      {/* 5. 투입 변수 결정 */}
      <Card title="투입 변수 결정" subtitle="초과이익할인법에 필요한 핵심 변수 산출 근거">
        <div className="flex flex-col">
          {AE_INPUTS.map((inp, idx) => (
            <div key={inp.title} style={{ borderTop: idx > 0 ? "1px solid #f0f1f3" : "none", paddingTop: 20, marginTop: idx > 0 ? 20 : 16 }}>
              {/* 헤더: badge + 제목 + 값 badge */}
              <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
                <span className="flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: 6, background: "#eef5ff", color: "#5797f7", fontSize: 12, fontWeight: 700, fontFamily: MONO }}>{inp.badge}</span>
                <span style={{ fontSize: 17, fontWeight: 600, color: "#191b1c", flex: 1 }}>{inp.title}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#5797f7", background: "#eef5ff", borderRadius: 999, padding: "3px 10px" }}>{inp.value}</span>
              </div>
              <Collapsible label={inp.collapseLabel} note={inp.note}>
                {/* 산식 + 계산 */}
                <div style={{ background: "#f7f9fb", borderRadius: 8, padding: "12px 16px", fontSize: 13.5, color: "#3c3d3f", fontFamily: MONO }}>
                  <div style={{ fontWeight: 600, color: "#191b1c" }}>{inp.formula}</div>
                  <div style={{ marginTop: 6 }}>
                    {inp.formulaCalc}{inp.result && <strong style={{ color: "#5797f7", marginLeft: 6 }}>{inp.result}</strong>}
                  </div>
                </div>
                {/* 변수 정의 bullets */}
                <ul className="flex flex-col" style={{ gap: 4, marginTop: 10 }}>
                  {inp.bullets.map((b) => (
                    <li key={b} style={{ fontSize: 13, color: "#58595b" }}>• {b}</li>
                  ))}
                </ul>
                {/* (자기자본비용 카드) R_f 하위 항목 */}
                {inp.sub && (
                  <div style={{ background: "#fafbfc", border: "1px solid #eef0f2", borderRadius: 8, padding: 14, marginTop: 12 }}>
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#191b1c" }}>{inp.sub.title}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#5797f7", background: "#eef5ff", borderRadius: 999, padding: "2px 10px" }}>{inp.sub.value}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#58595b", marginTop: 8 }}>{inp.sub.desc}</p>
                    <p style={{ fontSize: 13, color: "#8c8e90", marginTop: 6 }}>{inp.sub.tip}</p>
                  </div>
                )}
              </Collapsible>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
