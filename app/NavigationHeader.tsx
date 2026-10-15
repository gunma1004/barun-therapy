"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#070709]/95 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-lg shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              바른테라피
            </span>
            <span className="text-[9px] text-gray-400 tracking-tighter hidden sm:block">
              BARUN THERAPY
            </span>
          </div>
        </Link>

        {/* 데스크톱 카테고리: 서울·경기·인천 단독 권역 직결 링크 및 안내 */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-gray-300">
          <Link
            href="/seoul"
            className="hover:text-amber-400 transition-colors"
          >
            서울
          </Link>
          <Link
            href="/gyeonggi"
            className="hover:text-amber-400 transition-colors"
          >
            경기
          </Link>
          <Link
            href="/incheon"
            className="hover:text-amber-400 transition-colors"
          >
            인천
          </Link>
          <Link
            href="/#courses"
            className="hover:text-amber-400 transition-colors"
          >
            코스안내
          </Link>
          <Link
            href="/#guide"
            className="hover:text-amber-400 transition-colors"
          >
            이용가이드
          </Link>
        </nav>

        {/* 우측 빠른 문의 CTA 및 모바일 햄버거 버튼 */}
        <div className="flex items-center gap-2">
          <a
            href="tel:0507-1280-3303"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition-all active:scale-95 hover:brightness-105 flex items-center gap-1"
          >
            📞 빠른 문의
          </a>

          {/* 모바일 햄버거 토글 버튼 */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-amber-400 rounded-lg border border-white/10"
            aria-label="메뉴 열기"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 (단독 권역 및 코스 직결) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 mt-3 pt-3 space-y-2 text-xs font-bold text-gray-300">
          <div className="px-3 py-2 bg-neutral-900/70 rounded-xl space-y-1.5">
            <span className="text-[11px] text-amber-400 block font-bold">
              지역별 마사지
            </span>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <Link
                href="/seoul"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-xs bg-black/60 py-2 rounded-lg text-gray-200 hover:text-amber-400 hover:border-amber-400 border border-white/5 transition-colors"
              >
                📍 서울
              </Link>
              <Link
                href="/gyeonggi"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-xs bg-black/60 py-2 rounded-lg text-gray-200 hover:text-amber-400 hover:border-amber-400 border border-white/5 transition-colors"
              >
                📍 경기
              </Link>
              <Link
                href="/incheon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-xs bg-black/60 py-2 rounded-lg text-gray-200 hover:text-amber-400 hover:border-amber-400 border border-white/5 transition-colors"
              >
                📍 인천
              </Link>
            </div>
          </div>

          <Link
            href="/#courses"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg hover:bg-neutral-900 hover:text-amber-400 transition-colors"
          >
            💎 코스안내
          </Link>
          <Link
            href="/#guide"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg hover:bg-neutral-900 hover:text-amber-400 transition-colors"
          >
            📋 이용가이드
          </Link>
        </div>
      )}
    </header>
  );
}