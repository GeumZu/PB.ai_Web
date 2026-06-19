// API 호출 함수 — docs/API_SPECIFICATION.md 의 엔드포인트와 1:1 대응
import type {
  CompanyProfile,
  SalesComposition,
  FinancialOverview,
  FinancialHealth,
  IndustryDescription,
  FinancialRatioJudgment,
  FinancialAnalysisDetails,
} from "@/lib/types/company";

const API_BASE_URL = (() => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const trimmed = base.replace(/\/+$/, "");
  return trimmed.endsWith("/api/v1") ? trimmed : `${trimmed}/api/v1`;
})();

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error?.message || "API 호출 실패");
  }
  return res.json();
}

// 1.1. 기업 프로필
export const fetchCompanyProfile = (code: string) =>
  fetchApi<CompanyProfile>(`/companies/${code}/profile`);

// 1.2. 매출 산업 구성
export const fetchSalesComposition = (code: string) =>
  fetchApi<SalesComposition>(`/companies/${code}/sales-composition`);

// 1.3. 재무 현황
export const fetchFinancialOverview = (
  code: string,
  periodType: "annual" | "quarterly" = "annual"
) =>
  fetchApi<FinancialOverview>(
    `/companies/${code}/financial-overview?periodType=${periodType}`
  );

// 1.4. 재무건전성
export const fetchFinancialHealth = (code: string) =>
  fetchApi<FinancialHealth>(`/companies/${code}/financial-health`);

// 1.5. 산업 설명
export const fetchIndustryDescription = (code: string) =>
  fetchApi<IndustryDescription>(`/companies/${code}/industry-description`);

// 2.2. 재무 비율 판정
export const fetchFinancialRatioJudgment = (code: string) =>
  fetchApi<FinancialRatioJudgment>(`/companies/${code}/financial-ratio-judgment`);

// 2.3. 안정성/수익성/성장성/활동성 분석
export const fetchFinancialAnalysisDetails = (code: string) =>
  fetchApi<FinancialAnalysisDetails>(`/companies/${code}/financial-analysis-details`);
