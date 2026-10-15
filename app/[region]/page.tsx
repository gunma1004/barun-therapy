import { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://barun-therapy.netlify.app";

interface PageProps {
  params: Promise<{
    region: string;
  }>;
}

function getRegionFullName(region: string): string {
  switch (region?.toLowerCase()) {
    case "seoul": return "서울";
    case "gyeonggi": return "경기";
    case "incheon": return "인천";
    default: return region || "";
  }
}

// 🗺️ 각 광역시·도별 세부 자치구/시·군 매핑 사전
const REGION_DISTRICTS_MAP: Record<string, { name: string; slug: string; desc: string }[]> = {
  seoul: [
    { name: "강남구", slug: "gangnam", desc: "역삼·논현·신사·삼성동 프리미엄 힐링" },
    { name: "서초구", slug: "seocho", desc: "서초·잠원·반포동 1:1 맞춤 바디케어" },
    { name: "송파구", slug: "songpa", desc: "잠실·문정·가락동 24시 신속 방문" },
    { name: "마포구", slug: "mapo", desc: "홍대·합정·공덕동 프라이빗 홈케어" },
    { name: "영등포구", slug: "yeongdeungpo", desc: "여의도·영등포·당산동 피로회복 솔루션" },
    { name: "종로구", slug: "jongno", desc: "광화문·혜화·종로 일대 정통 웰니스" },
    { name: "중구", slug: "jung", desc: "명동·을지로·동대문 맞춤 테라피" },
    { name: "용산구", slug: "yongsan", desc: "이태원·한남·이촌동 호텔식 럭셔리 케어" },
    { name: "강서구", slug: "gangseo", desc: "마곡·화곡·등촌동 림프 순환 케어" },
    { name: "관악구", slug: "gwanak", desc: "신림·봉천동 일상 피로 리셋 솔루션" },
    { name: "성동구", slug: "seongdong", desc: "성수·왕십리동 바디 밸런스 회복" },
    { name: "광진구", slug: "gwangjin", desc: "건대·자양·구의동 힐링 테라피" },
    { name: "동대문구", slug: "dongdaemun", desc: "청량리·답십리동 전문 수기 케어" },
    { name: "성북구", slug: "seongbuk", desc: "성신여대·돈암동 맞춤형 바디케어" },
    { name: "서대문구", slug: "seodaemun", desc: "신촌·연희동 프라이빗 방문 테라피" },
    { name: "은평구", slug: "eunpyeong", desc: "연신내·불광동 일상 릴렉스 가이드" },
    { name: "구로구", slug: "guro", desc: "신도림·구로디지털단지 피로회복" },
    { name: "동작구", slug: "dongjak", desc: "노량진·사당동 맞춤형 스트레칭" },
    { name: "양천구", slug: "yangcheon", desc: "목동·신정동 바디 웰니스 프로그램" },
    { name: "강동구", slug: "gangdong", desc: "천호·명일동 1:1 방문 홈케어" },
  ],
  gyeonggi: [
    { name: "수원시", slug: "suwon", desc: "권선·영통·팔달·장안구 신속 방문" },
    { name: "성남시", slug: "seongnam", desc: "분당·수정·중원구 프리미엄 힐링" },
    { name: "고양시", slug: "goyang", desc: "일산동구·서구·덕양구 웰니스 케어" },
    { name: "용인시", slug: "yongin", desc: "수지·기흥·처인구 맞춤형 바디케어" },
    { name: "부천시", slug: "bucheon", desc: "원미·소사·오정구 24시 방문 홈케어" },
    { name: "안양시", slug: "anyang", desc: "동안·만안구 피로회복 솔루션" },
    { name: "안산시", slug: "ansan", desc: "상록구·단원구 정통 테라피 안내" },
    { name: "화성시", slug: "hwaseong", desc: "동탄·병점 일대 신속 방문 케어" },
    { name: "평택시", slug: "pyeongtaek", desc: "송탄·고덕 1:1 맞춤 바디 릴렉스" },
    { name: "남양주시", slug: "namyangju", desc: "다산·별내 일대 전문 웰니스 제휴" },
    { name: "파주시", slug: "paju", desc: "운정·문산 쾌적한 방문 힐링" },
    { name: "의정부시", slug: "uijeongbu", desc: "의정부 전역 100% 현장후불제" },
    { name: "시흥시", slug: "siheung", desc: "배곧·정왕동 맞춤형 바디케어" },
    { name: "김포시", slug: "gimpo", desc: "구래·한강신도시 프라이빗 힐링" },
    { name: "광명시", slug: "gwangmyeong", desc: "철산·하안동 24시 신속 방문 홈케어" },
    { name: "하남시", slug: "hanam", desc: "미사·위례 신도시 웰니스 솔루션" },
    { name: "군포시", slug: "gunpo", desc: "산본·군포 전지역 신속 방문" },
    { name: "오산시", slug: "osan", desc: "오산 전역 맞춤형 바디 릴렉스" },
    { name: "이천시", slug: "icheon", desc: "이천 시내 및 인근 지역 방문 케어" },
    { name: "광주시", slug: "gwangju", desc: "오포·경기광주 웰니스 프로그램" },
  ],
  incheon: [
    { name: "연수구", slug: "yeonsu", desc: "송도·청학동 프리미엄 힐링 테라피" },
    { name: "남동구", slug: "namdong", desc: "구월·논현동 24시 신속 방문 홈케어" },
    { name: "부평구", slug: "bupyeong", desc: "부평·산곡동 1:1 맞춤 바디케어" },
    { name: "서구", slug: "seo", desc: "청라·검단 웰니스 릴렉스 프로그램" },
    { name: "미추홀구", slug: "michuhol", desc: "주안·용현동 피로회복 솔루션" },
    { name: "계양구", slug: "gyeyang", desc: "계산·작전동 정통 테라피 안내" },
    { name: "중구", slug: "junggu", desc: "영종도·신포동 프라이빗 방문 케어" },
  ],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const regionCode = resolvedParams.region.toLowerCase();
  const regionName = getRegionFullName(regionCode);

  const title = `${regionName} 출장 생활관리 마사지 지역 안내 | 바른테라피`;
  const description = `${regionName} 권역별 타이마사지, 아로마, 힐링, VIP, 여성전용 코스를 지역별로 비교하고 선입금 없는 현장 후불제로 편하게 문의하세요.`;
  const canonicalUrl = `${SITE_URL}/${regionCode}`;

  return {
    title: { absolute: title },
    description,
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
      title,
      description,
      url: canonicalUrl,
      siteName: "바른테라피",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/shop1.jpg`,
          width: 1200,
          height: 630,
          alt: `${regionName} 출장마사지 바른테라피`,
        },
      ],
    },
  };
}

export default async function RegionHubPage({ params }: PageProps) {
  const resolvedParams = await params;
  const regionCode = resolvedParams.region.toLowerCase();
  const regionName = getRegionFullName(regionCode);
  const districts = REGION_DISTRICTS_MAP[regionCode] || [];

  const currentUrl = `${SITE_URL}/${regionCode}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": `${regionName} 마사지`, "item": currentUrl }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": `${currentUrl}#collection`,
        "name": `${regionName} 출장 생활관리 마사지 지역 안내`,
        "description": `${regionName} 권역별 타이마사지, 아로마, 힐링, VIP 코스 안내`,
        "url": currentUrl
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
          <nav className="flex items-center gap-3 text-xs font-bold">
            <Link href="/seoul" className="hover:text-amber-400 transition-colors">서울</Link>
            <Link href="/incheon" className="hover:text-amber-400 transition-colors">인천</Link>
            <Link href="/gyeonggi" className="hover:text-amber-400 transition-colors">경기</Link>
            <a
              href="tel:0507-1280-3303"
              className="ml-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-black font-black hover:scale-105 transition-transform"
            >
              📞 전화문의
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        {/* 히어로 섹션 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418]">
          <div className="p-6 md:p-10 space-y-3">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase block">
              BARUN THERAPY · {regionName.toUpperCase()} REGION
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {regionName} 출장 생활관리 마사지 지역 안내
            </h1>
            <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
              {regionName} 전지역 세부 도시와 자치구에서 제공하는 타이마사지, 아로마, 힐링, VIP 코스를 지역별로 비교하고 편하게 문의하세요.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="tel:0507-1280-3303" className="bg-amber-500 hover:bg-amber-400 text-black font-black text-xs px-5 py-2.5 rounded-xl transition-all">
                전화문의
              </a>
            </div>
          </div>
        </section>

        {/* 5대 코스 비교표 섹션 (랑랑 레퍼런스 이식) */}
        <section className="bg-[#0d0d0f] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FIVE COURSES</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              필요한 휴식을 먼저 선택하세요
            </h2>
            <p className="text-xs text-gray-400 mt-1">타이·아로마·힐링·VIP 코스를 투명한 정찰제 요금으로 안내합니다.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-amber-400">
                  <th className="py-3 px-4">코스</th>
                  <th className="py-3 px-4">60분</th>
                  <th className="py-3 px-4">90분</th>
                  <th className="py-3 px-4">120분</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">타이마사지</td>
                  <td className="py-3 px-4">60,000원</td>
                  <td className="py-3 px-4">80,000원</td>
                  <td className="py-3 px-4">100,000원</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">아로마마사지</td>
                  <td className="py-3 px-4">70,000원</td>
                  <td className="py-3 px-4">90,000원</td>
                  <td className="py-3 px-4">110,000원</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">힐링마사지</td>
                  <td className="py-3 px-4">90,000원</td>
                  <td className="py-3 px-4">110,000원</td>
                  <td className="py-3 px-4">130,000원</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">VIP마사지</td>
                  <td className="py-3 px-4">110,000원</td>
                  <td className="py-3 px-4">130,000원</td>
                  <td className="py-3 px-4">150,000원</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 text-center">* 표는 코스 비교를 위한 기본 안내입니다. 실제 방문 가능 여부와 최종 금액은 상담 시 확인하세요.</p>
        </section>

        {/* 세부 지역 그리드 카드 목록 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2 h-4 bg-amber-400 rounded-full inline-block"></span>
              📍 {regionName} 세부 지역별 안내
            </h2>
            <span className="text-xs text-gray-400">총 {districts.length}개 지역</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {districts.map((d) => (
              <Link
                key={d.slug}
                href={`/${regionCode}/${d.slug}`}
                className="p-4 rounded-2xl bg-[#141418] border border-white/5 hover:border-amber-400/60 hover:bg-amber-400/5 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="font-extrabold text-sm md:text-base text-white group-hover:text-amber-400 transition-colors block">
                    {regionName} {d.name}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 block leading-snug">
                    {d.desc}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-amber-400 font-bold">
                  <span>코스 및 요금 보기</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 예약 가이드 3단계 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">RESERVATION GUIDE</span>
            <h2 className="text-xl font-black text-white mt-1">주소, 코스, 최종 조건을 차례로 확인하세요</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-amber-400 font-black block">01 지역과 시간 전달</span>
              <p className="text-gray-400 leading-snug">주소와 희망 시작 시각을 알려 이동 가능 여부를 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-amber-400 font-black block">02 코스와 범위 확인</span>
              <p className="text-gray-400 leading-snug">압, 오일, 집중 부위와 피하고 싶은 동작을 조율합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-amber-400 font-black block">03 최종 조건 확인</span>
              <p className="text-gray-400 leading-snug">이용 시간과 총 금액, 변경 기준을 확인한 뒤 예약합니다.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#040406] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="text-gray-400 font-medium">{regionName} 출장마사지, 홈타이 정보를 건강한 휴식 관점에서 안내합니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; 2026 바른테라피. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}