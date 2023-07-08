export enum GRADE {
  FREE = 'Free',
  STARTER = 'Starter',
  PRO = 'Pro',
  ENTERPRISE = 'Enterprise',
}

export const PLANS = [
  {
    grade: GRADE.FREE,
    subscribe: '키워드 분석 최대 5회',
    price: '무료',
    button: '무료로 사용하기',
  },
  {
    grade: GRADE.STARTER,
    subscribe: '키워드 분석 최대 50회',
    price: '15,000원',
    button: '구독하기',
  },
  {
    grade: GRADE.PRO,
    subscribe: '키워드 분석 최대 200회',
    price: '30,000원',
    button: '구독하기',
  },
  {
    grade: GRADE.ENTERPRISE,
    subscribe: '키워드 분석 최대 150회 초과',
    price: '$50~',
    button: '채팅 문의하기',
  },
];
