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
