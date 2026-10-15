import { Metadata } from "next";
import Link from "next/link";
import ClientTextMixer from "./ClientTextMixer";

const SITE_URL = "https://barun-therapy.netlify.app";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
  searchParams?: Promise<{
    dong?: string;
  }>;
}

function safeDecode(str: string): string {
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

function getRegionFullName(region: string): string {
  switch (region?.toLowerCase()) {
    case "seoul": return "서울";
    case "gyeonggi": return "경기";
    case "incheon": return "인천";
    default: return region || "";
  }
}

// 🗺️ 영문 슬러그 -> 한글 표준 행정구역명 맵핑 사전
const SLUG_TO_KOREAN: Record<string, string> = {
  seoul: "서울",
  gyeonggi: "경기",
  incheon: "인천",
  "jongno": "종로구",
  "jongno-gu": "종로구",
  "jung": "중구",
  "jung-gu": "중구",
  "yongsan": "용산구",
  "yongsan-gu": "용산구",
  "seongdong": "성동구",
  "seongdong-gu": "성동구",
  "gwangjin": "광진구",
  "gwangjin-gu": "광진구",
  "dongdaemun": "동대문구",
  "dongdaemun-gu": "동대문구",
  "jungnang": "중랑구",
  "jungnang-gu": "중랑구",
  "seongbuk": "성북구",
  "seongbuk-gu": "성북구",
  "gangbuk": "강북구",
  "gangbuk-gu": "강북구",
  "dobong": "도봉구",
  "dobong-gu": "도봉구",
  "nowon": "노원구",
  "nowon-gu": "노원구",
  "eunpyeong": "은평구",
  "eunpyeong-gu": "은평구",
  "seodaemun": "서대문구",
  "seodaemun-gu": "서대문구",
  "mapo": "마포구",
  "mapo-gu": "마포구",
  "yangcheon": "양천구",
  "yangcheon-gu": "양천구",
  "gangseo": "강서구",
  "gangseo-gu": "강서구",
  "guro": "구로구",
  "guro-gu": "구로구",
  "geumcheon": "금천구",
  "geumcheon-gu": "금천구",
  "yeongdeungpo": "영등포구",
  "yeongdeungpo-gu": "영등포구",
  "dongjak": "동작구",
  "dongjak-gu": "동작구",
  "gwanak": "관악구",
  "gwanak-gu": "관악구",
  "seocho": "서초구",
  "seocho-gu": "서초구",
  "gangnam": "강남구",
  "gangnam-gu": "강남구",
  "songpa": "송파구",
  "songpa-gu": "송파구",
  "gangdong": "강동구",
  "gangdong-gu": "강동구",

  "suwon": "수원시",
  "suwon-si": "수원시",
  "seongnam": "성남시",
  "seongnam-si": "성남시",
  "goyang": "고양시",
  "goyang-si": "고양시",
  "yongin": "용인시",
  "yongin-si": "용인시",
  "bucheon": "부천시",
  "bucheon-si": "부천시",
  "ansan": "안산시",
  "ansan-si": "안산시",
  "anyang": "안양시",
  "anyang-si": "안양시",
  "namyangju": "남양주시",
  "namyangju-si": "남양주시",
  "hwaseong": "화성시",
  "hwaseong-si": "화성시",
  "pyeongtaek": "평택시",
  "pyeongtaek-si": "평택시",
  "uijeongbu": "의정부시",
  "uijeongbu-si": "의정부시",
  "paju": "파주시",
  "paju-si": "파주시",
  "siheung": "시흥시",
  "siheung-si": "시흥시",
  "gimpo": "김포시",
  "gimpo-si": "김포시",
  "gwangmyeong": "광명시",
  "gwangmyeong-si": "광명시",
  "gwangju": "광주시",
  "gwangju-si": "광주시",
  "gunpo": "군포시",
  "gunpo-si": "군포시",
  "icheon": "이천시",
  "icheon-si": "이천시",
  "osan": "오산시",
  "osan-si": "오산시",
  "hanam": "하남시",
  "hanam-si": "하남시",
  "yangju": "양주시",
  "yangju-si": "양주시",
  "guri": "구리시",
  "guri-si": "구리시",
  "anseong": "안성시",
  "anseong-si": "안성시",
  "pocheon": "포천시",
  "pocheon-si": "포천시",
  "uiwang": "의왕시",
  "uiwang-si": "의왕시",
  "yeoju": "여주시",
  "yeoju-si": "여주시",
  "yangpyeong": "양평군",
  "yangpyeong-gun": "양평군",
  "dongducheon": "동두천시",
  "dongducheon-si": "동두천시",
  "gwacheon": "과천시",
  "gwacheon-si": "과천시",
  "gapyeong": "가평군",
  "gapyeong-gun": "가평군",
  "yeoncheon": "연천군",
  "yeoncheon-gun": "연천군",

  "yeonsu": "연수구",
  "yeonsu-gu": "연수구",
  "namdong": "남동구",
  "namdong-gu": "남동구",
  "bupyeong": "부평구",
  "bupyeong-gu": "부평구",
  "seo": "서구",
  "seo-gu": "서구",
  "michuhol": "미추홀구",
  "michuhol-gu": "미추홀구",
  "junggu": "서울중구",
  "yeyang": "계양구",
  "gyeyang-gu": "계양구",
  "dong": "동구",
  "dong-gu": "동구",
  "ganghwa": "강화군",
  "ganghwa-gun": "강화군",
  "ongjin": "옹진군",
  "ongjin-gun": "옹진군",
};

function formatDistrictName(rawDistrict: string): string {
  const decoded = safeDecode(rawDistrict);
  const lower = decoded.toLowerCase();
  return SLUG_TO_KOREAN[lower] || decoded;
}

const DISTRICT_DONGS_MAP: Record<string, string[]> = {
  강서구: ["화곡동", "가양동", "등촌동", "발산동", "방화동", "염창동", "공항동", "마곡동"],
  강남구: ["역삼동", "논현동", "신사동", "삼성동", "대치동", "청담동", "도곡동", "개포동"],
  서초구: ["서초동", "잠원동", "반포동", "방배동", "양재동", "내곡동"],
  송파구: ["잠실동", "신천동", "풍납동", "송파동", "석촌동", "삼전동", "가락동", "문정동", "방이동"],
  마포구: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "서교동", "합정동", "망원동", "상암동"],
  영등포구: ["영등포동", "여의도동", "당산동", "도림동", "문래동", "양평동", "신길동", "대림동"],
  종로구: ["청운동", "효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "혜화동", "이화동", "숭인동"],
  중구: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "황학동"],
  용산구: ["후암동", "남영동", "청파동", "원효로동", "효창동", "용문동", "이촌동", "이태원동", "한남동", "서빙고동", "보광동"],
};

