//Amplitude

import { SORT_BY_TYPE } from '@/types/enum.code';

export enum AMPLITUDE_ACCOUNT_TYPE {
  LOCAL = 'id/pw',
  GOOGLE = 'google',
}

export enum AMPLITUDE_SORT_BY_TYPE {
  RELEVANCE = 'relevance',
  TOP_SALES = 'topsales',
}

export const convertAmplitudeSortedType = (sort: TSortBy) => {
  switch (sort) {
    case SORT_BY_TYPE.R:
      return AMPLITUDE_SORT_BY_TYPE.RELEVANCE;
    case SORT_BY_TYPE.S:
      return AMPLITUDE_SORT_BY_TYPE.TOP_SALES;
    default:
      return null;
  }
};

export enum KEYWORD_ANALYSIS_PLAN {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
}
