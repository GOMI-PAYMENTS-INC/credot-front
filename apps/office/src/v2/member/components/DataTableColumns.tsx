import { ColumnsType } from 'antd/es/table';

import { PrefundRecord } from '@/v2/prefund/components/DataTable';

const localeValueFormatter = (value: number) => value?.toLocaleString() || 0;

export const getDataTableColumns = (): ColumnsType<PrefundRecord> => {
  return [
    {
      title: '신청 일시',
      width: 140,
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'text-center',
    },
    {
      title: '상태',
      width: 186,
      dataIndex: 'status',
      key: 'status',
      className: 'text-center',
    },
    {
      title: '정산금 조회 금액',
      width: 142,
      dataIndex: 'prefund',
      key: 'prefund',
      className: 'text-center',
    },
    {
      title: '상호',
      width: 124,
      dataIndex: 'companyName',
      key: 'companyName',
      className: 'text-center',
    },
    {
      title: '연락처',
      width: 148,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      className: 'text-right font-bold',
      render: localeValueFormatter,
    },
    {
      title: '이메일',
      width: 124,
      dataIndex: 'email',
      key: 'email',
      className: 'text-center',
    },
  ];
};
