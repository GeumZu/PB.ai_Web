// 투자지표 반응형 테이블 — 기간(컬럼) 생성 & 값 매핑
// Interval(분기/반기/연간) × YearNum(5/3/1년) = 9가지 조합

export type Interval = "quarter" | "half" | "annual";
export type YearNum = 5 | 3 | 1;

export const INTERVAL_OPTIONS: { value: Interval; label: string }[] = [
  { value: "quarter", label: "분기" },
  { value: "half", label: "반기" },
  { value: "annual", label: "연간" },
];

export const YEARNUM_OPTIONS: { value: YearNum; label: string }[] = [
  { value: 5, label: "5년" },
  { value: 3, label: "3년" },
  { value: 1, label: "1년" },
];

// CY(현재 연도) 최신 확보 분기. 사업보고서 반영 지연으로 최신 1년치는 partial.
// mock 기준 최신 = 2025/06 (Figma 예시와 일치). 실제 연동 시 데이터 최신값으로 대체.
export const CY = { year: 2025, month: 6 };

const pad = (m: number) => String(m).padStart(2, "0");

/** (yearNum, interval) 조합에 맞는 기간 컬럼 목록 생성 — "YYYY/MM" */
export function getPeriods(yearNum: YearNum, interval: Interval): string[] {
  // 1년도 직전 연도 1개는 함께 표시 (1년-연간 = 직전 연말 + CY)
  const startYear = CY.year - Math.max(1, yearNum - 1);
  const out: string[] = [];

  if (interval === "annual") {
    for (let y = startYear; y < CY.year; y++) out.push(`${y}/12`);
    out.push(`${CY.year}/${pad(CY.month)}`); // CY는 최신 partial
    return out;
  }

  const months = interval === "half" ? [6, 12] : [3, 6, 9, 12];
  for (let y = startYear; y <= CY.year; y++) {
    for (const m of months) {
      if (y === CY.year && m > CY.month) break;
      out.push(`${y}/${pad(m)}`);
    }
  }
  return out;
}

// 연간 앵커 기간 (INVEST_SECTIONS.metrics.values 의 인덱스 순서와 일치)
const ANCHORS = ["2021/12", "2022/12", "2023/12", "2024/12", "2025/06"];

/**
 * 연간 앵커값(values)으로부터 임의 기간의 값을 도출.
 * - 앵커(연말/CY) 기간은 그대로, 분기/반기 중간값은 인접 연도 사이 보간.
 * - mock 용도이며 실제 연동 시 백엔드가 기간별 값을 직접 제공.
 */
export function valueAt(values: (number | null)[], period: string): number | null {
  const exact = ANCHORS.indexOf(period);
  if (exact >= 0) return values[exact];

  const [ys, ms] = period.split("/");
  const y = Number(ys);
  const m = Number(ms);

  if (y >= CY.year) return values[4]; // CY 연도 내 기간 → CY값(없으면 null)
  if (y < 2021) return null;

  const idx = y - 2021; // 0..3 (2021~2024)
  const cur = values[idx] ?? null;
  if (cur == null) return null;
  if (m === 12) return cur;

  const prev = idx > 0 ? values[idx - 1] : cur;
  if (prev == null) return cur;
  return prev + (cur - prev) * (m / 12);
}
