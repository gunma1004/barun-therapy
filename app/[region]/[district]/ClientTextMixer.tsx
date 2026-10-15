"use client";

import { useMemo } from "react";
import Link from "next/link";

const SITE_URL = "https://barun-therapy.netlify.app";

interface ShopItem {
  id: number | string;
  name: string;
  desc: string;
  phone: string;
  price: string;
  image: string;
}

interface ClientTextMixerProps {
  region: string;
  district: string;
  dongName?: string;
  shops?: ShopItem[];
}

// 🌟 네이버 SEO 롱테일 키워드 순환 결합 패턴 10종
const WELLNESS_PATTERNS = [
  "출장 타이·아로마 마사지 및 전신 스트레칭 안내",
  "출장 신뢰케어 마사지 & 전신 릴렉스 프로그램",
  "출장 프리미엄 홈타이 & 천연 오일 순환 케어",
  "출장 스웨디시 감성 케어 & 1:1 맞춤 힐링 테라피",
  "출장 프라이빗 마사지 & 100% 현장후불 정찰제",
  "출장 딥티슈 마사지 & 만성 피로회복 솔루션",
  "출장 림프 순환 마사지 & 바디 밸런스 트리트먼트",
  "출장 안심 방문 마사지 & 심야할증 없는 정찰제",
  "출장 호텔식 럭셔리 마사지 & 자택 프라이빗 케어",
  "출장 나이트 힐링 마사지 & 편안한 이완 케어"
];

// 바른테라피 공식 제휴 샵 5선 기본 데이터
const defaultShops: ShopItem[] = [
  {
    id: 1,
    name: "한국미인홈케어",
    desc: "서울·수도권 전지역 신속 방문! 정성 가득한 테라피 & 릴렉싱 프로그램",
    phone: "0507-1280-3303",
    price: "100,000원부터~",
    image: "/shop1.jpg"
  },
  {
    id: 2,
    name: "오늘밤테라피",
    desc: "품격 있는 힐링을 선사하는 최고급 오일 프라이빗 방문 테라피 서비스",
    phone: "0507-1280-3223",
    price: "60,000원부터~",
    image: "/shop2.jpg"
  },
  {
    id: 3,
    name: "주주테라피",
    desc: "재방문율 1위! 칼도착 25분 보장, 철저한 위생 관리와 럭셔리 케어",
    phone: "0507-1280-3193",
    price: "60,000원부터~",
    image: "/shop3.jpg"
  },
  {
    id: 4,
    name: "퀸즈홈테라피",
    desc: "전문 힐러들의 맞춤형 VIP 피로회복 특화 프로그램 진행 중",
    phone: "0507-1280-3334",
    price: "60,000원부터~",
    image: "/shop4.jpg"
  },
  {
    id: 5,
    name: "골든테라피",
    desc: "선입금 없는 100% 후불제! 수도권 전지역 평균 25분 내 실시간 도착",
    phone: "0507-1280-3360",
    price: "110,000원부터~",
    image: "/shop5.jpg"
  }
];

export default function ClientTextMixer({
  region,
  district,
  dongName,
  shops = defaultShops
}: ClientTextMixerProps) {
  const locationText = dongName ? `${district} ${dongName}`.trim() : `${district}`.trim();

  // 지역명 글자수 해시 기반 순환 문구 생성
  const introText = useMemo(() => {
    if (!locationText) return `출장 신뢰케어 마사지 & 바디케어 안내`;
    const index =
      Math.abs(
        locationText
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), 0)
      ) % WELLNESS_PATTERNS.length;
    return `${locationText} ${WELLNESS_PATTERNS[index]}`;
  }, [locationText]);

  // 🌟 정규 라우트 규격으로 교정된 상세 URL 헬퍼 (/areas/... 완전 제거)
  const getShopDetailUrl = (shopId: number | string) => {
    return dongName
      ? `/shop/${region}/${encodeURIComponent(district)}/${encodeURIComponent(dongName)}/${shopId}`
      : `/shop/${region}/${encodeURIComponent(district)}/${shopId}`;
  };

  // 🌟 Schema.org 정식 ItemList 구조화 데이터 (중복 프로퍼티 제거)
  const shopListJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `${locationText} 추천 제휴 샵 목록`,
      "numberOfItems": shops.length,
      "itemListElement": shops.map((shop, index) => {
        const fullDetailUrl = `${SITE_URL}${getShopDetailUrl(shop.id)}`;

        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "HealthAndBeautyBusiness",
            "name": `${shop.name} (${locationText})`,
            "description": shop.desc,
            "image": `${SITE_URL}${shop.image}`,
            "telephone": shop.phone,
            "url": fullDetailUrl,
            "priceRange": shop.price,
            "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
            "currenciesAccepted": "KRW",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": locationText,
              "addressCountry": "KR"
            }
          }
        };
      })
    };
  }, [shops, locationText, dongName, region, district]);

  return (
    <div className="space-y-8">
      {/* 제휴 샵 리스트 전용 Schema.org ItemList 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopListJsonLd) }}
      />

      {/* 1. 지역 단위 상단 키워드 배너 */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center shadow-inner">
        <p className="text-xs md:text-sm font-black text-amber-300 tracking-wide">
          ✨ {introText}
        </p>
        <p className="text-[11px] text-gray-400 mt-1">
          {locationText} 출장 신뢰케어 마사지 정찰제 추천 코스를 바른테라피에서 편리하게 확인하세요.
        </p>
      </div>

      {/* 2. 제휴 샵 리스트 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            🏆 {locationText} 추천 제휴점 안내
          </h2>
          <span className="text-[11px] text-gray-500">100% 현장후불 정찰제 센터</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shops.map((shop) => {
            const detailUrl = getShopDetailUrl(shop.id);

            return (
              <div
                key={shop.id}
                className="bg-gradient-to-br from-[#161619] to-[#101013] border border-amber-500/25 hover:border-amber-400 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative"
              >
                {/* 🌟 올바른 정규 URL로 링크 연결 (크롤러 추적 보장) */}
                <Link
                  href={detailUrl}
                  className="absolute inset-0 z-10"
                  aria-label={`${shop.name} (${locationText}) 상세 코스 및 요금 보기`}
                />

                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-amber-500/30 bg-neutral-900">
                  <img
                    src={shop.image}
                    alt={`${shop.name} ${locationText}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {shop.name}
                  </h3>
                  <p className="text-[11px] text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                    {shop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300">{shop.price}</span>

                    {/* 직통 전화연결 버튼 */}
                    <a
                      href={`tel:${shop.phone.replace(/-/g, "")}`}
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all relative z-20 active:scale-95"
                    >
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}