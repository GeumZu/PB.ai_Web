// 농심(004370) 목업 데이터 — 추후 실제 API로 교체

export const COMPANY = {
  name: "농심",
  code: "004370",
};

// ── 섹션 클릭 시 펼쳐지는 설명 문구 ───────────────────────
export const SECTION_DESC = {
  profile:
    "2025년 7월 29일 기준 농심의 시가총액은 2조 3,266억 원으로, 발행주식 6,082,642주를 감안하면 환산 주가는 주당 약 38만 2천 원 수준이다. 2024~2025년 사이 유·무상증자에 따른 신주 발행은 없어 발행주식 수는 동일하게 유지되고 있다. 이병학 대표이사 사장은 1985년 입사 이후 생산기술팀장, 구미·안양공장장, 생산부문장을 거친 36년 경력의 생산 전문가로, 미국 제2공장 증설과 스마트팩토리 구축 등 글로벌 생산 인프라 확대와 주주가치 제고를 핵심 과제로 삼고 있다.",
  revenue: "매출산업구성 요약 설명이 들어가는 영역입니다.",
  financial: "재무 현황 그래프 요약 설명이 들어가는 영역입니다.",
  health: "농심의 재무건전성은 필수소비재 섹터 업종 중위수와 시계열 점수로 판정됩니다.",
  industry: "산업 설명 요약이 들어가는 영역입니다.",
  // 재무현황분석 탭
  situation: "재무 상황 그래프 요약 설명이 들어가는 영역입니다.",
  ratio: "재무 비율 판정 요약 설명이 들어가는 영역입니다.",
  stability: "안정성 분석 요약 설명이 들어가는 영역입니다.",
  profitability: "수익성 분석 요약 설명이 들어가는 영역입니다.",
  growth: "성장성 분석 요약 설명이 들어가는 영역입니다.",
  activity: "활동성 분석 요약 설명이 들어가는 영역입니다.",
};

// ── 기업 프로필 ──────────────────────────────────────────
export const PROFILE = [
  { label: "시가총액",        value: "2조 3,266억원" },
  { label: "상장일자",        value: "1976년 6월 30일" },
  { label: "설립일자",        value: "1965년" },
  { label: "종업원수",        value: "5,401명" },
  { label: "대표 이사",       value: "이병학" },
  { label: "발행주식수",      value: "6,082,642주 (25년 7월 29일 기준)" },
  { label: "주요 계열사/관계사", value: "농심홀딩스, 농심켈로그, 농심엔지니어링, 태경농산, 호텔농심" },
];

// ── 매출 산업 구성 ────────────────────────────────────────
export const REVENUE = [
  { name: "라면",      value: 81.8, color: "#5797f7" },
  { name: "스낵",      value: 14.4, color: "#62c6a8" },
  { name: "기타",      value: 18.4, color: "#f4b942" },
  { name: "에누리등",  value: 14.5, color: "#e8e8e8" },
];
export const TOTAL_REVENUE = "34,387억";

// ── 손익/재무상태 차트 ────────────────────────────────────
export const PL_DATA = [
  { year: "2021",    매출액: 19500, 영업이익: 1061, 순이익: 996  },
  { year: "2022",    매출액: 22000, 영업이익: 1121, 순이익: 1160 },
  { year: "2023",    매출액: 26500, 영업이익: 2120, 순이익: 1714 },
  { year: "2024",    매출액: 27000, 영업이익: 1630, 순이익: 1576 },
  { year: "2025/06", 매출액: 25000, 영업이익: 1300, 순이익: 1200 },
];

export const BS_DATA = [
  { year: "2020", 자산총계: 27255, 부채총계: 6765, 자본총계: 20489 },
  { year: "2021", 자산총계: 28999, 부채총계: 6991, 자본총계: 22007 },
  { year: "2022", 자산총계: 30347, 부채총계: 7193, 자본총계: 23153 },
  { year: "2023", 자산총계: 32347, 부채총계: 7939, 자본총계: 24408 },
  { year: "2024", 자산총계: 35974, 부채총계: 9248, 자본총계: 26725 },
];

