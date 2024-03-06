import { ColumnsType } from 'antd/es/table';

import { PrefundRecord } from '@/v2/prefund/components/DataTable';

const localeValueFormatter = (value: number) => value?.toLocaleString() || 0;

export const getApplyColumns = (): ColumnsType<PrefundRecord> => {
  return [
    {
      title: '승인 요청 일시',
      width: 140,
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'text-center',
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
      dataIndex: 'price',
      key: 'price',
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
      title: '미래정산 이용 수',
      width: 140,
      dataIndex: 'count',
      key: 'count',
      className: 'text-right',
      render: localeValueFormatter,
    },
  ];
};
