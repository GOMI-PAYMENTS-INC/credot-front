import { GlobalEnv } from '@/api/config';

export enum GRADE {
  FREE = 'Free',
  STARTER = 'Starter',
  PRO = 'Pro',
  // ENTERPRISE = 'Enterprise',
}

export const PLANS = [
  {
    grade: GRADE.FREE,
    subscribe: '키워드 분석 최대 5회',
    price: { MONTH: '무료' },
    button: '무료로 사용하기',
    url: `${GlobalEnv.serviceUrl}`,
  },
  {
    grade: GRADE.STARTER,
    subscribe: '키워드 분석 최대 50회',
    price: { MONTH: '10,000원', origin: '20,000원', sale: '50%' },
    button: '구독하기',
    url: `${GlobalEnv.serviceUrl}/subscribe`,
  },
  {
    grade: GRADE.PRO,
    subscribe: '키워드 분석 최대 120회',
    price: { MONTH: '16,000원', origin: '32,000원', sale: '50%' },
    button: '구독하기',
    url: `${GlobalEnv.serviceUrl}/subscribe`,
  },
];

export const KEYWORD_CONTENTS = [
  {
    imgPath: '/assets/icons/Back.svg',
    title: '시장분석',
    contents: ['키워드 매출', '판매량', '검색 트랜드', '가장수요가 많은 월'],
  },
  {
    imgPath: '/assets/icons/KeywordSearch.svg',
    title: '키워드 분석',
    contents: ['키워드 매출', '판매량', '검색 트랜드', '가장수요가 많은 월'],
  },
  {
    imgPath: '/assets/icons/Price.svg',
    title: '브랜드 분석',
    contents: ['키워드 매출', '판매량', '검색 트랜드', '가장수요가 많은 월'],
  },
  {
    imgPath: '/assets/icons/Brand.svg',
    title: '해외배송 분석',
    contents: ['키워드 매출', '판매량', '검색 트랜드', '가장수요가 많은 월'],
  },
  {
    imgPath: '/assets/icons/Appstore.svg',
    title: '카테고리 분석',
    contents: ['키워드 매출', '판매량', '검색 트랜드', '가장수요가 많은 월'],
  },
];
