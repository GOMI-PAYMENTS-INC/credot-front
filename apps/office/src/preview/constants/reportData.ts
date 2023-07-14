export const REPORT_INFO = [
  { 국가: '싱가포르' },
  { '리포트 생성일': '2023.07.13' },
  { '데이터 수집 기준': '연관도순 상위 50개' },
  { '적용 환율 1 SGD =': '959.21 KRW' },
];

export enum REPORT_CONTENT {
  MARKET = 'MARKET',
  KEYWORD = 'KEYWORD',
  BRAND = 'BRAND',
  PRICE = 'PRICE',
  OVERSEA = 'OVERSEA',
  CATEGORY = 'CATEGORY',
}

export const REPORT_CONTENTS = [
  { text: '시장 분석', key: REPORT_CONTENT.MARKET },
  { text: '키워드 분석', key: REPORT_CONTENT.KEYWORD },
  { text: '브랜드 분석', key: REPORT_CONTENT.BRAND },
  { text: '가격 분석', key: REPORT_CONTENT.PRICE },
  { text: '해외배송 상품 분석', key: REPORT_CONTENT.OVERSEA },
  { text: '카테고리 분석', key: REPORT_CONTENT.CATEGORY },
];
