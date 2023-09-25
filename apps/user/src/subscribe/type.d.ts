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
  uniqueKey: TPlanUniqueKey;
};

type TPlanNames = 'Starter' | 'Pro' | 'Free';

type TPostUserCardRequest = {
  customer_uid: string;
  currency: string;
  pg_provider: string;
  card_name: string;
  card_number: string;
  bank_name: string;
  is_main: boolean;
};

type TPostUserCardResponse = {
  user_card: TUserCard[];
};

type TUserCard = {
  updatedAt: string;
  cardCode: string;
  id: number;
  userId: number;
  customerUid: string;
  currency: string;
  pgProvider: string;
  cardName: string;
  cardNumber: string;
  bankName: string;
  isMain: boolean;
  createdAt: string;
  deleted: boolean;
};

type TPortOneResponse = {
  apply_num: string;
  bank_name: string;
  buyer_addr: string;
  buyer_email: string;
  buyer_name: string;
  buyer_postcode: string;
  buyer_tel: string;
  card_name: string;
  card_number: string;
  card_quota: number;
  currency: string;
  custom_data: null; //이건 뭐지 ?
  customer_uid: string;
  imp_uid: string;
  merchant_uid: string;
  name: string;
  paid_amount: number;
  paid_at: number;
  pay_method: string;
  pg_provider: string;
  pg_tid: string;
  pg_type: string;
  receipt_url: string;
  status: string;
  success: boolean;
};

type TPlanUniqueKey =
  | 'KEYWORD ANALYSIS_FREE'
  | 'KEYWORD ANALYSIS_STARTER'
  | 'KEYWORD ANALYSIS_PRO';

type TPostPaymentsResponse = {
  payment: TPayments;
};

type TPayments = {
  id: number;
  userId: number;
  userCardId: number;
  merchantUid: string;
  payMethod: string;
  pgProvider: string;
  pgTid: string;
  cardCode: string;
  cardName: string;
  cardNumber: string;
  cardQuota: number;
  name: string;
  amount: number;
  currency: string;
  status: string;
  startedAt: number;
  paidAt: string;
  failedAt: string;
  cancelledAt: string;
  failReason: string;
  cancelReason: string;
  receiptUrl: string;
  createdAt: string;
  updatedAt: string;
};

type TUserCardInfo = { totalCount: number; userCards: TUserCard[] };
