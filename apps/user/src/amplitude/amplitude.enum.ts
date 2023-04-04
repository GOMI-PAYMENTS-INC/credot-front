//Amplitude

import {CHANNEL_TYPE, COLLECT_SORT_TYPE, COUNTRY_TYPE} from "@/types/enum.code";

export enum AMPLITUDE_ACCOUNT_TYPE {
  LOCAL = 'id/pw',
  GOOGLE = 'google',
}

export enum AMPLITUDE_SORTED_TYPE {
  RELEVANCE = 'relevance',
  TOP_SALES = 'topsales',
  NONE = 'undefined',
}

export const convertAmplitudeSortedType = (sort: TCollectSortType) => {
  switch (sort) {
    case COLLECT_SORT_TYPE.R:
      return AMPLITUDE_SORTED_TYPE.RELEVANCE;
    default:
      return AMPLITUDE_SORTED_TYPE.NONE;
  }
};
