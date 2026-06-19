"use client";

// React Query 훅 — mock 토글(NEXT_PUBLIC_USE_MOCK_DATA) 지원
// 참고 레포의 데이터 레이어 패턴을 이식. mock 모드에선 companyData(디스플레이용)를 반환하고,
// 백엔드 연동 시 companyApi fetcher로 전환한다.
import { useQuery } from "@tanstack/react-query";
import * as api from "./companyApi";
import * as mock from "@/lib/companyData";

// 'false'가 아니면 mock 사용 (기본값: true)
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

// mock 네트워크 지연 시뮬레이션
const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

// ── 1.1. 기업 프로필 ──────────────────────────────────────
export function useCompanyProfile(code: string) {
  return useQuery({
    queryKey: ["companyProfile", code],
    enabled: !!code,
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return { companyCode: code, companyName: mock.COMPANY.name, profile: mock.PROFILE };
      }
      return api.fetchCompanyProfile(code);
    },
  });
}

// ── 1.2. 매출 산업 구성 ───────────────────────────────────
export function useSalesComposition(code: string) {
  return useQuery({
    queryKey: ["salesComposition", code],
    enabled: !!code,
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return { totalRevenue: mock.TOTAL_REVENUE, items: mock.REVENUE };
      }
      return api.fetchSalesComposition(code);
    },
  });
}

// ── 1.3. 재무 현황 (재무 상황과 공유) ─────────────────────
export function useFinancialOverview(code: string) {
  return useQuery({
    queryKey: ["financialOverview", code],
    enabled: !!code,
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return { plData: mock.PL_DATA, situation: mock.FINANCIAL_SITUATION };
      }
      return api.fetchFinancialOverview(code);
    },
  });
}

// ── 1.4. 재무건전성 ───────────────────────────────────────
export function useFinancialHealth(code: string) {
  return useQuery({
    queryKey: ["financialHealth", code],
    enabled: !!code,
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return { items: mock.HEALTH_ITEMS, score: mock.HEALTH_SCORE };
      }
      return api.fetchFinancialHealth(code);
    },
  });
}

// ── 1.5. 산업 설명 ────────────────────────────────────────
export function useIndustryDescription(code: string) {
  return useQuery({
    queryKey: ["industryDescription", code],
    enabled: !!code,
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return { items: mock.INDUSTRY };
      }
      return api.fetchIndustryDescription(code);
    },
  });
}

// ── 2.2. 재무 비율 판정 ───────────────────────────────────
export function useFinancialRatioJudgment(code: string) {
  return useQuery({
    queryKey: ["financialRatioJudgment", code],
    enabled: !!code,
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return { summary: mock.RATIO_SUMMARY, items: mock.HEALTH_ITEMS, score: mock.HEALTH_SCORE };
      }
      return api.fetchFinancialRatioJudgment(code);
    },
  });
}

// ── 2.3. 안정성/수익성/성장성/활동성 분석 ─────────────────
export function useFinancialAnalysisDetails(code: string) {
  return useQuery({
    queryKey: ["financialAnalysisDetails", code],
    enabled: !!code,
    queryFn: async () => {
      if (USE_MOCK) {
        await delay();
        return {
          liquidity: mock.LIQUIDITY,
          leverage: mock.LEVERAGE,
          investProfit: mock.INVEST_PROFIT,
          salesMargin: mock.SALES_MARGIN,
          growth: mock.GROWTH,
          activity: mock.ACTIVITY,
        };
      }
      return api.fetchFinancialAnalysisDetails(code);
    },
  });
}
