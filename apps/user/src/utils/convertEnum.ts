import { TITLE, BATCH_STATUS } from '@/types/enum.code';
import { CountryType } from '@/generated/graphql';

export const convertTitle = (id: string) => {
  switch (id) {
    case TITLE.REPORT:
      return '리포트';
    case TITLE.MARTKET_SIZE:
      return '시장 분석';
    case TITLE.RECOMMEND_KEYWORD:
      return '추천 키워드';
    case TITLE.KEYWORD_INFO:
      return '키워드 분석';
    case TITLE.SALE_PRICE:
      return '가격 분석';
    default:
      return id;
  }
};

export const convertBatchStatus = (id: string) => {
  switch (id) {
    case BATCH_STATUS.DONE:
    case BATCH_STATUS.REPLICATE:
      return '완료';
    default:
      return '진행중';
  }
};

export const convertCountry = (id: string) => {
  switch (id) {
    case CountryType.Kr:
      return '한국';
    case CountryType.Us:
      return '미국';
    case CountryType.Vn:
      return '베트남';
    case CountryType.Th:
      return '태국';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};