// ── 재무 상황 표 (5년) ────────────────────────────────────
export const FINANCIAL_SITUATION = [
  { year: "2024.12", 매출액: "₩3.4조", 자산총계: "₩35,974억", 부채총계: "₩9,248억", 자본총계: "₩26,725억", 영업이익: "₩1,630억", 순이익: "₩1,576억" },
  { year: "2023.12", 매출액: "₩3.4조", 자산총계: "₩32,347억", 부채총계: "₩7,939억", 자본총계: "₩24,408억", 영업이익: "₩2,120억", 순이익: "₩1,714억" },
  { year: "2022.12", 매출액: "₩3.1조", 자산총계: "₩30,347억", 부채총계: "₩7,193억", 자본총계: "₩23,153억", 영업이익: "₩1,121억", 순이익: "₩1,160억" },
  { year: "2021.12", 매출액: "₩3.1조", 자산총계: "₩28,999억", 부채총계: "₩6,991억", 자본총계: "₩22,007억", 영업이익: "₩1,061억", 순이익: "₩996억" },
  { year: "2020.12", 매출액: "₩3.1조", 자산총계: "₩27,255억", 부채총계: "₩6,765억", 자본총계: "₩20,489억", 영업이익: "₩1,603억", 순이익: "₩1,490억" },
];

// ── 재무건전성 6개 항목 ───────────────────────────────────
export const HEALTH_ITEMS = [
  { label: "유동성",   grade: "안전" },
  { label: "레버리지", grade: "안전" },
  { label: "투자수익성", grade: "안전" },
  { label: "판매마진", grade: "안전" },
  { label: "활동성",   grade: "안전" },
  { label: "성장성",   grade: "안전" },
];
export const HEALTH_SCORE = 0.855;

// ── 재무 비율 판정 요약 ───────────────────────────────────
export const RATIO_SUMMARY = [
  { group: "안정성", label: "유동성",     score: "0.667", grade: "안전" },
  { group: "안정성", label: "레버리지",   score: "0.917", grade: "안전" },
  { group: "수익성", label: "투자 수익성", score: "1.000", grade: "안전" },
  { group: "수익성", label: "판매마진",   score: "1.000", grade: "안전" },
  { group: "활동성", label: "활동성",     score: "0.944", grade: "안전" },
  { group: "성장성", label: "성장성",     score: "0.600", grade: "안전" },
];

// ── 산업 설명 ─────────────────────────────────────────────
export const INDUSTRY = [
  { label: "산업명",          value: "식료품 제조업(C10)" },
  { label: "평가기준일",      value: "2025.06" },
  { label: "산업평가 종합등급", value: "2(양호)" },
  { label: "여신정책",        value: "선별확대" },
];

// ── 지표 펼침(+) 시 표시되는 계산식 구성요소 ─────────────
// 지표명 → [분자, 분모] 구성항목. 값은 mock placeholder.
export const METRIC_SUBROWS: Record<string, string[]> = {
  // 유동성
  "유동비율": ["유동자산", "유동부채"],
  "당좌비율": ["당좌자산", "유동부채"],
  "현금비율": ["현금및현금성자산", "유동부채"],
  "순운전자본대총자본": ["유동자산-유동부채", "자산총계"],
  "비유동비율": ["비유동자산", "자본총계"],
  "비유동장기적합율": ["비유동자산", "자본총계+비유동부채"],
  // 레버리지
  "부채비율": ["부채총계", "자본총계"],
  "자기자본비율": ["자본총계", "자산총계"],
  "유동부채비율": ["유동부채", "자본총계"],
  "비유동부채비율": ["비유동부채", "자본총계"],
  "차입금의존도": ["차입금", "자산총계"],
  "차입금대매출액": ["차입금(평균)", "매출액"],
  // 투자수익성
  "총자산세전순이익률": ["법인세비용차감전순이익", "자산총계(평균)"],
  "총자산순이익률": ["당기순이익", "자산총계(평균)"],
  "기업세전순이익률": ["법인세비용차감전순이익+이자비용", "자산총계(평균)"],
  "기업순이익률": ["당기순이익+이자비용", "자산총계(평균)"],
  "자기자본세전순이익률": ["법인세비용차감전순이익", "자본총계(평균)"],
  "자기자본순이익률": ["당기순이익", "자본총계(평균)"],
  "자본금세전순이익률": ["법인세비용차감전순이익", "자본금(평균)"],
  "자본금순이익률": ["당기순이익", "자본금(평균)"],
  // 판매마진
  "매출액세전순이익률": ["법인세비용차감전순이익", "매출액"],
  "매출액순이익률": ["당기순이익", "매출액"],
  "매출액영업이익률": ["영업이익", "매출액"],
  "EBIT대매출액": ["EBIT", "매출액"],
  "EBITDA대매출액": ["EBITDA", "매출액"],
  // 성장성
  "총자산증가율": ["총자산증가분", "전기자산총계"],
  "유형자산증가율": ["유형자산증가분", "전기유형자산"],
  "유동자산증가율": ["유동자산증가분", "전기유동자산"],
  "자기자본증가율": ["자기자본증가분", "전기자본총계"],
  "매출액증가율": ["매출액증가분", "전기매출액"],
  // 활동성
  "총자산회전율": ["매출액", "자산총계(평균)"],
  "자기자본회전율": ["매출액", "자본총계(평균)"],
  "자본금회전율": ["매출액", "자본금(평균)"],
  "경영자산회전율": ["매출액", "경영자산(평균)"],
  "비유동자산회전율": ["매출액", "비유동자산(평균)"],
  "유형자산회전율": ["매출액", "유형자산(평균)"],
  "재고자산회전율": ["매출액", "재고자산(평균)"],
  "제품회전율": ["매출액", "제품(평균)"],
  "매출채권회전율": ["매출액", "매출채권(평균)"],
};

