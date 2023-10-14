import { PATH } from '@/common/constants';

export const GNB_ROUTE = [
  { text: '블로그', path: PATH.BLOG, icon: 'Preview', child: [PATH.CONTENT] },
  { text: '요금 안내', path: PATH.PRICE, icon: 'Coin', child: [] },
];
