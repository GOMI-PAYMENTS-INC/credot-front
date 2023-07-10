export const REPORT_INFO = [
  { 국가: '베트남' },
  { '리포트 생성일': '2022.01.03' },
  { '데이터 수집 기준': '연관도순 상위 50개' },
  { '적용 환율 100 VND =': '5.44 KRW' },
];

export enum REPORT_CONTENT {
  MARKET = 'MARKET',
  KEYWORD = 'KEYWORD',
  BRAND = 'BRAND',
  PRICE = 'PRICE',
  CATEGORY = 'CATEGORY',
  OVERSEA = 'OVERSEA',
}

export const REPORT_CONTENTS = [
  { text: '시장 분석', key: REPORT_CONTENT.MARKET },
  { text: '키워드 분석', key: REPORT_CONTENT.KEYWORD },
  { text: '브랜드 분석', key: REPORT_CONTENT.BRAND },
  { text: '가격 분석', key: REPORT_CONTENT.PRICE },
  { text: '카테고리 분석', key: REPORT_CONTENT.CATEGORY },
  { text: '해외배송 상품 분석', key: REPORT_CONTENT.OVERSEA },
];

export const TRAND_DATA = [
  {
    id: 4,
    trend_date: '2022-01-01T00:00:00.000+00:00',
    interest: 70,
  },
  {
    id: 6,
    trend_date: '2022-02-01T00:00:00.000+00:00',
    interest: 105,
  },
  {
    id: 7,
    trend_date: '2022-03-01T00:00:00.000+00:00',
    interest: 99,
  },
  {
    id: 8,
    trend_date: '2022-04-01T00:00:00.000+00:00',
    interest: 26,
  },
  {
    id: 9,
    trend_date: '2022-05-01T00:00:00.000+00:00',
    interest: 145,
  },
  {
    id: 10,
    trend_date: '2022-06-01T00:00:00.000+00:00',
    interest: 98,
  },
  {
    id: 11,
    trend_date: '2022-07-01T00:00:00.000+00:00',
    interest: 118,
  },
  {
    id: 12,
    trend_date: '2022-08-01T00:00:00.000+00:00',
    interest: 33,
  },
  {
    id: 1,
    trend_date: '2022-09-01T00:00:00.000+00:00',
    interest: 87,
  },
  {
    id: 2,
    trend_date: '2022-10-01T00:00:00.000+00:00',
    interest: 0,
  },
  {
    id: 3,
    trend_date: '2022-11-01T00:00:00.000+00:00',
    interest: 119,
  },
  {
    id: 5,
    trend_date: '2022-12-01T00:00:00.000+00:00',
    interest: 166,
  },
];