// 하위 항목 값(mock) — 분자/분모 자리에 표시되는 placeholder 금액
export const SUBROW_AMOUNTS = ["￦14,198억", "￦6,964억"];

// ── 분석 표 (지표 행 단위) ────────────────────────────────
export interface MetricRow {
  name: string;
  y2023: string;
  avg: string;        // 시계열평균
  median: string;     // 업종중위수
  tScore: number;     // 시계열점수
  iScore: number;     // 업종점수
}

export const LIQUIDITY: MetricRow[] = [
  { name: "유동비율",          y2023: "203.85%", avg: "199.85%", median: "152.60%", tScore: 1,  iScore: 1  },
  { name: "당좌비율",          y2023: "158.16%", avg: "152.60%", median: "98.97%",  tScore: 1,  iScore: 1  },
  { name: "현금비율",          y2023: "20.52%",  avg: "30.41%",  median: "29.40%",  tScore: -1, iScore: -1 },
  { name: "순운전자본대총자본", y2023: "22.36%",  avg: "19.47%",  median: "16.17%",  tScore: 1,  iScore: 1  },
  { name: "비유동비율",        y2023: "74.36%",  avg: "80.30%",  median: "89.31%",  tScore: 1,  iScore: 1  },
  { name: "비유동장기적합율",   y2023: "71.30%",  avg: "75.80%",  median: "78.94%",  tScore: 1,  iScore: 1  },
];

export const LEVERAGE: MetricRow[] = [
  { name: "부채비율",      y2023: "32.53%", avg: "31.63%", median: "83.05%", tScore: 1, iScore: 1 },
  { name: "자기자본비율",  y2023: "75.46%", avg: "75.97%", median: "54.63%", tScore: 1, iScore: 1 },
  { name: "유동부채비율",  y2023: "28.54%", avg: "25.70%", median: "48.17%", tScore: 0, iScore: 1 },
  { name: "비유동부채비율", y2023: "3.99%",  avg: "5.93%",  median: "17.79%", tScore: 1, iScore: 1 },
  { name: "차입금의존도",  y2023: "2.85%",  avg: "2.85%",  median: "20.87%", tScore: 1, iScore: 1 },
  { name: "차입금대매출액", y2023: "3.39%",  avg: "3.39%",  median: "24.17%", tScore: 1, iScore: 1 },
];

