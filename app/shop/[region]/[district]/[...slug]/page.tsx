import { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://barun-therapy.netlify.app";

interface PageProps {
  params: Promise<{
    region?: string;
    district?: string;
    slug?: string[]; // [...slug] 배열 (예: ['1'] 또는 ['역삼동', '1'])
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
  try {
    return decodeURIComponent(decodeURIComponent(str)).trim();
  } catch {
    try {
      return decodeURIComponent(str).trim();
    } catch {
      return str.trim();
    }
  }
}

const shopData: Record<string, {
  name: string;
  cleanName: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: { id: string; name: string; time: string; price: string; priceNumber: number; desc: string }[];
  features: string[];
}> = {
  "1": {
    name: "한국미인홈케어",
    cleanName: "한국미인홈케어",
    phone: "0507-1280-3303",
    badge: "실시간 만족도 1위",
    image: "/shop1.jpg",
    desc: "수도권 전지역 25분 신속 방문! 출장 타이 마사지, 아로마 마사지, 릴렉스 케어 전문 제휴처입니다. 숙련된 전문 테라피스트들이 일상의 피로를 말끔히 해소해 드립니다.",
    courses: [
      { id: "thai", name: "타이마사지", time: "60분", price: "80,000원", priceNumber: 80000, desc: "오일 없이 압의 세기와 스트레칭 범위를 조율하는 건식 관리입니다." },
      { id: "aroma", name: "아로마마사지", time: "90분", price: "110,000원", priceNumber: 110000, desc: "오일의 향과 사용 범위를 먼저 확인하고 부드러운 흐름으로 진행하는 관리입니다." },
      { id: "healing", name: "힐링마사지", time: "60분", price: "100,000원", priceNumber: 100000, desc: "호흡과 휴식의 리듬을 해치지 않도록 전신을 차분히 나누어 관리합니다." }
    ],
    features: ["100% 현장후불제", "24시간 연중무휴", "신속 방문 보장", "철저한 위생 관리"]
  },
  "2": {
    name: "오늘밤테라피",
    cleanName: "오늘밤테라피",
    phone: "0507-1280-3223",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "지친 하루의 피로를 말끔히 풀어드리는 1:1 방문 홈케어 서비스입니다. 편안한 나만의 공간에서 품격 있는 테라피를 경험하세요.",
    courses: [
      { id: "thai", name: "타이마사지", time: "60분", price: "60,000원", priceNumber: 60000, desc: "전신 근육을 시원하게 스트레칭하는 출장 타이 코스" },
      { id: "aroma", name: "아로마마사지", time: "90분", price: "90,000원", priceNumber: 90000, desc: "부드러운 오일링으로 심신을 안정시키는 프리미엄 코스" }
    ],
    features: ["선입금 없는 안전결제", "전문 힐러 상주", "간편 예약 시스템", "1:1 맞춤 케어"]
  },
  "3": {
    name: "주주테라피",
    cleanName: "주주테라피",
    phone: "0507-1280-3193",
    badge: "칼도착 25분",
    image: "/shop3.jpg",
    desc: "정통 타이 마사지와 림프 순환을 돕는 아로마 마사지 전문 제휴 샵입니다. 고객 만족을 최우선으로 정성을 다합니다.",
    courses: [
      { id: "thai", name: "스탠다드 정통 타이", time: "60분", price: "60,000원", priceNumber: 60000, desc: "머리부터 발끝까지 뭉친 근육을 풀어주는 코스" }
    ],
    features: ["100% 후불제", "평균 25분 방문", "프라이버시 보호", "최고급 용품 사용"]
  },
  "4": {
    name: "퀸즈홈테라피",
    cleanName: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "인기도 TOP",
    image: "/shop4.jpg",
    desc: "베테랑 테라피스트들의 1:1 방문 맞춤 케어를 제공합니다. 지친 심신에 활력을 불어넣는 최고의 휴식을 선사합니다.",
    courses: [
      { id: "thai", name: "컨디션 케어 타이", time: "60분", price: "60,000원", priceNumber: 60000, desc: "지친 몸의 피로를 스트레칭으로 해소" }
    ],
    features: ["감성 테라피", "후불 결제", "상시 대기", "친절 상담"]
  },
  "5": {
    name: "골든테라피",
    cleanName: "골든테라피",
    phone: "0507-1280-3360",
    badge: "정찰제 안심센터",
    image: "/shop5.jpg",
    desc: "투명한 정찰제 가격으로 계신 곳에서 편안하게 받아보세요. 전문 관리사의 손길로 일상의 스트레스를 날려드립니다.",
    courses: [
      { id: "thai", name: "출장 타이 릴렉스", time: "60분", price: "60,000원", priceNumber: 60000, desc: "기본 스트레칭 프로그램" }
    ],
    features: ["100% 현장후불제", "빠른 도착", "만족도 최상", "철저한 방역"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  const shopId = slug.length >= 2 ? slug[1] : slug[0] || "1";
  const dongName = slug.length >= 2 ? safeDecode(slug[0]) : "";
  
  const regionName = getRegionFullName(resolvedParams.region);
  const districtName = safeDecode(resolvedParams.district);
  const locationText = dongName ? `${districtName} ${dongName}` : `${districtName}`;
  const currentRegion = `${regionName} ${locationText}`.trim();

  const shop = shopData[shopId] || shopData["1"];

  const charSum = (currentRegion + shop.cleanName + shopId + "shop_seo").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
  const canonicalPath = `/shop/${resolvedParams.region}/${encodeURIComponent(districtName)}${dongName ? `/${encodeURIComponent(dongName)}` : ''}/${shopId}`;

  return {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: `${SITE_URL}${canonicalPath}` },
  };
}

export default async function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  const shopId = slug.length >= 2 ? slug[1] : slug[0] || "1";
  const dongName = slug.length >= 2 ? safeDecode(slug[0]) : "";
  
  const regionName = getRegionFullName(resolvedParams.region);
  const districtName = safeDecode(resolvedParams.district);
  const locationText = dongName ? `${districtName} ${dongName}` : `${districtName}`;
  const currentRegion = `${regionName} ${locationText}`.trim();

  const shop = shopData[shopId] || shopData["1"];
  const backUrl = dongName 
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}`;

  const currentUrl = `${SITE_URL}/shop/${resolvedParams.region}/${encodeURIComponent(districtName)}${dongName ? `/${encodeURIComponent(dongName)}` : ''}/${shopId}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": regionName, "item": `${SITE_URL}/${resolvedParams.region}` },
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
          "addressRegion": regionName,
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
    <div className="bg-[#070709] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 헤더 */}
      <header className="site-header sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5">
        <div className="page-width header-inner max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="brand flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black">
              B
            </div>
            <span className="text-lg font-black bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
              바른테라피
            </span>
          </Link>
          <Link 
            href={backUrl}
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
          >
            ← 지역 목록으로
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main id="main" className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
        {/* 프로필 히어로 섹션 */}
        <section className="profile-hero bg-[#121214] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl">
          <div className="hero-grid grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="hero-copy p-6 md:p-8 space-y-4">
              <nav className="breadcrumbs text-xs text-amber-400 font-bold" aria-label="현재 위치">
                <Link href="/">홈</Link> <span>›</span> <Link href={`/${resolvedParams.region}`}>{regionName}</Link> <span>›</span> <span>{districtName}</span>
              </nav>
              <p className="eyebrow text-[10px] tracking-widest text-amber-300 font-black uppercase">PRIVATE CARE ATELIER</p>
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                {currentRegion} 출장 밸런스 전신케어 안마
              </h1>
              <p className="partner-name text-sm text-gray-300">
                제휴업체 · <strong className="text-amber-400">{shop.cleanName}</strong>
              </p>
              <p className="hero-description text-xs text-gray-400 leading-relaxed bg-black/40 p-3.5 rounded-2xl border border-white/5">
                {shop.desc}
              </p>
              <div className="hero-actions flex gap-3 pt-2">
                <a className="primary-cta bg-amber-500 hover:bg-amber-400 text-black font-black px-5 py-2.5 rounded-xl text-xs shadow transition-colors" href={`tel:${shop.phone}`}>
                  전화 상담
                </a>
                <a className="secondary-cta bg-neutral-900 hover:bg-neutral-800 text-white font-black px-5 py-2.5 rounded-xl text-xs border border-white/10 transition-colors" href="#price">
                  가격표 보기
                </a>
              </div>
            </div>
            <figure className="profile-lead-media relative h-64 md:h-full min-h-[260px] bg-neutral-900">
              <img className="profile-lead-image w-full h-full object-cover filter brightness-[0.8]" src={shop.image} alt={`${shop.cleanName} 대표 안내 이미지`} width="600" height="600" />
            </figure>
          </div>
        </section>

        {/* 팩트 스트립 */}
        <div className="fact-strip bg-[#0f0f13] border border-amber-500/20 rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <div><small className="text-gray-400 block mb-1">운영 지역</small><strong className="text-white font-bold">{currentRegion}</strong></div>
          <div><small className="text-gray-400 block mb-1">상담</small><strong className="text-amber-400 font-bold">전화로 일정 확인</strong></div>
          <div><small className="text-gray-400 block mb-1">결제</small><strong className="text-white font-bold">100% 현장 후불제</strong></div>
          <div><small className="text-gray-400 block mb-1">코스</small><strong className="text-white font-bold">전체 {shop.courses.length}개 코스</strong></div>
        </div>

        {/* 코스 가격 섹션 (다이내믹 카드 그리드) */}
        <section className="section operations space-y-6" id="price">
          <header className="section-head text-center space-y-1">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">COURSE & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white">경기 안성 코스 가격 안내</h2>
            <p className="text-xs text-gray-400">다니엘 스튜디오에서 안내하는 전체 코스의 이용 시간과 가격을 확인할 수 있습니다.</p>
          </header>

          <div className="catalog-course-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            {shop.courses.map((course, idx) => (
              <article key={idx} className="catalog-course-card bg-[#111114] border border-amber-500/20 hover:border-amber-500/50 p-6 rounded-3xl space-y-3 transition-all shadow-lg">
                <div className="flex justify-between items-center">
                  <small className="text-amber-400 font-black text-xs">COURSE 0{idx + 1}</small>
                  <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-500/30">{course.time}</span>
                </div>
                <h3 className="font-black text-white text-lg">{course.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{course.desc}</p>
                <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs text-gray-400">정찰제 요금</span>
                  <strong className="text-amber-400 text-lg font-black">{course.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 예약 프로세스 안내 */}
        <section className="section bg-[#0f0f13] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
          <header className="section-head text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">RESERVATION GUIDE</span>
            <h2 className="text-xl font-black text-white mt-1">예약 및 상담 안내</h2>
          </header>
          <ol className="process-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <li className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-xs text-amber-400 font-black">01</span>
              <h3 className="font-bold text-white text-sm">방문 위치</h3>
              <p className="text-xs text-gray-400">방문 위치와 출입 방법을 알려 주세요.</p>
            </li>
            <li className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-xs text-amber-400 font-black">02</span>
              <h3 className="font-bold text-white text-sm">희망 일정</h3>
              <p className="text-xs text-gray-400">원하는 날짜와 시간을 알려 주세요.</p>
            </li>
            <li className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-xs text-amber-400 font-black">03</span>
              <h3 className="font-bold text-white text-sm">코스와 시간</h3>
              <p className="text-xs text-gray-400">이용할 코스명과 시간을 알려 주세요.</p>
            </li>
            <li className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-xs text-amber-400 font-black">04</span>
              <h3 className="font-bold text-white text-sm">집중·제외 부위</h3>
              <p className="text-xs text-gray-400">집중할 부위와 제외할 부위를 알려 주세요.</p>
            </li>
          </ol>
        </section>

        {/* FAQ 섹션 */}
        <section className="section faq-section bg-[#0d0d0f] border border-white/10 p-6 rounded-3xl space-y-4">
          <header className="section-head">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ</span>
            <h2 className="text-lg font-black text-white mt-1">{shop.cleanName} 이용 질문</h2>
          </header>
          <details open className="bg-black/50 p-4 rounded-2xl border border-white/5 cursor-pointer">
            <summary className="font-bold text-sm text-gray-200 hover:text-amber-400 transition-colors">
              예약 전에 무엇을 확인하면 되나요?
            </summary>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed pt-2 border-t border-white/5">
              방문 위치, 희망 일정, 코스와 이용 시간, 집중·제외 부위를 순서대로 확인하신 뒤 전화로 상담해 주시면 신속하게 안내해 드립니다.
            </p>
          </details>
        </section>

      </main>

      {/* 하단 푸터 및 고정 액션 바 */}
      <footer className="site-footer bg-[#040406] border-t border-white/10 py-10 mt-auto text-xs text-gray-500">
        <div className="max-w-4xl mx-auto px-4 space-y-4 text-center">
          <p className="text-gray-400">지역별 코스·가격과 전화 상담 정보를 안내합니다.</p>
          <p className="copyright text-[11px] text-gray-600">© 2026 바른테라피. All Rights Reserved.</p>
        </div>
      </footer>

      <a 
        className="fixed-call fixed bottom-4 right-4 z-50 bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-transform active:scale-95 flex items-center gap-2 text-sm" 
        href={`tel:${shop.phone}`}
      >
        <span>📞</span> 전화 상담
      </a>
    </div>
  );
}