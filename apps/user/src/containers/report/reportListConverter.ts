import { TAG_SENTIMENT_STATUS, BATCH_STATUS } from '@/types/enum.code';
import { CountryType } from '@/generated/graphql';
import { convertBatchStatus, convertCountry } from '@/utils/convertEnum';

export const reportListConverter = (item: TReportItem) => {
  const result = {
    status: {
      text: convertBatchStatus(item.status),
      sentiment: TAG_SENTIMENT_STATUS.ATTENTIVE,
    },
    countryCode: {
      text: convertBatchStatus(item.countryCode),
      iconPath: '/assets/icons/flag/Vietnam.svg',
    },
    channel: { iconPath: '/assets/icons/shop/Shopee.svg' },
  };

  if (item.status === BATCH_STATUS.DONE) {
    result.status.sentiment = TAG_SENTIMENT_STATUS.POSITIVE;
  }

  return result;
};
