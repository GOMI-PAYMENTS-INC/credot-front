import { BATCH_STATUS, LANGUAGE_TYPE, SORT_BY_TYPE, TITLE } from '@/types/enum.code';
import { CountryType } from '@/generated/graphql';

export const convertTitle = (id: string) => {
  switch (id) {
    case TITLE.REPORT:
      return '리포트';
    case TITLE.BRAND_ANALYSIS:
      return '브랜드 분석';
    case TITLE.MARKET_SIZE:
      return '시장 분석';
    case TITLE.KEYWORD_INFO:
      return '키워드 분석';
    case TITLE.SALE_PRICE:
      return '가격 분석';
    case TITLE.OVERSEA_PRODUCT:
      return '해외배송 상품 분석';
    case TITLE.CATEGORY_ANALYSIS:
      return '카테고리 분석';
    default:
      return id;
  }
};

export const convertBatchStatus = (status: string, itemCount: number) => {
  switch (status) {
    case BATCH_STATUS.DONE: {
      if (itemCount < 9) {
        return '상품부족';
      }
    }
    case BATCH_STATUS.REPLICATE:
      return '완료';
    default:
      return '진행중';
  }
};

export const convertCountry = (countryCode: CountryType | TSearchCountry) => {
  switch (countryCode) {
    case CountryType.KR:
      return '한국';
    case CountryType.MY:
      return '말레이시아';
    case CountryType.SG:
      return '싱가포르';
    case CountryType.TH:
      return '태국';
    case CountryType.TW:
      return '대만';
    case CountryType.US:
      return '미국';
    case CountryType.VN:
      return '베트남';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};
export const convertLanguage = (languageCode: LANGUAGE_TYPE) => {
  switch (languageCode) {
    case LANGUAGE_TYPE.TH:
      return '태국어';
    case LANGUAGE_TYPE.CN:
      return '중국어 (번체)';
    case LANGUAGE_TYPE.US:
      return '영어';
    case LANGUAGE_TYPE.VN:
      return '베트남어';
    default:
      console.error(languageCode, 'enum 코드를 확인해주세요.');
      return '';
  }
};

export const convertExchangeRate = (country: CountryType) => {
  switch (country) {
    case CountryType.SG:
      return 'SGD';
    case CountryType.MY:
      return 'MYR';
    case CountryType.TW:
      return 'TWD';
    case CountryType.VN:
      return 'VND';
    case CountryType.TH:
      return 'THB';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};

export const convertShopeeSiteUrl = (country: CountryType | TSearchCountry) => {
  switch (country) {
    case CountryType.SG:
      return 'https://shopee.sg';
    case CountryType.MY:
      return 'https://shopee.com.my';
    case CountryType.TW:
      return 'https://shopee.tw';
    case CountryType.VN:
      return 'https://shopee.vn';
    case CountryType.TH:
      return 'https://shopee.co.th';
    default:
      console.error('enum 코드를 확인해주세요.');
      return '';
  }
};

export const convertCountryIconPath = (countryCode: CountryType | TSearchCountry) => {
  const url = '/assets/icons/flag';
  switch (countryCode) {
    case CountryType.KR:
      return `${url}/Korea.svg`;
    case CountryType.MY:
      return `${url}/Malaysia.svg`;
    case CountryType.SG:
      return `${url}/Singapore.svg`;
    case CountryType.TH:
      return `${url}/Thailand.svg`;
    case CountryType.TW:
      return `${url}/Taiwan.svg`;
    case CountryType.VN:
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
      throw new Error();
  }
};
