import { TITLE, BATCH_STATUS, LANGUAGE_TYPE, SORT_BY_TYPE } from '@/types/enum.code';
import { CountryType } from '@/generated/graphql';

export const convertTitle = (id: string) => {
  switch (id) {
    case TITLE.REPORT:
      return '리포트';
    case TITLE.MARKET_SIZE:
      return '시장 분석';
    case TITLE.KEYWORD_INFO:
      return '키워드 분석';
    case TITLE.SALE_PRICE:
      return '가격 분석';
    case TITLE.OVERSEA_PRODUCT:
      return '해외배송 상품 분석';
    default:
      return id;
  }
};

export const convertBatchStatus = (status: string) => {
  switch (status) {
    case BATCH_STATUS.DONE:
    case BATCH_STATUS.REPLICATE:
      return '완료';
    default:
      return '진행중';
  }
};

export const convertCountry = (countryCode: CountryType) => {
  switch (countryCode) {
    case CountryType.Kr:
      return '한국';
    case CountryType.My:
      return '말레이시아';
    case CountryType.Sg:
      return '싱가포르';
    case CountryType.Th:
      return '태국';
    case CountryType.Tw:
      return '대만';
    case CountryType.Us:
      return '미국';
    case CountryType.Vn:
      return '베트남';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};
export const convertLanguage = (languageCode: LANGUAGE_TYPE) => {
  switch (languageCode) {
    case LANGUAGE_TYPE.Th:
      return '태국어';
    case LANGUAGE_TYPE.Cn:
      return '중국어 (번체)';
    case LANGUAGE_TYPE.Us:
      return '영어';
    case LANGUAGE_TYPE.Vn:
      return '베트남어';
    default:
      console.error(languageCode, 'enum 코드를 확인해주세요.');
      return '';
  }
};

export const convertExchangeRate = (country: CountryType) => {
  switch (country) {
    case CountryType.Sg:
      return 'SGD';
    case CountryType.My:
      return 'MYR';
    case CountryType.Tw:
      return 'TWD';
    case CountryType.Vn:
      return 'VND';
    case CountryType.Th:
      return 'THB';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};

export const convertShopeeSiteUrl = (country: CountryType) => {
  switch (country) {
    case CountryType.Sg:
      return 'https://shopee.sg';
    case CountryType.My:
      return 'https://shopee.com.my';
    case CountryType.Tw:
      return 'https://shopee.tw';
    case CountryType.Vn:
      return 'https://shopee.vn';
    case CountryType.Th:
      return 'https://shopee.co.th';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};

export const convertCountryIconPath = (countryCode: CountryType) => {
  const url = '/assets/icons/flag';
  switch (countryCode) {
    case CountryType.Kr:
      return `${url}/Korea.svg`;
    case CountryType.My:
      return `${url}/Malaysia.svg`;
    case CountryType.Sg:
      return `${url}/Singapore.svg`;
    case CountryType.Th:
      return `${url}/Thailand.svg`;
    case CountryType.Tw:
      return `${url}/Taiwan.svg`;
    case CountryType.Vn:
      return `${url}/Vietnam.svg`;
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};

export const convertSortByIconPath = (sortBy: TSortBy) => {
  const url = '/assets/icons/outlined';
  switch (sortBy) {
    case SORT_BY_TYPE.R:
      return `${url}/Link.svg`;
    case SORT_BY_TYPE.S:
      return `${url}/Star.svg`;
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};

export const convertSortedType = (sortedType: TSortBy) => {
  switch (sortedType) {
    case SORT_BY_TYPE.S:
      return `판매량순`;
    case SORT_BY_TYPE.R:
      return `연관도순`;
    default:
      console.error('enum 코드를 확인해주세요.', sortedType);
      return '';
  }
};
