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
    trendDate: '2022-01-01T00:00:00.000+00:00',
    interest: 70,
  },
  {
    id: 6,
    trendDate: '2022-02-01T00:00:00.000+00:00',
    interest: 105,
  },
  {
    id: 7,
    trendDate: '2022-03-01T00:00:00.000+00:00',
    interest: 99,
  },
  {
    id: 8,
    trendDate: '2022-04-01T00:00:00.000+00:00',
    interest: 26,
  },
  {
    id: 9,
    trendDate: '2022-05-01T00:00:00.000+00:00',
    interest: 145,
  },
  {
    id: 10,
    trendDate: '2022-06-01T00:00:00.000+00:00',
    interest: 98,
  },
  {
    id: 11,
    trendDate: '2022-07-01T00:00:00.000+00:00',
    interest: 118,
  },
  {
    id: 12,
    trendDate: '2022-08-01T00:00:00.000+00:00',
    interest: 33,
  },
  {
    id: 1,
    trendDate: '2022-09-01T00:00:00.000+00:00',
    interest: 87,
  },
  {
    id: 2,
    trendDate: '2022-10-01T00:00:00.000+00:00',
    interest: 0,
  },
  {
    id: 3,
    trendDate: '2022-11-01T00:00:00.000+00:00',
    interest: 119,
  },
  {
    id: 5,
    trendDate: '2022-12-01T00:00:00.000+00:00',
    interest: 166,
  },
];

export const relations = [
  {
    id: 1,
    text: 'tdung sarung',
    search_count: 1942,
    competition_product_count: 5396,
    competition_rate: 2.78,
    cpc_price: 1.69254,
    cpc_rate: 23.44238,
    avg_price: 7.22,
    evaluate_status: 'BCE',
    batch_status: 'DONE',
    created_at: '2023-07-11T05:42:20.566+00:00',
  },
  {
    id: 2,
    text: 'tudubg sarung',
    search_count: 936,
    competition_product_count: 10983,
    competition_rate: 11.73,
    cpc_price: 2.21652,
    cpc_rate: 8.53821,
    avg_price: 25.96,
    evaluate_status: 'CEC',
    batch_status: 'DONE',
    created_at: '2023-07-11T05:42:29.003+00:00',
  },
  {
    id: 3,
    text: 'sarung',
    search_count: 8982,
    competition_product_count: 3000,
    competition_rate: 0.33,
    cpc_price: 1.65057,
    cpc_rate: 6.88311,
    avg_price: 23.98,
    evaluate_status: 'AAC',
    batch_status: 'DONE',
    created_at: '2023-07-11T05:52:17.134+00:00',
  },
  {
    id: 4,
    text: 'tudung sarun',
    search_count: 131,
    competition_product_count: 6,
    competition_rate: 0.05,
    cpc_price: 0.61873,
    cpc_rate: 0.67348,
    avg_price: 91.87,
    evaluate_status: 'EAA',
    batch_status: 'DONE',
    created_at: '2023-07-11T05:52:26.121+00:00',
  },
];
