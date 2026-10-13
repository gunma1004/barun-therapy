import { MetadataRoute } from 'next';

const BASE_URL = 'https://barun-therapy.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Yeti', // 네이버 검색 로봇 전용 허용
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot', // 구글 검색 로봇 전용 허용
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}