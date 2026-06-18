// 농심(004370) 목업 데이터 — 추후 실제 API로 교체

export const COMPANY = {
  name: "농심",
  code: "004370",
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
  { year: "2020", 매출액: 27000, 영업이익: 1603, 순이익: 1490 },
  { year: "2021", 매출액: 29000, 영업이익: 1061, 순이익: 996  },
  { year: "2022", 매출액: 31000, 영업이익: 1121, 순이익: 1160 },
  { year: "2023", 매출액: 30500, 영업이익: 2120, 순이익: 1714 },
  { year: "2024", 매출액: 31000, 영업이익: 1630, 순이익: 1576 },
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

export const ACTIVITY: MetricRow[] = [
  { name: "총자산회전율",     y2023: "203.85%", avg: "199.85%", median: "152.60%", tScore: 1,  iScore: 1  },
  { name: "자기자본회전율",   y2023: "158.16%", avg: "152.60%", median: "98.97%",  tScore: 1,  iScore: 1  },
  { name: "자본금회전율",     y2023: "108.16%", avg: "112.60%", median: "88.97%",  tScore: 1,  iScore: 1  },
  { name: "경영자산회전율",   y2023: "20.52%",  avg: "30.41%",  median: "29.40%",  tScore: -1, iScore: -1 },
  { name: "비유동자산회전율", y2023: "22.36%",  avg: "19.47%",  median: "16.17%",  tScore: 1,  iScore: 1  },
  { name: "유형자산회전율",   y2023: "74.36%",  avg: "80.30%",  median: "89.31%",  tScore: 1,  iScore: 1  },
  { name: "재고자산회전율",   y2023: "71.30%",  avg: "75.80%",  median: "78.94%",  tScore: 1,  iScore: 1  },
  { name: "제품회전율",       y2023: "71.30%",  avg: "75.80%",  median: "78.94%",  tScore: 1,  iScore: 1  },
  { name: "매출채권회전율",   y2023: "71.30%",  avg: "75.80%",  median: "78.94%",  tScore: 1,  iScore: 1  },
];