export const INVEST_PROFIT: MetricRow[] = [
  { name: "총자산세전순이익률",   y2023: "203.85%", avg: "199.85%", median: "152.60%", tScore: 1,  iScore: 1  },
  { name: "총자산순이익률",       y2023: "158.16%", avg: "152.60%", median: "98.97%",  tScore: 1,  iScore: 1  },
  { name: "기업세전순이익률",     y2023: "20.52%",  avg: "30.41%",  median: "29.40%",  tScore: -1, iScore: -1 },
  { name: "기업순이익률",         y2023: "22.36%",  avg: "19.47%",  median: "16.17%",  tScore: 1,  iScore: 1  },
  { name: "자기자본세전순이익률", y2023: "74.36%",  avg: "80.30%",  median: "89.31%",  tScore: 1,  iScore: 1  },
  { name: "자본금세전순이익률",   y2023: "71.30%",  avg: "75.80%",  median: "78.94%",  tScore: 1,  iScore: 1  },
  { name: "자본금순이익률",       y2023: "71.30%",  avg: "75.80%",  median: "78.94%",  tScore: 1,  iScore: 1  },
  { name: "자기자본순이익률",     y2023: "71.30%",  avg: "75.80%",  median: "78.94%",  tScore: 1,  iScore: 1  },
];

export const SALES_MARGIN: MetricRow[] = [
  { name: "매출액세전순이익률", y2023: "32.53%", avg: "31.63%", median: "83.05%", tScore: 1, iScore: 1 },
  { name: "매출액순이익률",    y2023: "75.46%", avg: "75.97%", median: "54.63%", tScore: 1, iScore: 1 },
  { name: "매출액영업이익률",  y2023: "28.54%", avg: "25.70%", median: "48.17%", tScore: 0, iScore: 1 },
  { name: "EBIT대매출액",      y2023: "3.99%",  avg: "5.93%",  median: "17.79%", tScore: 1, iScore: 1 },
  { name: "EBITDA대매출액",    y2023: "2.85%",  avg: "2.85%",  median: "20.87%", tScore: 1, iScore: 1 },
];

export const GROWTH: MetricRow[] = [
  { name: "총자산증가율",   y2023: "32.53%", avg: "31.63%", median: "83.05%", tScore: 1, iScore: 1 },
  { name: "유형자산증가율", y2023: "75.46%", avg: "75.97%", median: "54.63%", tScore: 1, iScore: 1 },
  { name: "유동자산증가율", y2023: "28.54%", avg: "25.70%", median: "48.17%", tScore: 0, iScore: 1 },
  { name: "자기자본증가율", y2023: "3.99%",  avg: "5.93%",  median: "17.79%", tScore: 1, iScore: 1 },
  { name: "매출액증가율",   y2023: "2.85%",  avg: "2.85%",  median: "20.87%", tScore: 1, iScore: 1 },
];

// 활동성: 회전율은 단위가 "회" (% 아님 — 명세서 주의)
export const ACTIVITY: MetricRow[] = [
  { name: "총자산회전율",     y2023: "0.85회", avg: "0.82회", median: "0.78회", tScore: 1,  iScore: 1  },
  { name: "자기자본회전율",   y2023: "1.16회", avg: "1.12회", median: "0.99회", tScore: 1,  iScore: 1  },
  { name: "자본금회전율",     y2023: "12.4회", avg: "11.8회", median: "9.7회",  tScore: 1,  iScore: 1  },
  { name: "경영자산회전율",   y2023: "0.92회", avg: "0.88회", median: "0.85회", tScore: -1, iScore: -1 },
  { name: "비유동자산회전율", y2023: "1.45회", avg: "1.39회", median: "1.31회", tScore: 1,  iScore: 1  },
  { name: "유형자산회전율",   y2023: "2.31회", avg: "2.18회", median: "1.97회", tScore: 1,  iScore: 1  },
  { name: "재고자산회전율",   y2023: "8.74회", avg: "8.31회", median: "7.62회", tScore: 1,  iScore: 1  },
  { name: "제품회전율",       y2023: "11.2회", avg: "10.6회", median: "9.8회",  tScore: 1,  iScore: 1  },
  { name: "매출채권회전율",   y2023: "9.45회", avg: "9.10회", median: "8.34회", tScore: 1,  iScore: 1  },
];

// ════════════════════════════════════════════════════════
// 투자지표 (REPORT004) — Figma node 370:13478
// 표: 행=지표(+펼침), 열=연도. 차트: 라인 2개(좌/우 시리즈)
// ════════════════════════════════════════════════════════
export const INVEST_YEARS = ["2021/12", "2022/12", "2023/12", "2024/12", "2025/6"];

