import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://barun-therapy.netlify.app'),
  title: {
    default: '서울 출장 신뢰케어 마사지 | 일정에 맞춘 홈타이 코스 - 바른테라피',
    template: '%s | 바른테라피',
  },
  description:
    '바른테라피 - 선입금 없는 100% 현장 후불제 서울 출장마사지 안내. 서울·경기·인천 일정과 공간에 맞춘 검증 제휴 샵과 투명한 코스 가격을 확인하세요.',
  keywords: [
    '바른테라피',
    '서울 출장 신뢰케어 마사지',
    '서울 출장 안심 마사지',
    '서울 홈타이',
    '서울출장마사지',
    '스웨디시',
    '아로마마사지',
    '출장마사지 후불제',
  ],
  authors: [{ name: '바른테라피' }],
  creator: '바른테라피',
  publisher: '바른테라피',
  formatDetection: {
    telephone: true,
  },
  alternates: {
    canonical: 'https://barun-therapy.netlify.app',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://barun-therapy.netlify.app',
    siteName: '바른테라피',
    title: '서울 출장 신뢰케어 마사지 | 일정에 맞춘 홈타이 코스 - 바른테라피',
    description:
      '선입금 없는 100% 현장 후불제 서울 출장마사지 정보 플랫폼 바른테라피. 검증 제휴 샵과 투명한 가격 안내.',
    images: [
      {
        url: '/shop1.jpg',
        width: 1200,
        height: 675,
        alt: '바른테라피 서울 출장 신뢰케어 마사지 대표 이미지',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    other: {
      'naver-site-verification': '6b62e9c4236f7cb461e8699f5031abfd5491f545',
    },
  },
};

// 전역 사이트 구조화 데이터
const globalStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://barun-therapy.netlify.app/#website',
      url: 'https://barun-therapy.netlify.app',
      name: '바른테라피',
      alternateName: ['Barun Therapy', '바른 테라피'],
      description: '서울·수도권 전지역 선입금 없는 100% 현장 후불제 출장 홈케어 안내 플랫폼',
      inLanguage: 'ko-KR',
      publisher: {
        '@id': 'https://barun-therapy.netlify.app/#organization',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://barun-therapy.netlify.app/#organization',
      name: '바른테라피',
      url: 'https://barun-therapy.netlify.app',
      logo: 'https://barun-therapy.netlify.app/shop1.jpg',
      telephone: '0507-1280-3303',
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
      '@id': 'https://barun-therapy.netlify.app/#navigation',
      name: '바른테라피 주요 메뉴',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: '프로그램',
          url: 'https://barun-therapy.netlify.app/services',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: '코스비용',
          url: 'https://barun-therapy.netlify.app/prices',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: '지역여행',
          url: 'https://barun-therapy.netlify.app/travel',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 4,
          name: '맛집·숙소',
          url: 'https://barun-therapy.netlify.app/places',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 5,
          name: '이용후기',
          url: 'https://barun-therapy.netlify.app/reviews',
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
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}