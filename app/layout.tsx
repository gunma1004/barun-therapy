import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://barun-therapy.netlify.app';

// 🌟 네이버 모바일 친화도 검사 최적화 Viewport 설정
export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // 🎯 네이버 권장 40자 이내 타이틀 템플릿 (34자)
  title: {
    default: '서울·경기·인천 출장 신뢰케어 마사지 | 바른테라피',
    template: '%s | 바른테라피',
  },

  // 🎯 네이버 권장 80자 이내 완결형 설명문 (76자)
  description:
    '바른테라피 - 선입금 없는 100% 현장 후불제 출장마사지 안내. 서울·경기·인천 검증 제휴 샵 코스와 투명한 가격을 확인하세요.',

  keywords: [
    '바른테라피',
    '서울 출장마사지',
    '경기 출장마사지',
    '인천 출장마사지',
    '수도권 홈타이',
    '스웨디시 추천',
    '아로마마사지',
    '출장마사지 후불제',
  ],

  authors: [{ name: '바른테라피', url: SITE_URL }],
  creator: '바른테라피',
  publisher: '바른테라피',

  formatDetection: {
    telephone: true,
  },

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 🌟 네이버 검색로봇(Yeti) 전용 메타 태그 및 사이트 소유확인
  other: {
    Yeti: 'index,follow,max-image-preview:large',
    'naver-site-verification': 'f05ae15f6d7c4ac948ff5b59ec0aef5953e6762e',
  },

  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '바른테라피',
    title: '서울·경기·인천 출장 신뢰케어 마사지 | 바른테라피',
    description:
      '선입금 없는 100% 현장 후불제 서울·수도권 출장마사지 정보 플랫폼 바른테라피. 검증 제휴 샵과 투명한 가격 안내.',
    images: [
      {
        url: '/shop1.jpg',
        width: 1200,
        height: 675,
        alt: '바른테라피 서울·수도권 출장 신뢰케어 마사지',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: '서울·경기·인천 출장 신뢰케어 마사지 | 바른테라피',
    description:
      '선입금 없는 100% 현장 후불제 서울·수도권 출장마사지 정보 플랫폼 바른테라피. 검증 제휴 샵과 투명한 가격 안내.',
    images: ['/shop1.jpg'],
  },
};

// 🌟 네이버 서치어드바이저 & 구글 공용 고도화 JSON-LD 스키마 (불필요 링크 제거, 권역 페이지 연결)
const globalStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: '바른테라피',
      alternateName: ['Barun Therapy', '바른 테라피'],
      description: '서울·경기·인천 선입금 없는 100% 현장 후불제 출장 홈케어 안내 플랫폼',
      inLanguage: 'ko-KR',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@type': ['HealthAndBeautyBusiness', 'Organization'],
      '@id': `${SITE_URL}/#organization`,
      name: '바른테라피',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/shop1.jpg`,
      },
      image: `${SITE_URL}/shop1.jpg`,
      description: '서울, 경기, 인천 전 지역 출장마사지 및 프라이빗 바디케어 제휴 정보 안내',
      telephone: '0507-1280-3303',
      priceRange: '60,000원~160,000원',
      currenciesAccepted: 'KRW',
      paymentAccepted: 'Cash, Credit Card',
      areaServed: [
        { '@type': 'AdministrativeArea', name: '서울특별시' },
        { '@type': 'AdministrativeArea', name: '경기도' },
        { '@type': 'AdministrativeArea', name: '인천광역시' },
      ],
      address: {
        '@type': 'PostalAddress',
        addressRegion: '서울특별시',
        addressCountry: 'KR',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '0507-1280-3303',
        contactType: 'customer service',
        areaServed: 'KR',
        availableLanguage: 'Korean',
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#navigation`,
      name: '바른테라피 권역별 주요 안내',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: '서울 마사지',
          url: `${SITE_URL}/seoul`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: '경기 마사지',
          url: `${SITE_URL}/gyeonggi`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: '인천 마사지',
          url: `${SITE_URL}/incheon`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }}
        />
      </head>
      <body className="bg-[#050505] text-gray-100 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}