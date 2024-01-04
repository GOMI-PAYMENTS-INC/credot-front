import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import { ApplyRecord } from '@/v2/member/components/apply/DataTable';

const localeValueFormatter = (value: number) => value?.toLocaleString() || 0;

export const getDataTableColumns = (): ColumnsType<ApplyRecord> => {
  return [
    {
      title: '신청 일시',
      width: 240,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => dayjs(value).format('YYYY-MM-DD hh:mm:ss'),
      className: 'text-center',
    },
    {
      title: '상태',
      width: 100,
      dataIndex: 'status',
      key: 'status',
      className: 'text-center',
    },
    {
      title: '사업자구분',
      width: 142,
      dataIndex: 'companyType',
      key: 'companyType',
      className: 'text-center',
    },
    {
      title: '상호',
      width: 200,
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: '업종',
      width: 142,
      dataIndex: 'industryType',
      key: 'industryType',
      className: 'text-center',
    },
    {
      title: '주소',
      width: 300,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '월 평균 매출',
      width: 180,
      dataIndex: 'monthlySales',
      key: 'monthlySales',
      className: 'text-right',
    },
    {
      title: '직함',
      width: 124,
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: '담당자명',
      width: 124,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '연락처',
      width: 148,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '이메일',
      width: 124,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '관심 서비스',
      width: 180,
      dataIndex: 'interestedService',
      key: 'interestedService',
    },
    {
      title: '마케팅 수신 여부',
      width: 140,
      dataIndex: 'marketingAgree',
      key: 'marketingAgree',
      className: 'text-center',
      render: (value) => (value ? 'O' : 'X'),
    },
  ];
};
