type CommonErrorType = {
  response: {
    code: string;
    message: string;
    data: null;
  };
};

type TGetSubscriptionResponse = {
  id: number;
  userId: number;
  paymentId: number;
  productUniqueKey: TPlanUniqueKey;
  count: number;
  totalCount: number;
  startedAt: string;
  endedAt: string;
  productPriority: number;
  nextStatus: TNextStatus;
};

type TNextStatus = 'WAIT' | 'DOWNGRADE_STARTER' | 'UNSUBSCRIBE';

type TDropDownOption = {
  value: string | number;
  iconPath?: string;
  text: string;
};

type TCategoryListResponse = {
  categories: {
    countryCode: TSearchCountry;
    category: {
      code: string;
      value: string;
    }[];
  }[];
};

type TCurrencyResponse = {
  exchangeRates: {
    id: 0;
    name: 'string';
    country: 'string';
    currencyCode: 'string';
    currencyUnit: 'string';
    basePrice: 'string';
    date: 'string';
    createdAt: '2023-10-17T01:43:46.987Z';
  }[];
};