export type Fmt = "won" | "ratio" | "percent";

export interface IndicatorMetric {
  name: string;
  values: (number | null)[]; // 연도별 raw 값 (null = "-")
}

export interface IndicatorSection {
  id: string;
  title: string;
  description: string;         // 제목 클릭 시 펼쳐지는 설명
  format: Fmt;                 // 기본 포맷
  formatOverride?: Record<string, Fmt>;
  leftKeys: string[];         // 좌측 차트 시리즈
  rightKeys: string[];        // 우측 차트 시리즈
  metrics: IndicatorMetric[];
}

export const INVEST_SECTIONS: IndicatorSection[] = [
  {
    id: "perShare",
    title: "Per Share (주당 지표)",
    description:
      "매출(SPS) 과 자산(BPS) 은 큰 폭으로 흔들리지 않지만, 수익성(EPS·EBITDAPS·CFPS) 은 뚜렷한 감소세\n→물가상승, 원가부담, 소비 둔화 등의 영향 가능성이 높음.\nEPS가 줄면 PER이 높아지고, 주가 대비 수익성이 악화되는 구조이므로 향후 원가율 안정화·판매가격 인상 여부가 관건입니다.",
    format: "won",
    leftKeys: ["EPS", "EBITDAPS", "CFPS"],
    rightKeys: ["SPS", "BPS"],
    metrics: [
      { name: "EPS",      values: [16412, 19091, 28262, 25861, 14572] },
      { name: "EBITDAPS", values: [34725, 37577, 54273, 46976, 26348] },
      { name: "CFPS",     values: [33687, 38226, 47670, 46029, 25104] },
      { name: "SPS",      values: [437800, 514425, 560704, 565335, 289437] },
      { name: "BPS",      values: [372424, 392090, 412814, 452565, 450816] },
    ],
  },
  {
    id: "multiple",
    title: "Multiple (배수 지표)",
    description:
      "농심은 모든 멀티플 지표가 업종 평균 이하로, 시장에서 저평가된 전통 소비재 가치주(Value-oriented consumer staple)로 평가됩니다.\nPER·EV/EBITDA의 하락은 이익 대비 주가 부담이 완화되었음을, PBR·PSR의 낮은 수준은 자산 및 매출 대비 시장 신뢰가 보수적임을 뜻합니다.\n결국 농심은 수익성(EPS) 은 다소 둔화되었지만, 현금흐름 안정성(CFPS) 과 자산가치(BPS) 는 견고해 장기 투자 관점에서 안정적인 가치투자형 종목으로 해석됩니다.",
    format: "ratio",
    leftKeys: ["PER", "PCR", "EV/EBITDA"],
    rightKeys: ["PBR", "PSR", "EV/Sales"],
    metrics: [
      { name: "PER",       values: [19.41, 18.7, 14.4, 14.46, null] },
      { name: "PBR",       values: [0.86, 0.91, 0.99, 0.83, 0.87] },
      { name: "PSR",       values: [0.73, 0.69, 0.73, 0.66, null] },
      { name: "PCR",       values: [9.45, 9.34, 8.54, 8.13, null] },
      { name: "EV/EBITDA", values: [9.25, 9.55, 7.53, 7.96, null] },
      { name: "EV/Sales",  values: [0.73, 0.7, 0.73, 0.66, null] },
    ],
  },
  {
    id: "dividends",
    title: "Dividends (배당지표)",
    description:
      "기업이 이익을 낸 뒤, 그 일부를 주주에게 현금으로 돌려주는 것이에요.\nCash Dividends (현금배당) → 가장 일반적인 형태.\nStock Dividends (주식배당) → 현금 대신 신주를 발행해 배분.\nDPS (Dividend Per Share): 주당 배당금; 총배당금 ÷ 발행주식수\nDividend Yield (배당수익률): 주가 대비 배당 비율; DPS ÷ 주가 × 100%\nPayout Ratio (배당성향): 순이익 중 배당으로 나간 비율; 총배당금 ÷ 순이익 × 100%",
    format: "won",
    formatOverride: { "배당성향": "percent", "배당수익률": "percent" },
    leftKeys: ["배당성향"],
    rightKeys: ["배당수익률"],
    metrics: [
      { name: "DPS",       values: [4000, 5000, 5000, 5000, null] },
      { name: "배당성향",   values: [23, 25, 17, 18, null] },
      { name: "배당수익률", values: [2.8, 3.1, 2.9, 3.0, null] },
    ],
  },
  {
    id: "fcf",
    title: "FCF (Free Cash Flow, 잉여현금흐름)",
    description:
      "기업이 영업으로 번 현금에서 설비투자(CAPEX) 같은 유지·확장 비용을 뺀 후, '자유롭게 쓸 수 있는 현금'을 의미해요.",
    format: "won",
    leftKeys: ["총현금흐름", "총투자"],
    rightKeys: ["FCFF"],
    metrics: [
      { name: "총현금흐름", values: [16412, 19091, 28262, 25861, 14572] },
      { name: "총투자",     values: [437800, 514425, 560704, 565335, 289437] },
      { name: "FCFF",       values: [372424, 392090, 412814, 452565, 450816] },
    ],
  },
];

