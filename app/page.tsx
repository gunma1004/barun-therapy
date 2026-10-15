import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://barun-therapy.netlify.app";

// 🌟 네이버 권장 글자수(제목 40자, 설명 80자 이내) 맞춤 메타데이터
export const metadata: Metadata = {
  title: {
    absolute: "서울·경기·인천 출장 신뢰케어 마사지 | 바른테라피",
  },
  description:
    "바른테라피 - 선입금 없는 100% 현장 후불제 출장마사지 안내. 서울·경기·인천 검증 제휴 샵 코스와 투명한 가격을 확인하세요.",
  keywords: [
    "바른테라피",
    "서울 출장마사지",
    "경기 출장마사지",
    "인천 출장마사지",
    "수도권 홈타이",
    "스웨디시",
    "타이마사지",
    "아로마테라피",
    "출장마사지 후불제",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "서울·경기·인천 출장 신뢰케어 마사지 | 바른테라피",
    description:
      "선입금 없는 100% 현장 후불제 서울·수도권 출장마사지 정보 플랫폼 바른테라피. 검증 제휴 샵과 투명한 가격 안내.",
    url: SITE_URL,
    siteName: "바른테라피",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "바른테라피 서울 출장 신뢰케어 마사지 대표 배너",
      },
    ],
  },
};

export default function Page() {
  // 🌟 네이버 서치어드바이저 및 구글 검색엔진 최적화 종합 JSON-LD (@graph 구조)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. 웹사이트 엔티티
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "바른테라피",
        alternateName: ["Barun Therapy", "바른 테라피"],
        description: "서울, 경기, 인천 전지역 출장 프리미엄 안심 마사지 제휴 정보 플랫폼",
        inLanguage: "ko-KR",
      },
      // 2. 비즈니스 및 조직 엔티티 (HealthAndBeautyBusiness 결합)
      {
        "@type": ["HealthAndBeautyBusiness", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: "바른테라피",
        url: SITE_URL,
        logo: `${SITE_URL}/shop1.jpg`,
        image: `${SITE_URL}/banner.jpg`,
        telephone: "0507-1280-3303",
        priceRange: "60,000원~160,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        address: {
          "@type": "PostalAddress",
          addressRegion: "서울특별시",
          addressCountry: "KR",
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "서울특별시" },
          { "@type": "AdministrativeArea", name: "경기도" },
          { "@type": "AdministrativeArea", name: "인천광역시" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "0507-1280-3303",
          contactType: "customer service",
          areaServed: "KR",
          availableLanguage: "Korean",
        },
      },
      // 3. 이용 절차 안내 (HowTo 스키마)
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#howto`,
        name: "바른테라피 수도권 안심 힐링 케어 이용 절차",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "지역 및 프로그램 확인",
            text: "서울·경기·인천 지역 필터를 통해 계신 위치의 제휴 샵 코스와 정찰 요금을 확인합니다.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "직통 안심 전화 상담",
            text: "안심번호로 해당 샵과 직접 통화하여 방문 희망 시간과 코스를 조율합니다.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "신속 방문 및 맞춤 케어",
            text: "약속된 시간에 전문 관리사가 프라이빗 공간으로 방문하여 1:1 맞춤 세션을 진행합니다.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "100% 현장 후불 결제",
            text: "선입금 없이 관리사 도착 후 계신 자리에서 직접 확인하고 결제합니다.",
          },
        ],
      },
      // 4. 검색창 아코디언 노출용 FAQ (FAQPage 스키마)
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "예약 및 상담은 어떻게 진행되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "바른테라피에 등록된 각 제휴 샵의 전화연결 버튼을 통해 매니저와 직접 연결되며, 코스 및 시간을 즉시 조율하실 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "선입금이나 예약금이 발생하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "바른테라피의 모든 제휴점은 선입금 없는 100% 현장 후불 결제를 엄격히 준수합니다.",
            },
          },
          {
            "@type": "Question",
            name: "서울 외 경기, 인천 지역도 이용 가능한가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "서울 25개 구 전역은 물론 경기도 31개 시·군 및 인천 전 권역에서 신속 매칭이 가능합니다.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* 네이버 서치어드바이저 및 구글 검색엔진 수집 최적화 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainClientUI />
    </>
  );
}