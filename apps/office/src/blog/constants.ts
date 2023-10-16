import { PATH } from '@/common/constants';

export const CONTENT_LIST = [
  { text: 'SERP, 검색 결과 화면 분석의 중요성', category: 'insight', path: PATH.SERP },
];

export const CATEGORY_LIST = [
  { text: '인사이트', value: 'insight', path: 'insight', children: CONTENT_LIST },
  { text: '제품', value: 'product', path: 'product' },
  { text: '소식', value: 'news', path: 'news' },
];

export const SEO_LIST = [
  '상품 제목에 사용된 키워드',
  '상품 제목의 글자 수',
  '할인율',
  '판매가',
  '최근 30일 판매량',
  '최근 30일 매출',
  '상품의 평점',
  '리뷰 수',
  '좋아요 수',
  '등록된 상품',
  '이미지 수 ',
  '영상 등록 여부',
  '영상의 길이',
  '문의글 수',
  '문의 답글 수',
  '셀러의 팔로워 수',
  '셀러의 보유 상품 수',
  '셀러의 평점',
  '셀러의 문의 응답률',
  '셀러의 문의 응답 시간',
];
