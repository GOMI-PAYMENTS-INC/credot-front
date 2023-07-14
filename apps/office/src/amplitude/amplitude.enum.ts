//Amplitude
export enum PAGE_CATEGORY {
  MAIN = 'main',
  PRICE = 'price',
  PREVIEW = 'preview',
  KEYWORD_REPORT_PREVIEWED = 'keyword report previewed',
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
}

export const pageCategoryConvertor = (pathname: string) => {
  switch (pathname) {
    case '/price':
      return PAGE_CATEGORY.PRICE;
    case '/preview':
      return PAGE_CATEGORY.KEYWORD_REPORT_PREVIEWED;
    default:
      return PAGE_CATEGORY.MAIN;
  }
};
