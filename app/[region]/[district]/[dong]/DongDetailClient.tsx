// app/[region]/[district]/[dong]/DongDetailClient.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface DongDetailClientProps {
  region: string;
  districtName: string;
  dongName: string;
  regionFullName: string;
}

const initialShops = [
  {
    id: 1,
    name: "한국미인홈케어",
    desc: "서울·수도권 전지역 신속 방문! 정성 가득한 테라피 & 릴렉싱 프로그램",
    phone: "0507-1280-3303",
    price: "100,000원부터~",
    image: "/shop1.jpg",
  },
  {
    id: 2,
    name: "오늘밤테라피",
    desc: "품격 있는 힐링을 선사하는 최고급 오일 프라이빗 방문 테라피 서비스",
    phone: "0507-1280-3223",
    price: "60,000원부터~",
    image: "/shop2.jpg",
  },
  {
    id: 3,
    name: "주주테라피",
    desc: "재방문율 1위! 칼도착 25분 보장, 철저한 위생 관리와 럭셔리 케어",
    phone: "0507-1280-3193",
    price: "60,000원부터~",
    image: "/shop3.jpg",
  },
  {
    id: 4,
    name: "퀸즈홈테라피",
    desc: "전문 힐러들의 맞춤형 VIP 피로회복 특화 프로그램 진행 중",
    phone: "0507-1280-3334",
    price: "60,000원부터~",
    image: "/shop4.jpg",
  },
  {
    id: 5,
    name: "골든테라피",
    desc: "선입금 없는 100% 후불제! 수도권 전지역 평균 25분 내 실시간 도착",
    phone: "0507-1280-3360",
    price: "110,000원부터~",
    image: "/shop5.jpg",
  },
];

export default function DongDetailClient({
  region,
  districtName,
  dongName,
  regionFullName,
}: DongDetailClientProps) {
  const [shops, setShops] = useState(initialShops);

  useEffect(() => {
    const shuffled = [...initialShops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShops(shuffled);
  }, []);

  // "서울 서울" 또는 "종로구 종로구" 같은 중복 텍스트 방어
  const isDongValid = dongName && dongName !== districtName && dongName !== regionFullName;
  const shortLocation = isDongValid ? `${districtName} ${dongName}` : districtName;
  const fullLocation = districtName.includes(regionFullName) 
    ? shortLocation 
    : `${regionFullName} ${shortLocation}`;

  const shopListJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${shortLocation} 추천 제휴 샵 목록`,
      numberOfItems: shops.length,
      itemListElement: shops.map((shop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "HealthAndBeautyBusiness",
          name: `${shop.name} (${shortLocation})`,
          description: shop.desc,
          image: `https://barun-therapy.netlify.app${shop.image}`,
          telephone: shop.phone,
          priceRange: shop.price,
          paymentAccepted: "Cash, Credit Card (100% 현장 후불제)",
          currenciesAccepted: "KRW",
          address: {
            "@type": "PostalAddress",
            addressLocality: shortLocation,
            addressRegion: regionFullName,
            addressCountry: "KR",
          },
        },
      })),
    };
  }, [shops, shortLocation, regionFullName]);

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopListJsonLd) }}
      />

      <section className="bg-[#141418] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
        <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
          {fullLocation} WELLNESS DIRECTORY
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-white">
          📍 {shortLocation} 마사지 안내
        </h2>
        <p className="text-xs md:text-sm text-gray-300 mt-2 leading-relaxed">
          {fullLocation} 고객님을 위한 힐링 바디케어 디렉토리입니다. 선입금 없는 100% 현장 후불제 정찰 요금표와 코스를 확인하세요.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            🏆 {shortLocation} 추천 제휴점
          </h3>
          <span className="text-[11px] text-gray-500">100% 현장후불 정찰제 센터</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="bg-[#111114] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative"
            >
              <img
                src={shop.image}
                alt={`${shop.name} ${shortLocation}`}
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                  {shop.name} <span className="text-xs font-normal text-gray-400">({shortLocation})</span>
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-snug">
                  {shop.desc}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400">
                    {shop.price}
                  </span>
                  <a
                    href={`tel:${shop.phone.replace(/-/g, "")}`}
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow relative z-20 hover:brightness-105 active:scale-95 transition-all"
                  >
                    전화연결
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-2 flex justify-center gap-3">
        <Link
          href="/"
          className="text-xs bg-neutral-900 border border-white/10 px-4 py-2 rounded-xl text-gray-400 hover:text-amber-400 transition-colors"
        >
          🏠 홈으로 돌아가기
        </Link>
        <Link
          href={`/${region}/${encodeURIComponent(districtName)}`}
          className="text-xs bg-neutral-900 border border-white/10 px-4 py-2 rounded-xl text-amber-400 hover:text-yellow-300 transition-colors"
        >
          📍 {districtName} 전체보기
        </Link>
      </div>
    </div>
  );
}