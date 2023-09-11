type TSubscribeViewPage = 'MyPlan' | 'Upgrade' | 'Downgrade' | 'Unsubscribe';
type TPlanType = {
  name: string;
  originPrice: number;
  price: number;
  count: number;
};

type TRequestStatus = 'accepted' | 'rejected';

type TGetPlansResponse = {
  totalCount: number;
  products: TPlans[];
};

type TPlans = {
  type: 'PLAN';
  createdAt: string;
  updatedAt: string;
  id: number;
  priority: number;
  name: TPlanNames;
  description: string;
  originPrice: number;
  price: number;
  count: number;
  isSubscribe: true;
  subscribeCycle: number;
  isUse: true;
  uniqueKey: string;
};

type TPlanNames = 'Starter' | 'Pro' | 'Free';
