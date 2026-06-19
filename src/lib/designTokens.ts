/**
 * PB.ai 디자인 시스템 토큰 (Figma Foundation 기준)
 *
 * 색상은 globals.css의 CSS 변수(--primary-500 등)와 1:1 대응됩니다.
 * 인라인 스타일에서 쓸 땐 이 객체를, Tailwind/CSS에서 쓸 땐 var(--token)을 사용하세요.
 */

// ── Typography (Pretendard GOV, lineHeight 150%) ──────────
export const TYPE = {
  displayLargeBold:    { fontSize: 60, fontWeight: 700, lineHeight: "72px" },
  displayMediumBold:   { fontSize: 44, fontWeight: 700, lineHeight: "66px" },
  displaySmallBold:    { fontSize: 36, fontWeight: 700, lineHeight: "54px" },
  displaySmallRegular: { fontSize: 36, fontWeight: 400, lineHeight: "54px" },
  headingLargeBold:    { fontSize: 32, fontWeight: 700, lineHeight: "48px" },
  headingLargeSemibold:{ fontSize: 32, fontWeight: 600, lineHeight: "48px" },
  headingMediumBold:   { fontSize: 24, fontWeight: 700, lineHeight: "36px" },
  headingMediumSemibold:{ fontSize: 24, fontWeight: 600, lineHeight: "36px" },
  headingSmallBold:    { fontSize: 19, fontWeight: 700, lineHeight: "28px" },
  headingSmallSemibold:{ fontSize: 19, fontWeight: 600, lineHeight: "28px" },
  bodyLargeSemibold:   { fontSize: 19, fontWeight: 600, lineHeight: "28px" },
  bodyLargeRegular:    { fontSize: 19, fontWeight: 400, lineHeight: "28px" },
  bodyMediumSemibold:  { fontSize: 17, fontWeight: 600, lineHeight: "26px" },
  bodyMediumRegular:   { fontSize: 17, fontWeight: 400, lineHeight: "26px" },
  bodySmallRegular:    { fontSize: 15, fontWeight: 400, lineHeight: "22px" },
  tableIndexRegular:   { fontSize: 13, fontWeight: 400, lineHeight: "20px" },
  tableBodyRegular:    { fontSize: 14, fontWeight: 400, lineHeight: "21px" },
} as const;

// ── Colors ────────────────────────────────────────────────
export const COLOR = {
  primary: { 50:"#e5f2fe",100:"#c2defe",200:"#9dcbfd",300:"#7ab6fb",400:"#64a6fa",500:"#5797f7",600:"#5389e8",700:"#4d76d4",800:"#4865c1",900:"#3f46a1" },
  gray:    { 50:"#f7f9fb",100:"#f0f2f4",200:"#e7e9eb",300:"#d7d9db",400:"#b3b5b7",500:"#939597",600:"#6b6d6f",700:"#58595b",800:"#393b3c",900:"#191b1c" },
  safe:    { 50:"#e8e9ff",100:"#c5c8ff",200:"#9ca4ff",300:"#6d80ff",400:"#4261ff",500:"#0042fb",600:"#0039ef",700:"#002ce3",800:"#001ed8",900:"#0000bf" },
  danger:  { 50:"#ffe9eb",100:"#ffc8cb",200:"#f7918c",300:"#ee655f",400:"#f63d34",500:"#f92308",600:"#eb0d0d",700:"#da0008",800:"#cd0000",900:"#bf0000" },
  warning: { 50:"#fff8e1",100:"#ffecb3",200:"#ffe082",300:"#ffd54f",400:"#ffca29",500:"#ffc109",600:"#ffb302",700:"#ffa001",800:"#ff8f01",900:"#ff7000" },
  graph:   ["#6f86fc", "#ff45a5", "#fbb52d", "#0d6eff", "#f63d34"],
} as const;

// 그래프 시리즈 색상 (Recharts에 순서대로 사용)
export const GRAPH_COLORS = COLOR.graph;

// ── 컴포넌트 스펙 ─────────────────────────────────────────

// 입력 필드 7가지 상태 (border 색상)
export const INPUT_STATE = {
  default:  { border: COLOR.gray[300], color: COLOR.gray[500] }, // 입력 전, placeholder
  hover:    { border: COLOR.gray[400], color: COLOR.gray[500] },
  active:   { border: COLOR.primary[500], color: COLOR.gray[900] }, // 커서 진입
  onChange: { border: COLOR.primary[500], color: COLOR.gray[900] }, // 입력 중
  complete: { border: COLOR.gray[300], color: COLOR.gray[900] },    // 입력 완료
  error:    { border: COLOR.danger[600], color: COLOR.gray[900] },  // 유효성 실패 + 에러 메시지
  disabled: { border: COLOR.gray[200], color: COLOR.gray[400] },    // 비활성
} as const;

// 표(Table) 셀 스펙
export const TABLE = {
  headerBg: COLOR.gray[50],   // #f7f9fb
  border: COLOR.gray[300],    // #d7d9db, 1px
  cellPadding: "12px 24px",
  indexText: TYPE.tableIndexRegular,
  bodyText: TYPE.tableBodyRegular,
} as const;
