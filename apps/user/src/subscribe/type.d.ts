type TSubscribeViewPage = 'MyPlan' | 'Upgrade' | 'Downgrade' | 'Unsubscribe';
type TPlanType = {
  name: string;
  originPrice: number;
  price: number;
  count: number;
};

type TRequestStatus = 'accepted' | 'rejected';
