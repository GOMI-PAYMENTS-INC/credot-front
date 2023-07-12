import { ReactSVG } from 'react-svg';

export enum GRADE {
  FREE = 'Free',
  STARTER = 'Starter',
  PRO = 'Pro',
  ENTERPRISE = 'Enterprise',
}

export const PLANS = [
  {
    grade: GRADE.FREE,
    subscribe: '키워드 분석 최대 5회',
    price: { MONTH: '무료', YEAR: '무료' },
    button: '무료로 사용하기',
  },
  {
    grade: GRADE.STARTER,
    subscribe: '키워드 분석 최대 50회',
    price: { MONTH: '15,000원', YEAR: '12,000원' },
    button: '구독하기',
  },
  {
    grade: GRADE.PRO,
    subscribe: '키워드 분석 최대 200회',
    price: { MONTH: '24,000원', YEAR: '19,200원' },
    button: '구독하기',
  },
  {
    grade: GRADE.ENTERPRISE,
    subscribe: '키워드 분석 최대 150회 초과',
    price: { MONTH: '50,000원~', YEAR: '40,000원~' },
    button: '채팅 문의하기',
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
