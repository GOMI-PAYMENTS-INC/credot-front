import { ColumnsType } from 'antd/es/table';

import { FutureFundRecord } from '@/v2/future-fund/components/DataTable';

const localeValueFormatter = (value: number) => value?.toLocaleString() || 0;

export const getDataTableColumns = (): ColumnsType<FutureFundRecord> => {
  return [
    {
      title: '날짜',
      width: 140,
      dataIndex: 'fundGroupAt',
      key: 'fundGroupAt',
      className: 'text-center',
    },
    {
      title: '사용중 금액',
      width: 148,
      dataIndex: 'price',
      key: 'price',
      className: 'text-right font-bold',
      render: localeValueFormatter,
    },
    {
      title: '신청 금액',
      width: 148,
      dataIndex: 'applyPrice',
      key: 'applyPrice',
      className: 'text-right font-bold',
      render: localeValueFormatter,
    },
    {
      title: '원금 상환 금액',
      width: 148,
      dataIndex: 'repaymentPrice',
      key: 'repaymentPrice',
      className: 'text-right font-bold',
      render: localeValueFormatter,
    },
    {
      title: '발생 수수료',
      width: 148,
      dataIndex: 'accrualFees',
      key: 'accrualFees',
      className: 'text-right font-bold',
      render: localeValueFormatter,
    },
    {
      title: '누적 수수료',
      width: 148,
      dataIndex: 'accumulatedFees',
      key: 'accumulatedFees',
      className: 'text-right font-bold',
      render: localeValueFormatter,
    },
    {
      title: '납부한 수수료',
      width: 148,
      dataIndex: 'repaymentFees',
      key: 'repaymentFees',
      className: 'text-right font-bold',
      render: localeValueFormatter,
    },
  ];
};