const SEO_PATTERNS = [
  { title: "출장 신뢰케어 마사지 & 프리미엄 케어", desc: (r: string) => `${r} 출장마사지 안심 가이드. 100% 현장후불 정찰제 요금을 바른테라피에서 확인하세요.` },
  { title: "출장 스웨디시 마사지 감성 바디 릴렉스", desc: (r: string) => `${r} 출장마사지 추천 코스 안내. 섬세한 터치와 부드러운 오일 이완 프로그램을 제공합니다.` },
  { title: "출장 아로마 마사지 오일 테라피 안내", desc: (r: string) => `${r} 출장마사지 힐링 케어. 천연 에센셜 오일로 누적된 일상 스트레스를 부드럽게 비워냅니다.` },
  { title: "출장 타이 마사지 정통 바디 스트레칭", desc: (r: string) => `${r} 출장마사지 전문 안내. 숙련된 테라피스트의 전신 스트레칭과 시원한 압 조절을 만나보세요.` },
  { title: "출장 릴렉스 마사지 집중 피로 회복", desc: (r: string) => `${r} 출장마사지 큐레이션. 집이나 편안한 숙소에서 언제든 프라이빗하게 누리는 힐링 플랫폼.` },
];

function getDynamicDistrictInsight(districtName: string, seed: number) {
  const sectionsGroup = [
    {
      subtitle: `${districtName} 직장인 및 현대인을 위한 바디 밸런스 회복 가이드`,
      sec1Title: "1. 좌식 생활과 경추·승모근의 만성 긴장 메커니즘",
      sec1Text: [
        `${districtName} 일대에서 사무 업무나 이동이 잦은 직장인들은 장시간 고정된 자세로 인해 상체 근골격계에 피로가 쉽게 누적됩니다. 어깨 윗선이 묵직해지고 혈류 순환이 제한되면서 뻐근한 피로감이 동반됩니다.`,
        `이러한 국소 부위의 근막 유착을 풀어내기 위해서는 경직된 근섬유의 온도를 서서히 올리고, 수기 테크닉을 통해 근육 결을 따라 부드럽게 이완시키는 과정이 요구됩니다.`
      ],
      sec2Title: "2. 신체 상태에 따른 건식 스트레칭과 오일 테라피의 차이",
      sec2Text: [
        `바디 케어는 압의 깊이와 전달 방식에 따라 기대 효과가 달라집니다. 본인의 당일 신체 상태와 관절 상태에 맞춰 적절한 기법을 고르는 것이 안전한 힐링의 핵심입니다.`,
        `오일을 사용하지 않는 건식 타이 케어는 관절의 가동성을 넓히고 뭉친 근육을 길게 늘려줍니다. 반면 스웨디시 및 아로마 테라피는 심신의 깊은 이완과 감정적 스트레스 해소를 원하는 분들에게 알맞습니다.`
      ],
      sec3Title: "3. 독립된 1인 공간에서 누리는 심리적 안정 효과",
      sec3Text: [
        `테라피의 생리학적 효과를 극대화하는 중요한 요소는 바로 심리적 안정감입니다. 외부 매장을 방문할 때 겪는 번거로운 이동을 줄여줍니다.`,
        `자택이나 숙소 등 독립된 공간에서 진행되는 프라이빗 케어는 외부의 시선과 소음이 완전히 차단되어 부교감 신경계를 빠르게 활성화합니다.`
      ],
      sec4Title: "4. 안전하고 투명한 웰니스 이용 수칙",
      sec4Text: [
        `건전하고 투명한 이용 환경을 위해 ${districtName} 고객님께서는 다음 사항을 사전에 확인하시는 것이 좋습니다. 신뢰할 수 있는 공식 등록 파트너는 불법 선입금을 일절 요구하지 않습니다.`,
        `또한 최근 디스크 시술을 받았거나 임신, 급성 염증 질환이 있는 경우에는 관리 시작 전 담당 힐러에게 컨디션을 명확히 전달하시길 권장합니다.`
      ]
    }
  ];
  return sectionsGroup[seed % sectionsGroup.length];
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const { region, district } = resolvedParams;
  const regionFullName = getRegionFullName(region);
  const rawDistrictName = formatDistrictName(district);
  const dongName = resolvedSearchParams?.dong ? safeDecode(resolvedSearchParams.dong) : "";

  const districtName = (rawDistrictName === regionFullName || !rawDistrictName)
    ? regionFullName
    : rawDistrictName;

  const displayLocation = dongName
    ? `${districtName} ${dongName}`
    : (districtName === regionFullName ? regionFullName : `${regionFullName} ${districtName}`);

  const charSum = (displayLocation + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pattern = SEO_PATTERNS[Math.abs(charSum) % SEO_PATTERNS.length];

  const finalTitle = `${displayLocation} ${pattern.title} | 바른테라피`;
  const finalDescription = pattern.desc(districtName);

  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(district)}${
    dongName ? `?dong=${encodeURIComponent(dongName)}` : ""
  }`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
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
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: "바른테라피",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/shop1.jpg`,
          width: 1200,
          height: 630,
          alt: `${districtName} 출장마사지 바른테라피`,
        },
      ],
    },
  };
}

