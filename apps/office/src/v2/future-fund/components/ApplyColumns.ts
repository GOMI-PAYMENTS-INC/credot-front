import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import { FutureFundApplyRecord } from '@/v2/future-fund';

const localeValueFormatter = (value: number) => value?.toLocaleString() || 0;

export const getApplyColumns = (): ColumnsType<FutureFundApplyRecord> => {
  return [
    {
      title: '거래 ID',
      width: 124,
      dataIndex: 'id',
      key: 'id',
      className: 'text-center',
    },
    {
      title: '승인 요청 일시',
      width: 180,
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'text-center',
      render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '가맹점',
      width: 140,
      dataIndex: 'name',
      key: 'name',
      className: 'text-center',
    },
    {
      title: '가맹점 한도',
      width: 140,
      dataIndex: 'limit',
      key: 'limit',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '사용중 금액',
      width: 140,
      dataIndex: 'futureFundPrice',
      key: 'futureFundPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '요청 금액',
      width: 140,
      dataIndex: 'applyPrice',
      key: 'applyPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '최근 7일 평균 매출',
      width: 140,
      dataIndex: 'avgSalesPrice',
      key: 'avgSalesPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '최근 7일 평균 매출 증감율(%)',
      width: 220,
      dataIndex: 'avgSalesPriceRate',
      key: 'avgSalesPriceRate',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '미래정산 이용 수',
      width: 140,
      dataIndex: 'count',
      key: 'count',
      className: 'text-right',
      render: localeValueFormatter,
    },
  ];
};