// 라인차트 시리즈 색상 (Graph 팔레트)
export const INVEST_LINE_COLORS = ["#6f86fc", "#ff45a5", "#fbb52d", "#0d6eff", "#f63d34"];

// 투자지표 +펼침: 지표 → [분자, 분모] 계산식 구성요소 (Figma 581:4588)
export const INVEST_SUBROWS: Record<string, string[]> = {
  EPS: ["지배주주순이익", "수정평균주식수"],
  EBITDAPS: ["EBITDA", "수정평균주식수"],
  CFPS: ["영업현금흐름", "수정평균주식수"],
  SPS: ["매출액", "수정평균주식수"],
  BPS: ["지배주주순자산", "수정기말주식수"],
  PER: ["수정주가(보통주)", "EPS"],
  PBR: ["수정주가(보통주)", "BPS"],
  PSR: ["수정주가(보통주)", "SPS"],
  PCR: ["수정주가(보통주)", "CFPS"],
  "EV/EBITDA": ["EV", "EBITDA"],
  "EV/Sales": ["EV", "매출액"],
  DPS: ["DPS(보통주,현금)", "무상조정계수(보통주)"],
  "배당성향": ["배당금(현금)", "지배주주순이익"],
  "배당수익률": ["DPS(보통주,현금)", "결산기말 종가"],
  "총현금흐름": ["세후영업이익", "유무형자산상각비"],
};

// ════════════════════════════════════════════════════════
// 주식 가치 평가 (REPORT005) — Figma 938:37806
// ════════════════════════════════════════════════════════
// 종합분석 라인차트: 실제주가(빨강) vs 평균추정주가(파랑)
export const VALUATION_CHART = [
  { date: "2021",    실제주가: 295000, 평균추정주가: 300000 },
  { date: "2021 Q2", 실제주가: 282000, 평균추정주가: 305000 },
  { date: "2021 Q3", 실제주가: 305000, 평균추정주가: 312000 },
  { date: "2022",    실제주가: 330000, 평균추정주가: 320000 },
  { date: "2022 Q2", 실제주가: 300000, 평균추정주가: 330000 },
  { date: "2022 Q3", 실제주가: 345000, 평균추정주가: 338000 },
  { date: "2023",    실제주가: 360000, 평균추정주가: 348000 },
  { date: "2023 Q2", 실제주가: 335000, 평균추정주가: 356000 },
  { date: "2023 Q3", 실제주가: 395000, 평균추정주가: 362000 },
  { date: "2024",    실제주가: 372000, 평균추정주가: 370000 },
  { date: "2024 Q2", 실제주가: 410000, 평균추정주가: 376000 },
  { date: "2024 Q3", 실제주가: 388000, 평균추정주가: 382000 },
  { date: "2025",    실제주가: 430000, 평균추정주가: 388000 },
  { date: "2025 Q2", 실제주가: 405000, 평균추정주가: 392000 },
];

// 범위 바 2개 (시장범위 / 투자 모델 평균값)
export const VALUATION_RANGES = {
  // band: 회색 트랙 위 파란 범위 밴드(시장범위 전용) [lo, hi]
  market: { label: "시장범위", suffix: "3개월", min: 324000, mid: 454000, max: 579000, handle: 454000, band: [355000, 495000] as [number, number] },
  model: { label: "투자 모델 평균값", value: 246667, min: 246667, mid: 322334, max: 395000, handle: 246667 },
};

