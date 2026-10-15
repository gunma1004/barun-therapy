import { Metadata } from "next";
import Link from "next/link";
import DongDetailClient from "./DongDetailClient";

const SITE_URL = "https://barun-therapy.netlify.app";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
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

// 🗺️ 영문 슬러그 -> 한글 표준 변환 사전
const SLUG_TO_KOREAN: Record<string, string> = {
  seoul: "서울",
  gyeonggi: "경기",
  incheon: "인천",
  jongno: "종로구",
  "jongno-gu": "종로구",
  jung: "중구",
  "jung-gu": "중구",
  yongsan: "용산구",
  "yongsan-gu": "용산구",
  seongdong: "성동구",
  "seongdong-gu": "성동구",
  gwangjin: "광진구",
  "gwangjin-gu": "광진구",
  dongdaemun: "동대문구",
  "dongdaemun-gu": "동대문구",
  jungnang: "중랑구",
  "jungnang-gu": "중랑구",
  seongbuk: "성북구",
  "seongbuk-gu": "성북구",
  gangbuk: "강북구",
  "gangbuk-gu": "강북구",
  dobong: "도봉구",
  "dobong-gu": "도봉구",
  nowon: "노원구",
  "nowon-gu": "노원구",
  eunpyeong: "은평구",
  "eunpyeong-gu": "은평구",
  seodaemun: "서대문구",
  "seodaemun-gu": "서대문구",
  mapo: "마포구",
  "mapo-gu": "마포구",
  yangcheon: "양천구",
  "yangcheon-gu": "양천구",
  gangseo: "강서구",
  "gangseo-gu": "강서구",
  guro: "구로구",
  "guro-gu": "구로구",
  geumcheon: "금천구",
  "geumcheon-gu": "금천구",
  yeongdeungpo: "영등포구",
  "yeongdeungpo-gu": "영등포구",
  dongjak: "동작구",
  "dongjak-gu": "동작구",
  gwanak: "관악구",
  "gwanak-gu": "관악구",
  seocho: "서초구",
  "seocho-gu": "서초구",
  gangnam: "강남구",
  "gangnam-gu": "강남구",
  songpa: "송파구",
  "songpa-gu": "송파구",
  gangdong: "강동구",
  "gangdong-gu": "강동구",
  suwon: "수원시",
  "suwon-si": "수원시",
  seongnam: "성남시",
  goyang: "고양시",
  yongin: "용인시",
  bucheon: "부천시",
  yeonsu: "연수구",
  namdong: "남동구",
  bupyeong: "부평구",
};

function formatLocationName(str: string): string {
  const decoded = safeDecode(str);
  return SLUG_TO_KOREAN[decoded.toLowerCase()] || decoded;
}

function getRegionFullName(region: string): string {
  switch (region?.toLowerCase()) {
    case "seoul": return "서울";
    case "gyeonggi": return "경기";
    case "incheon": return "인천";
    default: return formatLocationName(region);
  }
}

// 🎯 네이버 규격(제목 40자, 설명 80자) 엄수형 SEO 패턴
const SEO_PATTERNS = [
  { title: "출장 타이아로마 마사지·홈타이", desc: (d: string) => `${d} 출장마사지·홈타이·스웨디시. 선입금 없는 100% 현장 후불제. 코스별 정찰제 요금을 바른테라피에서 확인하세요.` },
  { title: "출장 스웨디시 감성 힐링 마사지", desc: (d: string) => `${d} 출장마사지 추천 코스 안내. 부드러운 오일 이완 프로그램으로 누적된 피로를 말끔히 풀어드립니다.` },
  { title: "출장 아로마테라피 힐링 마사지", desc: (d: string) => `${d} 출장마사지 방문 케어. 천연 에센셜 오일로 스트레스를 해소하는 1:1 맞춤 테라피를 경험하세요.` },
  { title: "출장 정통타이 스트레칭 마사지", desc: (d: string) => `${d} 출장마사지 전문 안내. 숙련된 테라피스트의 전신 스트레칭과 시원한 압 조절로 굳은 몸을 풀어드립니다.` },
  { title: "출장 릴렉스 바디 웰니스 마사지", desc: (d: string) => `${d} 출장마사지 큐레이션. 집이나 숙소에서 언제든 프라이빗하게 누리는 맞춤형 방문 힐링 플랫폼입니다.` },
];

