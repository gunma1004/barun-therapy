"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export const regionData: Record<
  string,
  { name: string; districts: Record<string, { name: string; dongs: string[] }> }
> = {
  seoul: {
    name: "서울특별시",
    districts: {
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로1.2.3.4가동", "종로5.6가동", "이화동", "혜화동", "창신1동", "창신2동", "창신3동", "숭인1동", "숭인2동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "동화동", "황학동", "중림동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산2가동", "남영동", "청파동", "원효로1동", "원효로2동", "효창동", "용문동", "이촌1동", "이촌2동", "이태원1동", "이태원2동", "한남동", "서빙고동", "보광동"] },
      seongdong: { name: "성동구", dongs: ["왕십리2동", "왕십리도선동", "마장동", "사근동", "행당1동", "행당2동", "응봉동", "금호1가동", "금호2.3가동", "금호4가동", "옥수동", "성수1가1동", "성수1가2동", "성수2가1동", "성수2가3동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡1동", "중곡2동", "중곡3동", "중곡4동", "능동", "구의1동", "구의2동", "구의3동", "광장동", "자양1동", "자양2동", "자양3동", "자양4동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농1동", "전농2동", "답십리1동", "답십리2동", "장안1동", "장안2동", "청량리동", "회기동", "휘경1동", "휘경2동", "이문1동", "이문2동"] },
      jungnang: { name: "중랑구", dongs: ["면목본동", "면목2동", "면목3.4동", "면목5동", "면목7동", "상봉1동", "상봉2동", "중화1동", "중화2동", "묵1동", "묵2동", "망우본동", "망우3동", "신내1동", "신내2동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암1동", "돈암2동", "안암동", "보문동", "정릉1동", "정릉2동", "정릉3동", "정릉4동", "길음1동", "길음2동", "종암동", "월곡1동", "월곡2동", "장위1동", "장위2동", "장위3동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["삼양동", "미아동", "송중동", "송천동", "삼각산동", "번1동", "번2동", "번3동", "수유1동", "수유2동", "수유3동", "우이동", "인수동"] },
      dobong: { name: "도봉구", dongs: ["창1동", "창2동", "창3동", "창4동", "창5동", "도봉1동", "도봉2동", "쌍문1동", "쌍문2동", "쌍문3동", "쌍문4동", "방학1동", "방학2동", "방학3동"] },
      nowon: { name: "노원구", dongs: ["상계1동", "상계2동", "상계3.4동", "상계5동", "상계6.7동", "상계8동", "상계9동", "상계10동", "중계본동", "중계1동", "중계2.3동", "중계4동", "하계1동", "하계2동", "공릉1동", "공릉2동"] },
      eunpyeong: { name: "은평구", dongs: ["불광1동", "불광2동", "갈현1동", "갈현2동", "구산동", "대조동", "응암1동", "응암2동", "응암3동", "역촌동", "신사1동", "신사2동", "증산동", "수색동", "진관동"] },
      seodaemun: { name: "서대문구", dongs: ["천연동", "북아현동", "충현동", "신촌동", "연희동", "홍제1동", "홍제2동", "홍제3동", "홍은1동", "홍은2동", "남가좌1동", "남가좌2동", "북가좌1동", "북가좌2동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "신수동", "서교동", "합정동", "망원1동", "망원2동", "연남동", "성산1동", "성산2동", "상암동"] },
      yangcheon: { name: "양천구", dongs: ["목1동", "목2동", "목3동", "목4동", "목5동", "신월1동", "신월2동", "신월3동", "신월4동", "신월5동", "신월6동", "신월7동", "신정1동", "신정2동", "신정3동", "신정4동", "신정6동", "신정7동"] },
      gangseo: { name: "강서구", dongs: ["등촌1동", "등촌2동", "등촌3동", "화곡본동", "화곡1동", "화곡2동", "화곡3동", "화곡4동", "화곡8동", "우장산동", "가양1동", "가양2동", "가양3동", "발산1동", "공항동", "방화1동", "방화2동", "방화3동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로1동", "구로2동", "구로3동", "구로4동", "구로5동", "가리봉동", "고척1동", "고척2동", "개봉1동", "개봉2동", "개봉3동", "오류1동", "오류2동", "수궁동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산1동", "독산2동", "독산3동", "독산4동", "시흥1동", "시흥2동", "시흥3동", "시흥4동", "시흥5동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포본동", "영등포동", "여의동", "당산1동", "당산2동", "도림동", "문래동", "양평1동", "양평2동", "신길1동", "신길3동", "신길4동", "신길5동", "신길6동", "신길7동", "대림1동", "대림2동", "대림3동"] },
      dongjak: { name: "동작구", dongs: ["노량진1동", "노량진2동", "상도1동", "상도2동", "상도3동", "상도4동", "흑석동", "사당1동", "사당2동", "사당3동", "사당4동", "사당5동", "대방동", "신대방1동", "신대방2동"] },
      gwanak: { name: "관악구", dongs: ["보라매동", "청림동", "성현동", "행운동", "낙성대동", "청룡동", "은천동", "상현동", "서원동", "신원동", "서림동", "신사동", "난향동", "조원동", "대학동", "난곡동", "삼성동", "미성동"] },
      seocho: { name: "서초구", dongs: ["서초1동", "서초2동", "서초3동", "서초4동", "잠원동", "반포본동", "반포1동", "반포2동", "반포3동", "반포4동", "방배본동", "방배1동", "방배2동", "방배3동", "방배4동", "양재1동", "양재2동", "내곡동"] },
      gangnam: { name: "강남구", dongs: ["역삼1동", "역삼2동", "개포1동", "개포2동", "개포4동", "청담동", "삼성1동", "삼성2동", "대치1동", "대치2동", "대치4동", "신사동", "논현1동", "논현2동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡1동", "도곡2동"] },
      songpa: { name: "송파구", dongs: ["잠실본동", "잠실2동", "잠실3동", "잠실4동", "잠실6동", "잠실7동", "풍납1동", "풍납2동", "거여1동", "거여2동", "마천1동", "마천2동", "방이1동", "방이2동", "오륜동", "오금동", "송파1동", "송파2동", "석촌동", "삼전동", "가락본동", "가락1동", "가락2동", "문정1동", "문정2동", "장지동", "위례동", "잠실동"] },
      gangdong: { name: "강동구", dongs: ["강일동", "상일1동", "상일2동", "명일1동", "명일2동", "고덕1동", "고덕2동", "암사1동", "암사2동", "암사3동", "천호1동", "천호2동", "천호3동", "성내1동", "성내2동", "성내3동", "둔촌1동", "둔촌2동"] },
    },
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon: { name: "수원시", dongs: ["인계동", "영통동", "광교동", "매산동", "정자동", "조원동", "화서동", "세류동"] },
      seongnam: { name: "성남시", dongs: ["분당동", "수내동", "정자동", "서현동", "야탑동", "판교동", "삼평동", "백현동"] },
      goyang: { name: "고양시", dongs: ["일산동", "주엽동", "마두동", "백석동", "화정동", "행신동", "식사동", "탄현동"] },
      yongin: { name: "용인시", dongs: ["풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "기흥동", "신갈동", "동백동"] },
      bucheon: { name: "부천시", dongs: ["중동", "상동", "심곡동", "원미동", "소사동", "송내동", "역곡동", "오정동"] },
      ansan: { name: "안산시", dongs: ["고잔동", "중앙동", "초지동", "본오동", "선부동", "와동", "월피동", "성포동"] },
      anyang: { name: "안양시", dongs: ["안양동", "석수동", "박달동", "비산동", "관양동", "평촌동", "호계동", "범계동"] },
      namyangju: { name: "남양주시", dongs: ["다산동", "별내동", "호평동", "평내동", "와부읍", "진접읍", "화도읍", "퇴계원읍"] },
      hwaseong: { name: "화성시", dongs: ["동탄동", "병점동", "향남읍", "봉담읍", "남양읍", "진안동", "반월동", "새솔동"] },
      pyeongtaek: { name: "평택시", dongs: ["고덕동", "서정동", "송탄동", "지산동", "비전동", "세교동", "안중읍", "포승읍"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "용현동", "민락동", "금오동", "가능동"] },
      paju: { name: "파주시", dongs: ["운정동", "금촌동", "문산읍", "조리읍", "야당동", "교하동", "탄현면", "월롱면"] },
      siheung: { name: "시흥시", dongs: ["정왕동", "배곧동", "은행동", "대야동", "신천동", "목감동", "은계동", "능곡동"] },
      gimpo: { name: "김포시", dongs: ["사우동", "풍무동", "장기동", "구래동", "마산동", "운양동", "고촌읍", "통진읍"] },
      gwangmyeong: { name: "광명시", dongs: ["철산동", "하안동", "소하동", "광명동", "일직동", "옥길동", "노온사동"] },
      gwangju: { name: "광주시", dongs: ["경안동", "송정동", "탄벌동", "태전동", "오포읍", "초월읍", "곤지암읍", "쌍령동"] },
      gunpo: { name: "군포시", dongs: ["산본동", "금정동", "당동", "당정동", "부곡동", "대야미동", "광정동", "재궁동"] },
      icheon: { name: "이천시", dongs: ["창전동", "증포동", "중리동", "관고동", "부발읍", "마장면", "신둔면", "안흥동"] },
      osan: { name: "오산시", dongs: ["오산동", "원동", "궐동", "수청동", "세교동", "양산동", "세마동", "부산동"] },
      hanam: { name: "하남시", dongs: ["미사동", "신장동", "덕풍동", "망월동", "풍산동", "감일동", "위례동", "천현동"] },
      yangju: { name: "양주시", dongs: ["옥정동", "회천동", "덕정도", "고읍동", "백석읍", "광적면", "장흥면", "양주동"] },
      guri: { name: "구리시", dongs: ["인창동", "교문동", "수택동", "갈매동", "토평동", "사노동", "아천동", "동구동"] },
      anseong: { name: "안성시", dongs: ["공도읍", "대덕면", "안성동", "보개면", "원곡면", "양성면", "일죽면", "죽산면"] },
      pocheon: { name: "포천시", dongs: ["소흘읍", "포천동", "선단동", "군내면", "가산면", "신북면", "영북면", "일동면"] },
      uiwang: { name: "의왕시", dongs: ["고천동", "오전동", "내손동", "포일동", "청계동", "삼동", "학의동", "왕곡동"] },
      yeoju: { name: "여주시", dongs: ["여흥동", "중앙동", "오학동", "가남읍", "점동면", "대신면", "북내면", "흥천면"] },
      yangpyeong: { name: "양평군", dongs: ["양평읍", "용문면", "양서면", "강상면", "강하면", "옥천면", "서종면", "지평면"] },
      dongducheon: { name: "동두천시", dongs: ["생연동", "중앙동", "보산동", "불현동", "송내동", "소요동", "상패동", "광암동"] },
      gwacheon: { name: "과천시", dongs: ["중앙동", "갈현동", "별양동", "원문동", "부림동", "문원동", "과천동", "주암동"] },
      gapyeong: { name: "가평군", dongs: ["가평읍", "청평면", "설악면", "상면", "조종면", "북면"] },
      yeoncheon: { name: "연천군", dongs: ["연천읍", "전곡읍", "군남면", "청산면", "백학면", "신서면", "미산면", "왕징면"] },
    },
  },
  incheon: {
    name: "인천광역시",
    districts: {
      yeonsu: { name: "연수구", dongs: ["송도1동", "송도2동", "송도3동", "송도4동", "송도5동", "옥련동", "선학동", "연수동", "청학동", "동춘동"] },
      namdong: { name: "남동구", dongs: ["구월동", "간석동", "만수동", "논현동", "서창동", "남촌도림동", "장수서창동", "논현고잔동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동", "일신동", "십정동"] },
      seo: { name: "서구", dongs: ["청라1동", "청라2동", "청라3동", "검단동", "가정동", "신현원창동", "석남동", "가좌동", "연희동"] },
      michuhol: { name: "미추홀구", dongs: ["주안동", "용현동", "학익동", "도화동", "숭의동", "관교동", "문학동"] },
      jung: { name: "중구", dongs: ["영종동", "영종1동", "영종2동", "운서동", "신포동", "연안동", "신흥동", "도원동", "동인천동"] },
      gyeyang: { name: "계양구", dongs: ["계산동", "작전동", "효성동", "작전서운동", "계양동"] },
      dong: { name: "동구", dongs: ["송림동", "송현동", "화수동", "만석동", "금창동"] },
      ganghwa: { name: "강화군", dongs: ["강화읍", "선원면", "불은면", "길상면", "화도면", "내가면", "양도면", "교동면"] },
      ongjin: { name: "옹진군", dongs: ["백령면", "연평면", "대청면", "덕적면", "자월면", "영흥면", "북도면"] },
    },
  },
};

const initialShops = [
  {
    id: 1,
    name: "한국미인홈케어",
    desc: "서울·경기·인천 전지역 신속 방문, 정성 가득한 프리미엄 감성 바디 테라피 & 1:1 맞춤 케어",
    phone: "0507-1280-3303",
    price: "100,000원부터~",
    image: "/shop1.jpg",
  },
  {
    id: 2,
    name: "오늘밤테라피",
    desc: "최고급 천연 아로마 오일 블렌딩, 지친 일상을 깨우는 고품격 프라이빗 힐링 바디 테라피 전문",
    phone: "0507-1280-3223",
    price: "60,000원부터~",
    image: "/shop2.jpg",
  },
  {
    id: 3,
    name: "주주테라피",
    desc: "재방문율 1위, 철저한 위생 관리와 숙련된 테라피스트의 정통 바디 릴렉싱 프로그램",
    phone: "0507-1280-3193",
    price: "60,000원부터~",
    image: "/shop3.jpg",
  },
  {
    id: 4,
    name: "퀸즈홈테라피",
    desc: "전문 테라피스트의 VIP 집중 피로회복 솔루션, 수도권 어디서나 편안하게 만나는 맞춤 힐링",
    phone: "0507-1280-3334",
    price: "60,000원부터~",
    image: "/shop4.jpg",
  },
  {
    id: 5,
    name: "골든테라피",
    desc: "수도권 전역 빠른 안내, 검증된 전문 매니저의 힐링 테라피 & 프리미엄 바디 밸런스 프로그램",
    phone: "0507-1280-3360",
    price: "110,000원부터~",
    image: "/shop5.jpg",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-neutral-900/70 rounded-2xl border border-white/5 overflow-hidden transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex justify-between items-center font-bold text-sm text-gray-200 hover:text-amber-400 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="text-amber-400">Q.</span> {question}
        </span>
        <span className="text-amber-400 font-extrabold text-lg">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-3 bg-black/40">
          <span className="text-amber-400 font-bold">A. </span>
          {answer}
        </div>
      )}
    </div>
  );
}

export default function MainClientUI() {
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");
  const [shops, setShops] = useState(initialShops);

  useEffect(() => {
    // 마운트 후 안전한 셔플
    const shuffled = [...initialShops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShops(shuffled);
  }, []);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict("");
    setSelectedDong("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedDong("");
  };

  const currentDistricts = regionData[selectedRegion]?.districts || {};
  const currentDongs =
    selectedDistrict && currentDistricts[selectedDistrict]
      ? currentDistricts[selectedDistrict].dongs
      : [];

  // 🌟 네이버 수집 봇이 추적 가능한 표준 URL (`/[region]/[district]` 형식)
  const calculatedSearchUrl = (() => {
    if (!selectedDistrict) {
      return `/${selectedRegion}`;
    }
    const districtObj = currentDistricts[selectedDistrict];
    const districtName = districtObj ? districtObj.name : selectedDistrict;
    return selectedDong
      ? `/${selectedRegion}/${encodeURIComponent(districtName)}/${encodeURIComponent(selectedDong)}`
      : `/${selectedRegion}/${encodeURIComponent(districtName)}`;
  })();

  // 🌟 네이버 서치어드바이저 수집용 FAQPage JSON-LD 스키마
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "예약 및 상담은 어떻게 진행되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "바른테라피에 등록된 각 제휴 업체의 전화연결 버튼을 통해 샵으로 직접 연결되며, 코스 및 시간을 바로 조율하실 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "선입금이나 예약금이 발생하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "아닙니다. 바른테라피의 모든 제휴 샵은 100% 현장 후불 결제를 철저히 준수하고 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "수도권 전 지역 이용이 가능한가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "서울 25개 구, 경기도 31개 시·군, 인천 전역의 주요 권역별로 등록된 제휴 샵 정보를 편리하게 확인하실 수 있습니다.",
        },
      },
    ],
  };

  return (
    <div className="bg-[#070709] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 검색엔진 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        {/* 상단 메인 배너 */}
        <section className="text-center my-2">
          <div className="overflow-hidden rounded-3xl border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] relative h-60 md:h-72 flex items-center justify-center p-6 bg-gradient-to-b from-[#141418] to-[#0a0a0d]">
            <div className="absolute inset-0 z-0">
              <img
                src="/banner.jpg"
                alt="바른테라피 서울 출장 신뢰케어 마사지 메인 배너"
                className="w-full h-full object-cover filter brightness-[0.4] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs tracking-wider">
                100% 현장후불 · 안심 매칭 플랫폼
              </span>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">
                서울·경기·인천{" "}
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  바른테라피 출장 신뢰케어 마사지
                </span>
              </h1>
              <p className="text-gray-200 text-xs md:text-sm font-medium max-w-lg mx-auto leading-relaxed drop-shadow">
                바른테라피 - 선입금 없는 100% 현장 후불제 출장마사지 안내. 서울·경기·인천 검증 제휴 샵 코스와 투명한 가격을 확인하세요.
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 네이버 로봇용 단독 권역 허브 바로가기 칩 3종 */}
        <section className="grid grid-cols-3 gap-3">
          <Link 
            href="/seoul" 
            className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/30 hover:border-amber-400 text-center transition-all group shadow-md"
          >
            <span className="text-xs text-amber-400 font-extrabold block">SEOUL</span>
            <strong className="text-sm md:text-base text-white group-hover:text-amber-300 transition-colors">서울 마사지 ↗</strong>
          </Link>
          <Link 
            href="/gyeonggi" 
            className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/30 hover:border-amber-400 text-center transition-all group shadow-md"
          >
            <span className="text-xs text-amber-400 font-extrabold block">GYEONGGI</span>
            <strong className="text-sm md:text-base text-white group-hover:text-amber-300 transition-colors">경기 마사지 ↗</strong>
          </Link>
          <Link 
            href="/incheon" 
            className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/30 hover:border-amber-400 text-center transition-all group shadow-md"
          >
            <span className="text-xs text-amber-400 font-extrabold block">INCHEON</span>
            <strong className="text-sm md:text-base text-white group-hover:text-amber-300 transition-colors">인천 마사지 ↗</strong>
          </Link>
        </section>

        {/* 메인 추천 제휴 샵 */}
        <section className="space-y-6">
          <div className="text-center mb-4">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">
              VERIFIED PARTNERS
            </p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              🏆 바른테라피 베스트 추천 제휴 샵
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shops.map((lShop) => (
              <div
                key={lShop.id}
                className="bg-[#111114] border border-amber-500/20 rounded-2xl p-4 flex gap-4 items-center shadow-md relative group hover:border-amber-500/60 transition-all"
              >
                <Link href={`/shop/${lShop.id}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />
                <img
                  src={lShop.image}
                  alt={lShop.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-snug">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">
                      {lShop.price}
                    </span>
                    <a
                      href={`tel:${lShop.phone.replace(/-/g, "")}`}
                      className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow transition-colors relative z-20 flex items-center gap-1"
                    >
                      <span>📞</span> 전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🌟 표준 기준 요금표 안내 테이블 (네이버 C-Rank 가산점) */}
        <section className="bg-[#0f0f12] border border-amber-500/30 p-6 rounded-3xl space-y-4">
          <div className="text-center">
            <span className="text-xs text-amber-400 font-bold tracking-widest uppercase">COURSE & PRICE</span>
            <h3 className="text-xl font-black text-white mt-1">바른테라피 표준 기준 요금표</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="py-3 px-2">관리 코스</th>
                  <th className="py-3 px-2">60분</th>
                  <th className="py-3 px-2">90분</th>
                  <th className="py-3 px-2">120분</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                <tr>
                  <td className="py-3 font-bold text-white">타이마사지</td>
                  <td className="py-3 text-amber-400 font-semibold">60,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">80,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">100,000원</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">아로마마사지</td>
                  <td className="py-3 text-amber-400 font-semibold">70,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">90,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">110,000원</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">힐링마사지</td>
                  <td className="py-3 text-amber-400 font-semibold">100,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">110,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">130,000원</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-white">스웨디시</td>
                  <td className="py-3 text-amber-400 font-semibold">140,000원</td>
                  <td className="py-3 text-amber-400 font-semibold">160,000원</td>
                  <td className="py-3 text-gray-600">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-500 text-center mt-2">
            ※ 100% 현장 후불제 기준이며 심야할증 없는 정찰제 가격을 준수합니다.
          </p>
        </section>

        {/* 수도권 지역 검색 박스 */}
        <section className="pt-6 border-t border-white/10">
          <div className="bg-gradient-to-b from-[#16161b] to-[#0e0e12] border border-amber-500/30 p-6 rounded-3xl max-w-xl mx-auto shadow-2xl text-left relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs text-amber-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                📍 내 주변 맞춤 테라피 찾기
              </label>
              <span className="text-[11px] text-gray-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                수도권 전지역 이동
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">
                  1단계: 광역 시·도 선택
                </span>
                <select
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  {Object.keys(regionData).map((key) => (
                    <option key={key} value={key} className="bg-[#1c1c1f] text-white">
                      {regionData[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">
                  2단계: 구·시·군 선택
                </span>
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1c1c1f] text-gray-400">
                    구 / 시 / 군을 선택해주세요
                  </option>
                  {Object.keys(currentDistricts).map((dKey) => (
                    <option key={dKey} value={dKey} className="bg-[#1c1c1f] text-white">
                      {currentDistricts[dKey].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">
                  3단계: 동 선택 (상세 안내)
                </span>
                <select
                  value={selectedDong}
                  onChange={(e) => setSelectedDong(e.target.value)}
                  disabled={!selectedDistrict}
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-medium p-3.5 rounded-xl border border-amber-500/30 disabled:opacity-30 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1c1c1f] text-gray-400">
                    동 전체 보기
                  </option>
                  {currentDongs.map((dong, idx) => (
                    <option key={idx} value={dong} className="bg-[#1c1c1f] text-white">
                      {dong}
                    </option>
                  ))}
                </select>
              </div>

              {/* 검색엔진 봇이 수집할 수 있는 직접 링크 */}
              <Link
                href={calculatedSearchUrl}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-4 rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] mt-3 block text-center cursor-pointer transform active:scale-[0.98]"
              >
                🔍 선택한 지역 테라피 샵 정보 확인하기
              </Link>
            </div>
          </div>
        </section>

        {/* 네이버 로봇 크롤링 누락 방지용 주요 지역 내부 정적 링크 (표준 경로 연동) */}
        <section className="bg-[#0b0b0e] border border-white/5 p-6 rounded-3xl space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <span>🗺️</span> 수도권 주요 지역별 바로가기
            </h3>
            <p className="text-[11px] text-gray-400 mt-1">
              원하시는 지역을 선택하시면 해당 지역의 추천 샵 목록과 코스를 바로 확인하실 수 있습니다.
            </p>
          </div>
          
          <div className="space-y-3 pt-2">
            <div>
              <span className="text-[11px] text-amber-300 font-extrabold block mb-1.5">서울특별시</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(regionData.seoul.districts).map(([dKey, dVal]) => (
                  <Link
                    key={dKey}
                    href={`/seoul/${encodeURIComponent(dVal.name)}`}
                    className="text-xs bg-neutral-900/90 text-gray-300 hover:text-amber-400 hover:border-amber-500/40 px-2.5 py-1.5 rounded-lg border border-white/5 transition-colors"
                  >
                    {dVal.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <span className="text-[11px] text-amber-300 font-extrabold block mb-1.5">경기도</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(regionData.gyeonggi.districts).map(([dKey, dVal]) => (
                  <Link
                    key={dKey}
                    href={`/gyeonggi/${encodeURIComponent(dVal.name)}`}
                    className="text-xs bg-neutral-900/90 text-gray-300 hover:text-amber-400 hover:border-amber-500/40 px-2.5 py-1.5 rounded-lg border border-white/5 transition-colors"
                  >
                    {dVal.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <span className="text-[11px] text-amber-300 font-extrabold block mb-1.5">인천광역시</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(regionData.incheon.districts).map(([dKey, dVal]) => (
                  <Link
                    key={dKey}
                    href={`/incheon/${encodeURIComponent(dVal.name)}`}
                    className="text-xs bg-neutral-900/90 text-gray-300 hover:text-amber-400 hover:border-amber-500/40 px-2.5 py-1.5 rounded-lg border border-white/5 transition-colors"
                  >
                    {dVal.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 전문 웰니스 칼럼 */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-10 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-5">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              BARUN THERAPY WELLNESS ESSENTIALS & THEORY
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              도심 생활 속 신체 밸런스 회복과 지속 가능한 바디 테라피 가이드
            </h2>
            <p className="text-gray-400 text-xs mt-1.5">
              자율신경계 균형, 근막 이완의 과학적 원리, 라이프스타일 맞춤 프로그램 선택 및 프라이빗 케어 환경 분석
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">1.</span> 현대인의 고정 좌식 생활과 만성 근막 긴장의 병리학적 기전
            </h3>
            <p>
              현대 사회의 근로 환경은 디지털 디바이스의 보급과 함께 급격한 정적 고정화를 겪고 있습니다. 서울과 수도권의 수많은 직장인들은 하루 평균 8시간 이상 모니터 앞에 앉아 생활하며, 이 과정에서 경추 굴곡과 흉추 후만이 결합된 전방 두부 자세를 취하게 됩니다. 머리의 하중이 1인치 앞으로 기울어질 때마다 목덜미 후두하근과 상부 승모근, 견갑거근에 가해지는 역학적 부하는 체중 대비 최대 4배까지 증가합니다.
            </p>
            <p>
              이러한 만성적 부하는 근섬유 내 미세 모세혈관의 혈류 흐름을 압박하여 허혈성 상태를 유발합니다. 혈액 공급이 원활하지 못한 근육 조직 내에는 젖산, 피루브산 등 대사 노폐물이 축적되며, 이는 근막 통증 유발점(Trigger Point)의 형성을 가속화합니다. 결과적으로 어깨 윗선의 지속적인 뻐근함, 견갑골 내측의 결림, 긴장성 두통과 만성 피로로 이어지는 악순환이 고착화됩니다.
            </p>
            <p>
              정기적인 바디 컨디셔닝은 단순한 표면 마찰을 넘어 근육의 기시부와 정지부를 따라 경직된 근막을 넓은 면적으로 스트레칭하고 연부 조직의 온도를 높여 혈류량을 증가시키는 데 목적이 있습니다. 정상적인 혈액 순환이 회복되면 굳어있던 근섬유가 이완되고 자율신경계의 과도한 흥분이 진정되어 신체 본래의 유연성과 가동 범위를 되찾게 됩니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">2.</span> 자율신경계 불균형과 심신 릴렉싱의 상호작용
            </h3>
            <p>
              과중한 업무 스트레스와 불규칙한 생활 리듬은 인체의 교감신경계를 만성 흥분 상태로 몰아넣습니다. 교감신경의 지속적인 과활성화는 스트레스 호르몬인 코르티솔과 아드레날린 분비를 촉진하고, 심박수 증가와 말초 혈관 수축을 야기하여 신체를 항시적인 긴장 상태로 유지시킵니다.
            </p>
            <p>
              숙련된 테라피스트에 의한 균일하고 차분한 압력 자극은 피부 감각 수용기를 자극하여 뇌로 전달되는 감각 신호를 안정화시킵니다. 이는 부교감신경계를 활성화하여 심장 박동을 안정시키고 혈관을 확장시키며, 체내 행복 호르몬인 옥시토신과 세로토닌의 분비를 촉진합니다.
            </p>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">3.</span> 프로그램별 물리적 기전 비교와 맞춤형 선택 가이드
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">클래식 건식 스트레칭 (타이 케어)</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  오일을 사용하지 않고 매트 위에서 진행되는 정통 기법입니다. 수기 압박과 요가 형태의 수동적 관절 신전 운동이 결합되어 굳어있는 햄스트링, 고관절 굴곡근, 척추 기립근의 운동 가동 범위를 물리적으로 넓혀줍니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">스웨디시 감성 바디 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  식물성 베이스 오일을 도포하여 마찰 저항을 최소화한 상태에서 심장 방향으로 부드럽게 밀어 올리는 테크닉입니다. 미세 순환을 촉진하고 통증 없이 림프절을 자극하여 부종 완화와 깊은 안도감을 선사합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">4.</span> 프라이빗 1인 케어 환경이 선사하는 심리·시간적 효율성
            </h3>
            <p>
              개인 자택이나 호텔 객실 등 독립된 사적 공간에서 진행되는 프라이빗 케어는 외부 소음과 이동 스트레스를 차단하여 완전한 휴식을 보장합니다. 관리가 끝난 후 환복이나 복잡한 귀가 이동 없이 온전히 자신의 공간에서 깊은 숙면으로 전환할 수 있습니다.
            </p>
          </div>

          <div className="pt-5 border-t border-white/5 text-[11px] text-gray-500">
            * 본 콘텐츠는 수도권 전역의 건강한 라이프스타일 구축과 올바른 신체 생리학적 테라피 정보 제공을 목적으로 바른테라피 리서치 팀에 의해 작성 및 검수되었습니다.
          </div>
        </section>

        {/* 서비스 가이드 */}
        <section className="bg-[#0f0f13] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
              SERVICE GUIDE
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              바른테라피 안심 이용 가이드
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h4 className="font-bold text-white mt-1">지역 확인</h4>
              <p className="text-xs text-gray-400 mt-1">
                원하시는 수도권 주요 지역을 선택합니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h4 className="font-bold text-white mt-1">프로그램 비교</h4>
              <p className="text-xs text-gray-400 mt-1">
                타이, 아로마, 스웨디시 코스를 확인합니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h4 className="font-bold text-white mt-1">직접 상담</h4>
              <p className="text-xs text-gray-400 mt-1">
                전화 버튼으로 샵과 직접 일정을 소통합니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h4 className="font-bold text-white mt-1">맞춤 케어</h4>
              <p className="text-xs text-gray-400 mt-1">
                전문 테라피스트의 프라이빗 힐링을 누립니다.
              </p>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
              FAQ
            </span>
            <h3 className="text-xl font-black text-white mt-1">자주 묻는 질문</h3>
          </div>
          <div className="space-y-3">
            <FaqItem
              question="예약 및 상담은 어떻게 진행되나요?"
              answer="바른테라피에 등록된 각 제휴 업체의 전화연결 버튼을 통해 샵으로 직접 연결되며, 코스 및 시간을 바로 조율하실 수 있습니다."
            />
            <FaqItem
              question="선입금이나 예약금이 발생하나요?"
              answer="아닙니다. 바른테라피의 모든 제휴 샵은 100% 현장 후불 결제를 철저히 준수하고 있습니다."
            />
            <FaqItem
              question="수도권 전 지역 이용이 가능한가요?"
              answer="서울 25개 구, 경기도 31개 시·군, 인천 전역의 주요 권역별로 등록된 제휴 샵 정보를 편리하게 확인하실 수 있습니다."
            />
          </div>
        </section>
      </main>

      {/* 푸터 */}
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

          <p className="text-gray-400 font-medium">
            바른테라피는 건전하고 쾌적한 프리미엄 바디 테라피 제휴 정보를 제공하는 웰니스 안내 플랫폼입니다.
          </p>
          <p className="text-[11px] text-gray-600">
            COPYRIGHT &copy; BARUN THERAPY ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}