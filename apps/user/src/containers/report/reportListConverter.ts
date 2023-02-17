import { statusTagSentiment } from '@/types/statusTagSentiment';
import { TReportItem } from '@/types/report';
import { countryCodeEnum } from '@/types/reportData';

export const reportListConverter = (item: TReportItem) => {
  let result = {};

  const status = () => {
    let text = '';
    let sentiment = statusTagSentiment.NEUTRAL;
    switch (item.status) {
      case 'WAIT':
      case 'RUN':
      case 'REPLICATE':
        text = '진행중';
        sentiment = statusTagSentiment.ATTENTIVE;
        break;
      case 'DONE':
        text = '완료';
        sentiment = statusTagSentiment.POSITIVE;
        break;
    }
    Object.assign(result, {
      status: {
        text: text,
        sentiment: sentiment,
      },
    });
  };
  status();

  const countryCode = () => {
    let text = '';
    let iconPath = '';
    switch (item.countryCode) {
      case 'KR':
        text = countryCodeEnum.KR;
        iconPath = '';
        break;
      case 'US':
        text = countryCodeEnum.US;
        iconPath = '';
        break;
      case 'VN':
        text = countryCodeEnum.VN;
        iconPath = '/assets/icons/flag/Vietnam.svg';
        break;
      case 'TH':
        text = countryCodeEnum.TH;
        iconPath = '';
        break;
    }
    Object.assign(result, {
      countryCode: {
        text: text,
        iconPath: iconPath,
      },
    });
  };
  countryCode();

  const channel = () => {
    let iconPath = '';
    switch (item.channel) {
      case 'SHOPEE':
        iconPath = '/assets/icons/shop/Shopee.svg';
        break;
    }
    Object.assign(result, {
      channel: {
        iconPath: iconPath,
      },
    });
  };
  channel();

  return result;
};