export default async function RegionalDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const { region, district } = resolvedParams;
  const regionFullName = getRegionFullName(region);
  const rawDistrictName = formatDistrictName(district);
  const dongName = resolvedSearchParams?.dong ? safeDecode(resolvedSearchParams.dong) : "";

  const districtName = (rawDistrictName === regionFullName || !rawDistrictName)
    ? regionFullName
    : rawDistrictName;

  const displayLocation = dongName
    ? `${districtName} ${dongName}`
    : (districtName === regionFullName ? regionFullName : `${regionFullName} ${districtName}`);

  const charSum = (displayLocation + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pattern = SEO_PATTERNS[Math.abs(charSum) % SEO_PATTERNS.length];

  const article = getDynamicDistrictInsight(districtName, Math.abs(charSum));

  const dongsList = DISTRICT_DONGS_MAP[districtName] || [
    `${districtName} 1동`,
    `${districtName} 2동`,
    `${districtName} 중앙동`,
  ];

  const currentUrl = `${SITE_URL}/${region}/${encodeURIComponent(district)}${
    dongName ? `?dong=${encodeURIComponent(dongName)}` : ""
  }`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": regionFullName, "item": `${SITE_URL}/${region}` },
          { "@type": "ListItem", "position": 3, "name": `${districtName} 마사지`, "item": currentUrl }
        ]
      },
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${currentUrl}#business`,
        "name": `${displayLocation} 출장 신뢰케어 마사지 - 바른테라피`,
        "description": pattern.desc(districtName),
        "url": currentUrl,
        "telephone": "0507-1280-3303",
        "image": `${SITE_URL}/shop1.jpg`,
        "priceRange": "60,000원~160,000원",
        "currenciesAccepted": "KRW",
        "paymentAccepted": "Cash, Credit Card (100% 현장 후불제)",
        "openingHours": "Mo-Su 00:00-24:00",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": districtName,
          "addressRegion": regionFullName,
          "addressCountry": "KR"
        }
      }
    ]
  };

  return (
    <div className="bg-[#070709] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-40 bg-[#070709]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between">
          <Link href="/" className="font-black text-lg text-white flex items-center gap-1.5">
            <span className="w-2.5 h-5 bg-amber-400 rounded-full inline-block"></span>
            바른테라피
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              전체 지역
            </Link>
            <a
              href="tel:0507-1280-3303"
              className="px-3.5 py-1.5 rounded-full bg-amber-400 text-black font-black text-xs hover:scale-105 transition-transform"
            >
              📞 전화 상담
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418]">
          <div className="p-6 md:p-10 space-y-2">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
              {regionFullName.toUpperCase()} · DISTRICT WELLNESS HUB
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {displayLocation} {pattern.title}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
              {pattern.desc(districtName)}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2 h-4 bg-amber-400 rounded-full inline-block"></span>
              📍 {districtName} 동별 안내 바로가기
            </h2>
            <span className="text-xs text-gray-400">전체 {dongsList.length}개 동</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {dongsList.map((dong) => (
              <Link
                key={dong}
                href={`/${region}/${encodeURIComponent(district)}/${encodeURIComponent(dong)}`}
                className="p-3 rounded-xl bg-[#141418] border border-white/5 hover:border-amber-400/50 hover:bg-amber-400/5 transition-all text-center group"
              >
                <span className="block font-bold text-xs sm:text-sm text-gray-200 group-hover:text-amber-400 transition-colors">
                  {dong}
                </span>
                <span className="text-[10px] text-gray-400 group-hover:text-gray-300 mt-0.5 block">
                  {dong} 출장마사지 →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <ClientTextMixer region={region} district={districtName} dongName={dongName} />

        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              WELLNESS & BODY CARE INSIGHT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {article.subtitle}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {districtName} 고객님을 위한 신체 불균형 개선 원리와 테라피 선택 가이드
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec1Title}
            </h3>
            {article.sec1Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec2Title}
            </h3>
            {article.sec2Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec3Title}
            </h3>
            {article.sec3Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec4Title}
            </h3>
            {article.sec4Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 text-[11px] text-gray-500">
            * 본 가이드는 {districtName} 지역 거주자 및 방문객 여러분의 올바른 신체 건강 상식과 투명한 테라피 서비스 이용을 돕기 위해 작성된 정보성 칼럼입니다.
          </div>
        </section>

        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h2 className="text-xl font-black text-white mt-1">{districtName} 안심 이용 순서</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h3 className="font-bold text-white mt-1">지역 확인</h3>
              <p className="text-xs text-gray-400 mt-1">{districtName} 제휴 샵 목록을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h3 className="font-bold text-white mt-1">코스 비교</h3>
              <p className="text-xs text-gray-400 mt-1">스웨디시, 타이, 아로마 프로그램을 비교합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h3 className="font-bold text-white mt-1">직접 소통</h3>
              <p className="text-xs text-gray-400 mt-1">전화 버튼을 통해 샵과 직접 일정을 상담합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h3 className="font-bold text-white mt-1">맞춤 힐링</h3>
              <p className="text-xs text-gray-400 mt-1">100% 현장후불 정찰제 요금으로 편안한 관리를 경험합니다.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ</span>
            <h2 className="text-xl font-black text-white mt-1">{districtName} 자주 묻는 질문</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {districtName} 출장마사지 예약은 어떻게 하나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 리스트에서 원하시는 샵 카드의 전화연결 버튼을 누르시면 해당 업체 매니저와 직접 프로그램 및 시간을 조율하실 수 있습니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> 바른테라피 플랫폼 이용 시 별도 수수료가 있나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 바른테라피는 선입금 없는 100% 현장후불 안내 플랫폼으로 이용자에게 어떠한 중개 수수료나 예약금도 요구하지 않습니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#040406] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a 
              href="tel:0507-1280-3303" 
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> 바른테라피 제휴 문의
            </a>
          </div>
          <p className="text-gray-400 font-medium">바른테라피는 쾌적하고 건전한 프리미엄 바디 웰니스 제휴 정보를 제공합니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; BARUN THERAPY ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}