"use client";

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as ReTooltip, ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import {
  EVA_CHART, EVA_LINES, EVA_PREMIUM, EVA_CONCEPTS, EVA_CALC,
  EVA_CURRENT, EVA_TABLE, EVA_ASSUMPTIONS, EVA_WACC, EVA_GROWTH,
} from "@/lib/companyData";

const won = (v: number) => `₩${v.toLocaleString()}`;
const toneColor = (t: string) => (t === "under" ? "#5797f7" : t === "over" ? "#eb0d0d" : "#6b6d6f");
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #ebedf0", borderRadius: 12, background: "#fff", padding: 24 }}>
      <h3 style={{ fontSize: 20, fontWeight: 600, color: "#191b1c" }}>{title}</h3>
      {subtitle && <p style={{ fontSize: 14, color: "#8c8e90", marginTop: 4 }}>{subtitle}</p>}
      {children}
    </div>
  );
}

// 접기/펼치기 (라벨+설명 항상, 내용 토글, 기본 펼침)
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

// 산식/계산 코드 박스
function CodeBlock({ formula, calc }: { formula: string; calc?: string }) {
  return (
    <div style={{ background: "#f7f9fb", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#3c3d3f", fontFamily: MONO, overflowX: "auto" }}>
      <div style={{ fontWeight: 600, color: "#191b1c" }}>{formula}</div>
      {calc && <div style={{ marginTop: 6, whiteSpace: "pre-line", lineHeight: 1.7 }}>{calc}</div>}
    </div>
  );
}

export default function EvaDetail() {
  const [formulaOpen, setFormulaOpen] = useState(false);
  return (
    <div className="flex flex-col" style={{ gap: 24, paddingTop: 8 }}>
      {/* 1. 차트 */}
      <div>
        <div className="flex justify-end gap-2" style={{ marginBottom: 8 }}>
          {["5년", "연간"].map((f) => (
            <button key={f} className="flex items-center gap-1" style={{ fontSize: 13, color: "#6b6d6f", border: "1px solid #e0e0e0", borderRadius: 6, padding: "4px 10px" }}>
              {f} <ChevronDown size={14} />
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={EVA_CHART} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} interval={2} />
            <YAxis tickFormatter={(v) => v.toLocaleString()} tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} width={56} domain={[200000, 500000]} ticks={[200000, 250000, 300000, 350000, 400000, 450000, 500000]} />
            <ReTooltip
              formatter={(v, n) => [won(Number(v)), String(n)]}
              contentStyle={{ fontSize: 12, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.5)", backdropFilter: "blur(3px)", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
            />
            {[...EVA_LINES].reverse().map((l) => (
              <Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center" style={{ gap: 16, marginTop: 4 }}>
          {EVA_LINES.map((l) => (
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
          {EVA_PREMIUM.map((p, i) => (
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
      <Card title="경제적부가가치법의 핵심 개념">
        <div className="flex flex-col" style={{ gap: 20, marginTop: 16 }}>
          {EVA_CONCEPTS.map((c) => (
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

      {/* 4. 추정주가(P^EVA) 계산 과정 */}
      <Card title="추정주가(P^EVA) 계산 과정">
        {/* 산식 — 기본 접힘: 라벨+심볼릭 수식만 / 펼치면 수치 전개 */}
        <div style={{ marginTop: 16, background: "#f7f9fb", borderRadius: 8, padding: "12px 16px" }}>
          <button onClick={() => setFormulaOpen((o) => !o)} className="flex items-center gap-1 transition-colors text-[#58595b] hover:text-[#5797f7]" style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>
            경제적부가가치법 산식
            <ChevronDown size={16} style={{ transform: formulaOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
          </button>
          <div style={{ fontSize: 13, color: "#3c3d3f", fontFamily: MONO, overflowX: "auto" }}>
            <div style={{ fontWeight: 600, color: "#191b1c", whiteSpace: "pre" }}>{EVA_CALC.formula}</div>
            {formulaOpen && (
              <div style={{ marginTop: 8, whiteSpace: "pre", lineHeight: 1.7 }}>{EVA_CALC.formulaCalc}</div>
            )}
          </div>
        </div>

        {/* 핵심 계산식 + 변수 설명 */}
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c", marginBottom: 12 }}>핵심 계산식</div>
            <div className="flex flex-col" style={{ gap: 12 }}>
              {EVA_CALC.coreFormulas.map((f) => (
                <div key={f.label}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#191b1c" }}>{f.label}</div>
                  {f.sub && <div style={{ fontSize: 12.5, color: "#8c8e90", marginTop: 2 }}>{f.sub}</div>}
                  <div style={{ background: "#f7f9fb", borderRadius: 8, padding: "8px 12px", marginTop: 6, fontSize: 12.5, color: "#3c3d3f", fontFamily: MONO, overflowX: "auto" }}>{f.code}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c", marginBottom: 12 }}>변수 설명</div>
            {EVA_CALC.vars.map((v) => (
              <div key={v.sym} className="flex" style={{ gap: 8, fontSize: 14, padding: "4px 0" }}>
                <span style={{ color: "#5797f7", fontWeight: 600, minWidth: 64, flexShrink: 0 }}>{v.sym}:</span>
                <span style={{ color: "#58595b" }}>{v.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 요약 3값 */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 24 }}>
          {EVA_CALC.stats.map((s) => (
            <div key={s.label} style={{ background: "#f7f9fb", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, color: "#6b6d6f" }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#5797f7", marginTop: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#939597", marginTop: 4 }}>{s.note}</div>
            </div>
          ))}
        </div>

        {/* 최종 추정주가 */}
        <div className="flex items-center justify-between" style={{ background: "#eef5ff", borderRadius: 10, padding: "16px 24px", marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#191b1c" }}>최종 추정주가</div>
            <div style={{ fontSize: 13, color: "#6b6d6f", marginTop: 2 }}>{EVA_CALC.final.expr}</div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#5797f7" }}>{EVA_CALC.final.value}</div>
        </div>
      </Card>

      {/* 5. 당기 EVA 계산 */}
      <Card title="당기 EVA 계산" subtitle="기준 EVA 산출 과정">
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          {EVA_CURRENT.steps.map((s) => (
            <div key={s.n} style={{ border: "1px solid #ebedf0", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#191b1c", marginBottom: 10 }}>{s.n} {s.title}</div>
              {s.rows.map((r, i) => (
                <div key={i} className="flex items-center justify-between" style={{ fontSize: 13, color: "#58595b", padding: "3px 0" }}>
                  <span>{r[0]}</span><span>{r[1]}</span>
                </div>
              ))}
              <div className="flex items-center justify-between" style={{ borderTop: "1px solid #e7e9eb", marginTop: 8, paddingTop: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#191b1c" }}>{s.result[0]}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#5797f7" }}>{s.result[1]}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#eef5ff", borderRadius: 10, padding: "14px 18px", marginTop: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#191b1c", marginBottom: 4 }}>💡 EVA 해석</div>
          <p style={{ fontSize: 14, color: "#58595b", lineHeight: 1.6 }}>{EVA_CURRENT.interpret}</p>
        </div>
      </Card>

      {/* 6. 연도별 EVA 및 현재가치 계산 */}
      <Card title={EVA_TABLE.title} subtitle={EVA_TABLE.subtitle}>
        <div style={{ marginTop: 16, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f7f9fb" }}>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#6b6d6f", fontWeight: 600 }}></th>
                {EVA_TABLE.years.map((y) => (
                  <th key={y} style={{ padding: "10px 12px", textAlign: "right", color: "#6b6d6f", fontWeight: 600, whiteSpace: "nowrap" }}>{y}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVA_TABLE.rows.map((r) => (
                <tr key={r.label} style={{ borderTop: "1px solid #f0f1f3" }}>
                  <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                    <span style={{ color: "#191b1c", fontWeight: 500 }}>{r.label}</span>{" "}
                    {r.sub && <span style={{ color: "#939597", fontSize: 12 }}>{r.sub}</span>}
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
          <span style={{ color: "#6b6d6f", fontWeight: 600 }}>{EVA_TABLE.sumLabel} </span>
          <span style={{ color: "#191b1c" }}>{EVA_TABLE.sum}</span>
        </div>
      </Card>

      {/* 7. 투입 변수 결정 */}
      <Card title="투입 변수 결정" subtitle="경제적부가가치법에 필요한 핵심 변수 산출 근거">
        {/* 주요 가정 */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#191b1c", marginBottom: 10 }}>주요 가정</div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {EVA_ASSUMPTIONS.map((a) => (
              <div key={a.label} style={{ background: "#f7f9fb", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 12, color: "#6b6d6f" }}>{a.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#191b1c", marginTop: 2 }}>{a.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WACC */}
        <div style={{ borderTop: "1px solid #f0f1f3", marginTop: 20, paddingTop: 20 }}>
          <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
            <span className="flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: 6, background: "#eef5ff", color: "#5797f7", fontSize: 12, fontWeight: 700, fontFamily: MONO }}>{EVA_WACC.badge}</span>
            <span style={{ fontSize: 17, fontWeight: 600, color: "#191b1c", flex: 1 }}>{EVA_WACC.title}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#5797f7", background: "#eef5ff", borderRadius: 999, padding: "3px 10px" }}>{EVA_WACC.value}</span>
          </div>
          <Collapsible label={EVA_WACC.collapseLabel} note={EVA_WACC.note}>
            <CodeBlock formula={EVA_WACC.formula} calc={EVA_WACC.formulaCalc} />
            <ul className="flex flex-col" style={{ gap: 4, marginTop: 10 }}>
              {EVA_WACC.bullets.map((b) => <li key={b} style={{ fontSize: 13, color: "#58595b" }}>• {b}</li>)}
            </ul>
          </Collapsible>
          {/* WACC 하위 변수 r/K_b/E/B/T */}
          <div className="flex flex-col" style={{ gap: 12, marginTop: 16 }}>
            {EVA_WACC.subs.map((s) => (
              <div key={s.title} style={{ background: "#fafbfc", border: "1px solid #eef0f2", borderRadius: 8, padding: 14 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#191b1c" }}>{s.title}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#5797f7", background: "#eef5ff", borderRadius: 999, padding: "2px 10px" }}>{s.value}</span>
                </div>
                <p style={{ fontSize: 13, color: "#58595b" }}>{s.note}</p>
                {s.formula && <div style={{ marginTop: 8 }}><CodeBlock formula={s.formula} calc={s.formulaCalc || undefined} /></div>}
                {s.bullets.length > 0 && (
                  <ul className="flex flex-col" style={{ gap: 4, marginTop: 8 }}>
                    {s.bullets.map((b) => <li key={b} style={{ fontSize: 12.5, color: "#8c8e90" }}>• {b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 영구성장률 */}
        <div style={{ borderTop: "1px solid #f0f1f3", marginTop: 20, paddingTop: 20 }}>
          <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
            <span className="flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: 6, background: "#eef5ff", color: "#5797f7", fontSize: 12, fontWeight: 700, fontFamily: MONO }}>{EVA_GROWTH.badge}</span>
            <span style={{ fontSize: 17, fontWeight: 600, color: "#191b1c", flex: 1 }}>{EVA_GROWTH.title}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#5797f7", background: "#eef5ff", borderRadius: 999, padding: "3px 10px" }}>{EVA_GROWTH.value}</span>
          </div>
          <Collapsible label={EVA_GROWTH.collapseLabel} note={EVA_GROWTH.note}>
            <CodeBlock formula={EVA_GROWTH.formula} calc={EVA_GROWTH.formulaCalc} />
            <ul className="flex flex-col" style={{ gap: 4, marginTop: 10 }}>
              {EVA_GROWTH.bullets.map((b) => <li key={b} style={{ fontSize: 13, color: "#58595b" }}>• {b}</li>)}
            </ul>
          </Collapsible>
        </div>
      </Card>
    </div>
  );
}
