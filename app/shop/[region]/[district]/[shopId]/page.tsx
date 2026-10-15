import { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://barun-therapy.netlify.app";

interface PageProps {
  params: Promise<{
    region?: string;
    district?: string;
    shopId?: string;
    id?: string;
  }>;
}

function getRegionFullName(region?: string): string {
  switch (region?.toLowerCase()) {
    case "seoul": return "서울";
    case "gyeonggi": return "경기";
    case "incheon": return "인천";
    default: return region || "";
  }
}

function safeDecode(str?: string): string {
  if (!str) return "";
  let decoded = str;
  try {
    decoded = decodeURIComponent(decodeURIComponent(str));
  } catch {
    try {
      decoded = decodeURIComponent(str);
    } catch {
      decoded = str;
    }
  }
  return decoded.trim();
}

function parseLocationText(region?: string, district?: string): string {
  const regionName = getRegionFullName(region);
  const decodedDistrict = safeDecode(district);
  return `${regionName} ${decodedDistrict}`.replace(/\s+/g, " ").trim();
}

const shopData: Record<string, {
  name: string;
  cleanName: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: { name: string; time: string; price: string; priceNumber: number; desc: string }[];
  features: string[];
}> = {
  "1": {
    name: "한국미인홈케어",
    cleanName: "한국미인홈케어",
    phone: "0507-1280-3303",
    badge: "실시간 만족도 1위",
    image: "/shop1.jpg",
    desc: "수도권 전지역 25분 신속 방문! 출장 타이 마사지, 아로마 마사지, 릴렉스 케어 전문 제휴처입니다.",
    courses: [
      { name: "출장 릴렉스 마사지 (기본)", time: "60분", price: "100,000원", priceNumber: 100000, desc: "뭉친 어깨와 등 근육을 부드럽게 이완시키는 맞춤형 코스" },
      { name: "출장 아로마 마사지 (순환)", time: "90분", price: "130,000원", priceNumber: 130000, desc: "천연 에센셜 오일을 사용하여 전신 순환과 피로 해소를 돕는 코스" }
    ],
    features: ["100% 현장후불제", "24시간 연중무휴", "신속 방문", "위생 관리"]
  },
  "2": {
    name: "오늘밤테라피",
    cleanName: "오늘밤테라피",
    phone: "0507-1280-3223",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "지친 하루의 피로를 말끔히 풀어드리는 1:1 방문 홈케어 서비스입니다.",
    courses: [
      { name: "출장 타이 마사지 (베이직)", time: "60분", price: "60,000원", priceNumber: 60000, desc: "전신 근육을 시원하게 스트레칭하는 출장 타이 코스" }
    ],
    features: ["선입금 0원", "전문 힐러", "간편 결제"]
  },
  "3": {
    name: "주주테라피",
    cleanName: "주주테라피",
    phone: "0507-1280-3193",
    badge: "칼도착 25분",
    image: "/shop3.jpg",
    desc: "정통 타이 마사지와 림프 순환을 돕는 아로마 마사지 전문 제휴 샵입니다.",
    courses: [
      { name: "스탠다드 정통 타이", time: "60분", price: "60,000원", priceNumber: 60000, desc: "머리부터 발끝까지 뭉친 근육을 풀어주는 코스" }
    ],
    features: ["100% 후불제", "평균 25분 방문", "개인정보 보호"]
  },
  "4": {
    name: "퀸즈홈테라피",
    cleanName: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "인기도 TOP",
    image: "/shop4.jpg",
    desc: "베테랑 테라피스트들의 1:1 방문 맞춤 케어를 제공합니다.",
    courses: [
      { name: "컨디션 케어 타이", time: "60분", price: "60,000원", priceNumber: 60000, desc: "지친 몸의 피로를 스트레칭으로 해소" }
    ],
    features: ["감성 테라피", "후불 결제", "상시 대기"]
  },
  "5": {
    name: "골든테라피",
    cleanName: "골든테라피",
    phone: "0507-1280-3360",
    badge: "정찰제 안심센터",
    image: "/shop5.jpg",
    desc: "투명한 정찰제 가격으로 계신 곳에서 편안하게 받아보세요.",
    courses: [
      { name: "출장 타이 릴렉스", time: "60분", price: "60,000원", priceNumber: 60000, desc: "기본 스트레칭 프로그램" }
    ],
    features: ["100% 현장후불제", "빠른 도착", "만족도 최상"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const targetId = resolvedParams.shopId || resolvedParams.id || "1";
  const shop = shopData[targetId] || shopData["1"];

  const currentRegion = parseLocationText(resolvedParams.region, resolvedParams.district);

  const charSum = (currentRegion + shop.cleanName + targetId + "shop_seo").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 30;

  const titleVariants = [
    `${currentRegion} 출장 타이 마사지 24시 안내 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 아로마 마사지 전문 제휴점 · ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 릴렉스 마사지 추천 코스 | ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 스웨디시 마사지 1:1 방문 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 전신 힐링 마사지 24시 예약 · ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 딥티슈 마사지 피로회복 케어 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 웰니스 마사지 바디 정찰제 | ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 맞춤 릴렉스 마사지 안내 · ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 건식 타이 마사지 제휴샵 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 프리미엄 감성 마사지 24시간 | ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 순환 케어 아로마 마사지 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 스트레스 완화 힐링 마사지 · ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 1인 프라이빗 웰니스 마사지 | ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 바디 밸런스 릴렉스 마사지 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 안심 후불제 전신 마사지 · ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 림프 순환 오일 마사지 | ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 딥릴렉스 프리미엄 마사지 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 소프트 힐링 바디 마사지 · ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 쾌적한 방문 웰니스 마사지 | ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 명품 스웨디시 힐링 마사지 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 체형 맞춤형 타이 마사지 · ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 심야 24시 안심 마사지 | ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 전문 테라피스트 방문 마사지 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 정통 스트레칭 타이 마사지 · ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 하이엔드 감성 스웨디시 마사지 | ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 VVIP 스페셜 릴렉스 마사지 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 전신 피로회복 힐링 마사지 · ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 안심 방문 릴렉싱 마사지 | ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 천연 에센셜 아로마 마사지 - ${shop.cleanName} | 바른테라피`,
    `${currentRegion} 출장 시그니처 웰니스 마사지 · ${shop.cleanName} | 바른테라피`
  ];

  const descriptionVariants = [
    `${currentRegion} 출장마사지 안내. 24시 신속 방문 타이 테라피 전문 ${shop.cleanName}에서 100% 후불제로 안심하고 이용하세요.`,
    `${currentRegion} 출장마사지 제휴 안내. 최고급 천연 에센셜 오일로 전신 피로를 부드럽게 풀어드리는 ${shop.cleanName}입니다.`,
    `${currentRegion} 출장마사지 맞춤 솔루션. 숙련된 테라피스트의 손길로 지친 일상의 활력을 되찾아보세요.`,
    `${currentRegion} 출장마사지 예약 가이드. 프라이빗한 내 공간에서 온전한 쉼과 휴식을 선사하는 ${shop.cleanName}.`,
    `${currentRegion} 출장마사지 프로그램 안내. 정직한 정찰제 요금과 신속한 25분 도착 시스템을 제공합니다.`,
    `${currentRegion} 출장마사지 딥티슈 코스. 굳은 근육을 시원하고 부드럽게 이완시키는 전문 바디케어.`,
    `${currentRegion} 출장마사지 힐링 안내. 편안하게 내 방에서 누리는 프리미엄 케어를 ${shop.cleanName}에서 지금 확인하세요.`,
    `${currentRegion} 출장마사지 1:1 커스텀 제휴처. 청결하고 쾌적한 힐링 테라피를 약속드립니다.`,
    `${currentRegion} 출장마사지 건식 & 아로마 코스 안내. 투명한 요금과 친절한 상담이 상시 대기 중입니다.`,
    `${currentRegion} 출장마사지 감성 힐링 24시간 안내. ${shop.cleanName}의 정성스러운 바디 밸런스 케어.`,
    `${currentRegion} 출장마사지 순환 케어 프로그램. 림프 흐름을 원활하게 돕는 체계적인 바디 관리 솔루션.`,
    `${currentRegion} 출장마사지 스트레스 완화 코스. 지친 심신에 활력을 불어넣는 전문 힐러 방문 테라피.`,
    `${currentRegion} 출장마사지 1인 맞춤 가이드. 이동의 번거로움 없이 편안한 휴식 시간을 누려보세요.`,
    `${currentRegion} 출장마사지 바디 밸런스 제휴샵 ${shop.cleanName}. 철저한 위생 관리와 품격 있는 서비스.`,
    `${currentRegion} 출장마사지 안심 후불 결제 시스템. 예약금이나 선입금을 절대 요구하지 않아 신뢰할 수 있습니다.`,
    `${currentRegion} 출장 마사지 아로마 릴렉싱. 숙련된 관리사의 디테일한 손길로 전신 피로를 회복하세요.`,
    `${currentRegion} 출장 마사지 딥릴렉스 테라피. 신속하고 안전한 방문으로 지친 하루의 피로를 날려드립니다.`,
    `${currentRegion} 출장 마사지 소프트 감성 터치. 나만의 아늑한 쉼터에서 완벽한 릴렉싱을 경험하세요.`,
    `${currentRegion} 출장 마사지 쾌적 안심 방문 케어. ${shop.cleanName}이 정성을 다해 일대일 케어를 선사합니다.`,
    `${currentRegion} 출장 마사지 최고급 스웨디시 안내. 감미로운 터칭과 포근한 휴식의 만남.`,
    `${currentRegion} 출장마사지 체형 맞춤 솔루션. 뭉친 부위를 정확히 파악하여 개운하게 풀어드립니다.`,
    `${currentRegion} 출장마사지 심야 24시 신속 배차. 수도권 전지역 평균 25분 빠른 도착을 보장합니다.`,
    `${currentRegion} 출장마사지 베테랑 힐러 방문 안내. 믿을 수 있는 1:1 방문 맞춤형 바디케어.`,
    `${currentRegion} 출장마사지 정통 스트레칭 타이 코스. 뻐근한 몸을 시원하게 늘려주어 활력을 충전해 드립니다.`,
    `${currentRegion} 출장마사지 하이엔드 감성 힐링 안내. 섬세한 테크닉으로 전신 긴장을 완벽히 해소합니다.`,
    `${currentRegion} 출장마사지 VVIP 올인원 코스. 타이와 아로마를 동시에 누리는 프리미엄 복합 패키지.`,
    `${currentRegion} 출장마사지 피로회복 힐링 안내. 내 집에서 편안하게 즐기는 고품격 스파 프로그램.`,
    `${currentRegion} 출장 마사지 안심 릴렉싱 제휴처 ${shop.cleanName}. 친절하고 정직한 정찰제 서비스를 제공합니다.`,
    `${currentRegion} 출장 마사지 천연 아로마 에센셜 오일 프로그램. 피부 보습과 림프 순환을 동시에 돕습니다.`,
    `${currentRegion} 출장 마사지 시그니처 웰니스 안내. 언제 어디서나 편안하게 예약하고 휴식을 누리세요.`
  ];

  const pageTitle = titleVariants[variantIndex];
  const pageDescription = descriptionVariants[variantIndex];
  const canonicalPath = `/shop/${resolvedParams.region}/${encodeURIComponent(safeDecode(resolvedParams.district))}/${targetId}`;

  return {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: `${SITE_URL}${canonicalPath}` },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      Yeti: "index,follow,max-image-preview:large",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: "바른테라피",
      locale: "ko_KR",
      type: "article",
      images: [
        {
          url: `${SITE_URL}${shop.image}`,
          width: 1200,
          height: 630,
          alt: `${shop.cleanName} ${currentRegion} 출장마사지 바른테라피`,
        },
      ],
    },
  };
}

export default async function DistrictShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const targetId = resolvedParams.shopId || resolvedParams.id || "1";
  const shop = shopData[targetId] || shopData["1"];

  const regionFullName = getRegionFullName(resolvedParams.region);
  const districtName = safeDecode(resolvedParams.district);
  const currentRegion = parseLocationText(resolvedParams.region, resolvedParams.district);

  const canonicalPath = `/shop/${resolvedParams.region}/${encodeURIComponent(districtName)}/${targetId}`;
  const currentUrl = `${SITE_URL}${canonicalPath}`;
  const backUrl = `/${resolvedParams.region}/${encodeURIComponent(districtName)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": regionFullName, "item": `${SITE_URL}/${resolvedParams.region}` },
          { "@type": "ListItem", "position": 3, "name": `${districtName} 마사지`, "item": `${SITE_URL}/${resolvedParams.region}/${encodeURIComponent(districtName)}` },
          { "@type": "ListItem", "position": 4, "name": shop.cleanName, "item": currentUrl }
        ]
      },
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${currentUrl}#business`,
        "name": `${shop.cleanName} (${currentRegion} 출장마사지)`,
        "description": shop.desc,
        "image": `${SITE_URL}${shop.image}`,
        "telephone": shop.phone,
        "url": currentUrl,
        "priceRange": "60,000원~160,000원",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": districtName,
          "addressRegion": regionFullName,
          "addressCountry": "KR"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${shop.cleanName} 코스 요금표`,
          "itemListElement": shop.courses.map((course, idx) => ({
            "@type": "Offer",
            "position": idx + 1,
            "name": course.name,
            "description": course.desc,
            "price": course.priceNumber,
            "priceCurrency": "KRW",
            "availability": "https://schema.org/InStock"
          }))
        }
      }
    ]
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-lg shadow-[0_0_12px_rgba(245,158,11,0.4)]">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                바른테라피
              </span>
              <span className="text-[9px] text-gray-400 tracking-tighter">BARUN THERAPY PARTNER</span>
            </div>
          </Link>
          
          <Link 
            href={backUrl}
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
          >
            ← {districtName} 목록
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        <section className="bg-[#121214] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-900">
            <img 
              src={shop.image} 
              alt={`${currentRegion} 출장 마사지 - ${shop.cleanName}`} 
              className="w-full h-full object-cover filter brightness-[0.7]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30"></div>
            <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {currentRegion} 출장 타이·아로마·스웨디시 마사지 24시 신속 방문
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white">
              {currentRegion} 출장마사지 24시 안내 - <span className="text-amber-400">{shop.cleanName}</span>
            </h1>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/50 p-4 rounded-2xl border border-white/5">
              {shop.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-amber-300">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0d0d0f] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              💎 {currentRegion} 출장 마사지 코스 및 정찰제 요금표
            </h2>
          </div>

          <div className="space-y-4">
            {shop.courses.map((course, idx) => (
              <div key={idx} className="bg-black/60 border border-white/10 hover:border-amber-500/40 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-3 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded border border-amber-500/30">
                      {course.time}
                    </span>
                    <h3 className="font-extrabold text-white text-base md:text-lg">{course.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400">{course.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 inline-block">
                    {course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black/80 p-5 rounded-2xl border border-white/10">
          <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> {currentRegion} 마사지 안심 이용 안내
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>바른테라피의 모든 제휴 업체는 <strong>100% 현장 후불제</strong>로만 운영되며, 사전 선입금이나 예약금을 일절 요구하지 않습니다.</li>
            <li>원하시는 시간 20~30분 전에 문의해 주시면 출장 타이 마사지, 아로마 마사지, 감성 스웨디시 전문 테라피스트가 신속하게 방문합니다.</li>
          </ul>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a 
            href={`tel:${shop.phone.replace(/-/g, "")}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> 전화로 즉시예약
          </a>
          <a 
            href={`sms:${shop.phone.replace(/-/g, "")}?body=${encodeURIComponent(`[${currentRegion}]${shop.cleanName} 출장마사지 예약 문의드립니다. (바른테라피 보고 연락드렸어요)`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 hover:border-amber-500/40 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>
    </div>
  );
}