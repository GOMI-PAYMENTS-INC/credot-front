import { GRADE } from '@/price/constans';
//Amplitude
export enum PAGE_CATEGORY {
  MAIN = 'main',
  PREVIEW = 'preview',
  KEYWORD_REPORT_PREVIEWED = 'keyword report previewed',
  KEYWORD_ANALYSIS_PRICING = 'keyword analysis pricing',
}
export enum CTA_TYPE {
  BUTTON = 'button',
  BANNER = 'banner',
  TEXT_LINK = 'text link',
}
export enum CTA_LOCATION {
  HEADER = 'header',
  MIDDLE_OF_CONTENT = 'middle of content',
  BOTTOM = 'bottom',
  FREE = 'free plan',
  STARTER = 'starter plan',
  PRO = 'pro plan',
}

export const pageCategoryConvertor = (pathname: string) => {
  switch (pathname) {
    case '/price':
      return PAGE_CATEGORY.KEYWORD_ANALYSIS_PRICING;
    case '/preview':
      return PAGE_CATEGORY.KEYWORD_REPORT_PREVIEWED;
    default:
      return PAGE_CATEGORY.MAIN;
  }
};

export const planConvertor = (plan: GRADE) => {
  switch (plan) {
    case GRADE.STARTER:
      return CTA_LOCATION.STARTER;
    case GRADE.PRO:
      return CTA_LOCATION.PRO;
    default:
      return CTA_LOCATION.FREE;
  }
};
