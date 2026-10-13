// 바른테라피 지역 상세 페이지용 - 케어맵 상위 호환 통합 JSON-LD 예시
const advancedJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. 빵가루 내비게이션
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://barun-therapy.netlify.app" },
        { "@type": "ListItem", "position": 2, "name": regionFullName, "item": `https://barun-therapy.netlify.app/${region}` },
        { "@type": "ListItem", "position": 3, "name": `${districtName} 출장마사지`, "item": canonicalUrl }
      ]
    },
    // 2. 비즈니스 엔티티 (영업시간, 가격, 결제방식 정밀 등록)
    {
      "@type": "HealthAndBeautyBusiness",
      "@id": `${canonicalUrl}#business`,
      "name": `${districtName} 출장 신뢰케어 마사지 - 바른테라피`,
      "description": pattern.desc(districtName),
      "url": canonicalUrl,
      "telephone": "0507-1280-3303",
      "image": "https://barun-therapy.netlify.app/shop1.jpg",
      "openingHours": "Mo-Su 00:00-24:00",
      "priceRange": "60,000원~",
      "currenciesAccepted": "KRW",
      "paymentAccepted": "Cash, Credit Card (100% 현장 후불)",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": districtName,
        "addressRegion": regionFullName,
        "addressCountry": "KR"
      }
    },
    // 3. 케어맵의 강점인 HowTo (이용 절차 스키마 추가)
    {
      "@type": "HowTo",
      "name": `${districtName} 출장 안심 힐링 케어 이용 절차`,
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "지역 및 코스 선택", "text": "바른테라피에서 거주 지역의 제휴 샵 코스와 정찰제 요금을 확인합니다." },
        { "@type": "HowToStep", "position": 2, "name": "직통 안심 전화 상담", "text": "0507 안심번호로 샵과 직접 통화하여 방문 희망 시간과 장소를 조율합니다." },
        { "@type": "HowToStep", "position": 3, "name": "신속 방문 및 프라이빗 케어", "text": "평균 25~35분 내 약속 장소로 전문 관리사가 방문하여 1:1 맞춤 세션을 진행합니다." },
        { "@type": "HowToStep", "position": 4, "name": "100% 현장 후불 결제", "text": "선입금 없이 관리사 도착 후 계신 자리에서 직접 확인하고 결제합니다." }
      ]
    },
    // 4. FAQ 스키마 (검색창 아코디언 노출)
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `${districtName} 출장마사지 예약 및 이용 방법은?`,
          "acceptedAnswer": { "@type": "Answer", "text": "리스트의 직통 전화 버튼을 통해 샵 매니저와 직접 시간과 위치를 조율하실 수 있습니다." }
        },
        {
          "@type": "Question",
          "name": "선입금이나 예약금이 발생하나요?",
          "acceptedAnswer": { "@type": "Answer", "text": "바른테라피의 모든 제휴점은 100% 현장 후불 결제를 준수하며 예약금을 요구하지 않습니다." }
        }
      ]
    }
  ]
};