// 투자 모델 4가지 추정주가 ("4가지 모델" 펼침 — 각 모델이 범위 바로 표시)
// short: 펼친 행 라벨, price: 핸들(추정주가). 스케일은 VALUATION_RANGES.model 공유.
export const VALUATION_MODELS = [
  { key: "PFM", label: "유사기업 이용법(PFM)", short: "유사기업이용법",   price: 246667 },
  { key: "RI",  label: "초과이익할인법(RI법)", short: "초과이익할인법",   price: 362667 },
  { key: "EVA", label: "경제적부가가치(EVA)",  short: "경제적부가가치법", price: 285000 },
  { key: "DCF", label: "현금흐름할인법(DCF)",  short: "현금흐름할인법",   price: 395000 },
];

// 아코디언 섹션 (2~6번)
export interface ValuationSection {
  num: number;
  title: string;
  desc: string;
  price: number | null;
}
export const VALUATION_SECTIONS: ValuationSection[] = [
  { num: 2, title: "유사기업 이용법(PFM)", desc: "유사 상장회사의 주가배수(PER·PBR 등)를 이용한 시장접근법으로 추정주가를 산출합니다. 동종업종·기업규모가 유사한 상위 4개 기업의 주가배수 중위수를 적용합니다.", price: 246667 },
  { num: 3, title: "초과이익할인법(RI법)", desc: "미래 초과이익(RI)을 자기자본비용(r)으로 할인하여 추정주가를 산출합니다. 총주식가치 = 미래 초과이익의 현재가치 + 당기 자기자본.", price: 362667 },
  { num: 4, title: "경제적부가가치(EVA)", desc: "EVA와 가중평균자본비용(WACC)을 이용해 5년 추정합니다. 총기업가치 = 미래 EVA 현재가치 + 투하자본 + 비영업자산.", price: 285000 },
  { num: 5, title: "현금흐름할인법(DCF)", desc: "미래 잉여현금흐름(FCFF)을 WACC로 할인하여 추정합니다(추정기간 5년). 총기업가치 = 미래 FCFF 현재가치 + 비영업자산.", price: 395000 },
  { num: 6, title: "추정오차율분석", desc: "각 모델의 추정주가와 실제주가 간 오차율을 분석하여 평가 신뢰도를 점검합니다.", price: null },
];

// ── 유사기업 이용법(PFM) 상세 — 아코디언 2번 펼침 (Figma 920:17677) ──
// 차트: 실제주가 + 추정선 2개(NB/OB)
export const PFM_CHART = VALUATION_CHART.map((d) => ({
  date: d.date,
  actual: d.실제주가,
  nb: Math.round(d.평균추정주가 * 0.95),
  ob: Math.round(d.평균추정주가 * 1.05),
}));
export const PFM_LINES = [
  { key: "actual", name: "실제주가", color: "#eb0d0d" },
  { key: "nb",     name: "NB",      color: "#5797f7" },
  { key: "ob",     name: "OB",      color: "#62c6a8" },
];

// 평가 프리미엄 (3개 컬럼) — tone: under=저평가, over=고평가, none=중립
export const PFM_PREMIUM = [
  { label: "P(NB)",    value: "490,643원", delta: "-20% 저평가", tone: "under", note: "(2024 당기순이익 기준)" },
  { label: "P(OB)",    value: "680,643원", delta: "18% 고평가",  tone: "over",  note: "(2024 영업이익 기준)" },
  { label: "실제 주가", value: "600,000원", delta: "",            tone: "none",  note: "2025.11.24 종가 기준" },
];

