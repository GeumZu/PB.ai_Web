"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { matchesQuery } from "@/lib/korean";

interface Company {
  name: string;
  code: string;
  initial: string;
}

const COMPANIES: Company[] = [
  { name: "NAVER", code: "035420", initial: "N" },
  { name: "넷마블", code: "251270", initial: "넷" },
  { name: "농심", code: "004370", initial: "농" },
  { name: "녹십자", code: "006280", initial: "녹" },
  { name: "NICE평가정보", code: "030190", initial: "N" },
  { name: "삼성전자", code: "005930", initial: "삼" },
  { name: "카카오", code: "035720", initial: "카" },
  { name: "LG에너지솔루션", code: "373220", initial: "L" },
  { name: "현대차", code: "005380", initial: "현" },
  { name: "SK하이닉스", code: "000660", initial: "S" },
];

function CompanyAvatar({ name }: { name: string }) {
  const char = name.charAt(0).toUpperCase();
  return (
    <div className="w-6 h-6 rounded-full bg-[#e8e8e8] flex items-center justify-center shrink-0">
      <span className="text-[10px] font-semibold text-[#5c5c5c]">{char}</span>
    </div>
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? COMPANIES.filter((c) => matchesQuery(c.name, query) || matchesQuery(c.code, query))
    : [];

  const showDropdown = results.length > 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[698px]">
      {/* 검색 입력창 */}
      <div
        className={cn(
          "flex items-center gap-3 px-5 bg-white border transition-all duration-150",
          showDropdown
            ? "border-[#f0f2f4] rounded-t-[24px] border-b-0 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            : "border-[#f0f2f4] rounded-[24px] shadow-sm",
          "h-[58px]"
        )}
      >
        <Search size={20} className="text-[#b0b0b0] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="분석할 회사를 선택해주세요"
          className="flex-1 bg-transparent text-sm text-[#191b1c] placeholder:text-[#939597] outline-none"
        />
        {query && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="text-[#b0b0b0] hover:text-[#191b1c] text-xl leading-none transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* 드롭다운 */}
      {showDropdown && (
        <div className="absolute left-0 right-0 bg-white border border-[#f0f2f4] border-t-0 rounded-b-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden z-50">
          {/* 구분선 */}
          <div className="mx-5 border-t border-[#f0f2f4]" />
          {results.map((company) => (
            <button
              key={company.code}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                router.push(`/company/${company.code}`);
              }}
              className="flex items-center gap-3 w-full px-5 py-[10px] hover:bg-[#f8f8f8] transition-colors text-left"
            >
              <CompanyAvatar name={company.name} />
              <span className="text-sm text-[#191b1c]">
                {company.name}
                <span className="text-[#8c8c8c] ml-0.5">({company.code})</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