function getDynamicDongInsight(districtName: string, dongName: string, seed: number) {
  const dongInsightGroups = [
    {
      subtitle: `${dongName} 거주자 및 직장인을 위한 1:1 맞춤 바디 테라피 인사이트`,
      sec1Title: `1. ${dongName} 일대 직장인들의 좌식 업무와 승모근 긴장 완화`,
      sec1Text: [
        `${districtName} ${dongName}은 일상 업무나 컴퓨터 작업 등으로 인한 상체 근육의 긴장도가 높게 나타나는 지역입니다. 장시간 키보드와 마우스를 조작하다 보면 어깨가 안으로 말리는 라운드 숄더와 거북목 자세가 유발되기 쉽습니다. 이는 목덜미 후두하근과 상부 승모근에 지속적인 부하를 주어 혈액 순환을 저해하고, 만성적인 어깨 뻐근함과 두중감을 일으킵니다.`,
        `이러한 국소 근막 긴장을 완화하기 위해서는 체온을 안정적으로 유지하면서 단축된 근섬유를 결을 따라 부드럽게 늘려주는 수기 요법이 필요합니다. 굳어있던 혈관이 확장되면서 림프액과 혈액 순환이 촉진되고 가벼운 어깨 컨디션을 회복할 수 있습니다.`
      ],
      sec2Title: "2. 컨디션에 따른 건식 타이와 스웨디시 오일 케어 비교",
      sec2Text: [
        `테라피를 선택할 때는 당일의 피로도와 신체 통증 양상을 파악하는 것이 중요합니다. 건식 기법의 대표인 타이는 관절의 가동 범위를 넓혀주는 수동적 전신 스트레칭을 핵심으로 합니다.`,
        `반면 프리미엄 스웨디시는 식물성 오일을 도포하여 심장 방향으로 부드럽고 리드미컬하게 밀어 올리는 림프 순환 중심 테크닉으로 정서적 안정과 깊은 신체 이완을 유도합니다.`
      ],
      sec3Title: `3. ${dongName} 프라이빗 룸에서 누리는 힐링의 환경적 장점`,
      sec3Text: [
        `내가 가장 익숙한 독립된 공간에서 진행되는 홈케어는 외부 자극이 차단되어 부교감 신경계가 빠르게 활성화됩니다. 세션이 끝난 후 환복이나 추가 이동 없이 바로 아늑한 수면으로 이어질 수 있어 힐링의 잔여 효과가 지속됩니다.`
      ],
      sec4Title: "4. 안전하고 투명한 정찰제 이용 수칙",
      sec4Text: [
        `${dongName} 출장마사지 서비스를 이용하실 때는 건전성과 투명성을 갖춘 공식 플랫폼을 확인하시는 것이 안전합니다. 정상적인 제휴 파트너는 예약 명목의 불법 선입금을 요구하지 않으며, 사전 공시된 100% 현장후불 정찰제 요금 기준을 엄격히 준수합니다.`
      ]
    }
  ];
  return dongInsightGroups[seed % dongInsightGroups.length];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district, dong } = await params;
  const regionFullName = getRegionFullName(region);
  const districtName = formatLocationName(district);
  const rawDong = formatLocationName(dong);

  const dongName = (rawDong === districtName || rawDong === regionFullName) ? "" : rawDong;
  const displayLocation = dongName ? `${districtName} ${dongName}` : districtName;

  const charSum = (displayLocation + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pattern = SEO_PATTERNS[Math.abs(charSum) % SEO_PATTERNS.length];

  // 타이틀: 40자 이내 준수
  const finalTitle = `${displayLocation} ${pattern.title} | 바른테라피`;
  // 설명문: 80자 이내 완결형 준수
  const finalDescription = pattern.desc(displayLocation);
  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(district)}/${encodeURIComponent(dong)}`;

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
      // 🌟 네이버 로봇(Yeti) 전용 메타 태그 추가
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
          alt: `${displayLocation} 출장마사지 바른테라피`,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const regionFullName = getRegionFullName(resolved.region);
  const districtName = formatLocationName(resolved.district);
  const rawDong = formatLocationName(resolved.dong);

  const dongName = (rawDong === districtName || rawDong === regionFullName) ? "" : rawDong;
  const displayLocation = dongName ? `${districtName} ${dongName}` : districtName;

  const charSum = (displayLocation + resolved.region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pattern = SEO_PATTERNS[Math.abs(charSum) % SEO_PATTERNS.length];

  const article = getDynamicDongInsight(districtName, dongName || districtName, Math.abs(charSum));
  const canonicalUrl = `${SITE_URL}/${resolved.region}/${encodeURIComponent(resolved.district)}/${encodeURIComponent(resolved.dong)}`;

  // 🌟 네이버 & 구글 공용 @graph 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: regionFullName, item: `${SITE_URL}/${resolved.region}` },
          { "@type": "ListItem", position: 3, name: `${districtName} 마사지`, item: `${SITE_URL}/${resolved.region}/${encodeURIComponent(resolved.district)}` },
          { "@type": "ListItem", position: 4, name: `${displayLocation} 마사지`, item: canonicalUrl }
        ]
      },
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${canonicalUrl}#business`,
        name: `${displayLocation} 출장 신뢰케어 마사지 - 바른테라피`,
        description: pattern.desc(displayLocation),
        url: canonicalUrl,
        telephone: "0507-1280-3303",
        image: `${SITE_URL}/shop1.jpg`,
        priceRange: "60,000원~160,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card (100% 현장 후불제)",
        openingHours: "Mo-Su 00:00-24:00",
        address: {
          "@type": "PostalAddress",
          addressLocality: displayLocation,
          addressRegion: regionFullName,
          addressCountry: "KR"
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
              href={`/${resolved.region}/${encodeURIComponent(resolved.district)}`}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              ← {districtName} 전체보기
            </Link>
            <a
              href="tel:0507-1280-3303"
              className="px-3.5 py-1.5 rounded-full bg-amber-400 text-black font-black text-xs hover:scale-105 transition-transform"
            >
              📞 빠른 상담
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418]">
          <div className="p-6 md:p-10 space-y-2">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
              {regionFullName} · {districtName} {dongName ? `· ${dongName}` : ""}
            </span>
            <h1 className="text-xl md:text-3xl font-black text-white drop-shadow-md">
              {displayLocation} {pattern.title}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
              {pattern.desc(displayLocation)}
            </p>
          </div>
        </section>

        {/* 샵 리스트 클라이언트 컴포넌트 */}
        <DongDetailClient
          region={resolved.region}
          districtName={districtName}
          dongName={dongName || districtName}
          regionFullName={regionFullName}
        />

        {/* 정보성 칼럼 섹션 */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              LOCAL WELLNESS & CARE GUIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {article.subtitle}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {displayLocation} 고객님을 위한 신체 피로 회복 원리와 프라이빗 테라피 이용 가이드
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
            * 본 콘텐츠는 {displayLocation} 출장마사지 이용 고객 여러분의 건강한 라이프스타일과 안전한 힐링 테라피 정보 제공을 목적으로 작성되었습니다.
          </div>
        </section>

        {/* 이용 가이드 4단계 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h2 className="text-xl font-black text-white mt-1">{displayLocation} 안심 예약 4단계</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h3 className="font-bold text-white mt-1">샵 확인</h3>
              <p className="text-xs text-gray-400 mt-1">{displayLocation} 추천 제휴점 확인</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h3 className="font-bold text-white mt-1">프로그램 선택</h3>
              <p className="text-xs text-gray-400 mt-1">스웨디시 / 아로마 / 타이</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h3 className="font-bold text-white mt-1">전화 상담</h3>
              <p className="text-xs text-gray-400 mt-1">원하는 시간 및 코스 조율</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h3 className="font-bold text-white mt-1">안심 힐링</h3>
              <p className="text-xs text-gray-400 mt-1">정찰제 요금으로 편안한 이용</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ</span>
            <h2 className="text-xl font-black text-white mt-1">{displayLocation} 자주 묻는 질문</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {displayLocation} 당일 예약도 가능한가요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 네, 대다수 제휴 샵에서 당일 예약이 가능하며, 원활한 일정 조율을 위해 1~2시간 전 사전 연락을 권장합니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {displayLocation} 출장마사지 정찰제 요금인가요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 바른테라피에 등록된 매장들은 선입금 사기 없는 투명한 정찰제 요금을 준수합니다.
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