// 핵심 개념 (번호 3개)
export const PFM_CONCEPTS = [
  { n: 1, title: "상대가치 평가(Relative Valuation)", desc: "유사기업이용법은 업종, 규모, 성장성이 비슷한 동종기업의 주가배수(PER, PBR 등)를 기준으로 목표기업의 적정주가를 추정하는 상대가치 평가 방법입니다. 시장에서 형성된 밸류에이션 수준을 반영합니다." },
  { n: 2, title: "가중평균 방식", desc: "PER과 PBR의 중요도를 반영하여 가중평균으로 추정주가를 산출합니다. PER(수익성 기준) 1/3, PBR(순자산 기준) 2/3로 가중치를 부여하여 균형잡힌 평가를 제공합니다." },
  { n: 3, title: "중위값(Median) 사용", desc: "유사기업의 PER과 PBR 분포에서 평균 대신 중위값을 사용하여 극단값(outlier)의 영향을 제거하고 보다 안정적인 추정치를 도출합니다." },
];

// 추정주가(P^M) 계산 과정
export const PFM_FORMULA = "P^M = [(PER¹ × X × 1) + (PBR¹ × BV × 2)] / (3 × VOL)";
export const PFM_VARS = [
  { sym: "PER¹", desc: "동종상장기업 PER 중위수" },
  { sym: "X",    desc: "당기순이익(지배기업지분)/영업이익" },
  { sym: "PBR¹", desc: "동종상장기업 PBR 중위수" },
  { sym: "BV",   desc: "자본총계(지배기업지분)" },
  { sym: "VOL",  desc: "보통주 발행주식수" },
];
export const PFM_WEIGHTS = {
  items: ["PER 기여분: 1/3 가중 (수익가치)", "PBR 기여분: 2/3 가중 (순자산가치)"],
  note: "순자산가치(PBR)에 2배 가중치를 부여하여 보다 안정적이고 보수적인 평가를 수행합니다.",
};
export const PFM_CALC = {
  cols: [
    {
      title: "P(NB)",
      rows: ["당기순이익_지배기업지분(X) : ₩1,200억", "PER¹(NB) : 22.14x", "PBR¹(NB) : 4.46x", "자기자본(BV) : ₩5,500억", "발행주식수(VOL) : 150백만주"],
      formula: "(22.14 × 1200 × 1) + (4.46 × 5500 × 2) / (3 × 150)",
      result: "₩59",
    },
    {
      title: "P(OB)",
      rows: ["영업이익(X) : ₩1,200억", "PER¹(OB) : 22.14x", "PBR¹(OB) : 4.46x", "자기자본(BV) : ₩5,500억", "발행주식수(VOL) : 150백만주"],
      formula: "(22.14 × 1200 × 1) + (4.46 × 5500 × 2) / (3 × 150)",
      result: "₩109",
    },
  ],
  final: { expr: "( ₩59 + ₩109 )/2", value: "₩168" },
};

// 동종상장기업 데이터 표 (P(NB) / P(OB))
export const PFM_TABLE_NB = {
  title: "P(NB) 동종상장기업 데이터",
  subtitle: "식품 업종 주요 기업 비교",
  cols: ["기업명", "당기순이익", "자본총계", "PER", "PBR"],
  rows: [
    ["오뚜기", "₩950억", "₩4,200억", "30.00x", "6.79x"],
    ["CJ제일제당", "₩4,200억", "₩18,500억", "22.62x", "5.14x"],
    ["삼양식품", "₩580억", "₩2,800억", "21.55x", "4.46x"],
    ["농심", "₩420억", "₩2,100억", "21.19x", "4.24x"],
    ["SPC삼립", "₩280억", "₩1,450억", "22.14x", "4.28x"],
  ],
  median: { label: "산업중위수", cells: ["-", "-", "22.14x", "4.46x"] },
  highlight: "농심",
};
export const PFM_TABLE_OB = {
  title: "P(OB) 동종상장기업 데이터",
  subtitle: "식품 업종 주요 기업 비교",
  cols: ["기업명", "영업이익", "자본총계", "PER", "PBR"],
  rows: [
    ["오뚜기", "₩28,500억", "₩4,200억", "30.00x", "6.79x"],
    ["CJ제일제당", "₩95,000억", "₩18,500억", "22.62x", "5.14x"],
    ["삼양식품", "₩12,500억", "₩2,800억", "21.55x", "4.46x"],
    ["농심", "₩8,900억", "₩2,100억", "21.19x", "4.24x"],
    ["SPC삼립", "₩6,200억", "₩1,450억", "22.14x", "4.28x"],
  ],
  median: { label: "중위수", cells: ["-", "-", "22.14x", "4.46x"] },
  highlight: "농심",
};
