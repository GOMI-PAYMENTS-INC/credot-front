import { ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

import { TodayPreFundDto } from '@/generated-rest/api/front';
import { useTodayPrefundDetailHook } from '@/v2/breakdown/hooks/prefund.hook';

const Wrapper = styled.div`
  .ant-table-thead .ant-table-cell:nth-child(3) {
    background-color: #ffa378 !important;
  }

  .ant-table-thead .ant-table-cell:nth-child(6) {
    background-color: #8c8c8c !important;
  }

  .ant-table-thead .ant-table-cell,
  .ant-table-row .ant-table-cell {
    height: 40px;
    padding: 10px 16px;
  }

  .ant-table-thead > tr > th {
    text-align: center;
  }
`;

const localeValueFormatter = (value: number) => value?.toLocaleString() || 0;

export const TodayPreFundDetail = () => {
  const { data: details, isLoading } = useTodayPrefundDetailHook();
  const listColumn: ColumnsType<TodayPreFundDto> = [
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
      className: 'bg-grey-100 align-baseline',
      onCell: (record, index) => ({
        rowSpan: record.rowSpan,
      }),
    },
    {
      title: '카드사',
      dataIndex: 'cardCompanyName',
      key: 'cardCompanyName',
      className: 'bg-grey-100 text-center',
    },
    {
      title: '선정산 금액',
      dataIndex: 'preFundPrice',
      key: 'preFundPrice',
      className: 'text-right text-red-600',
      render: (value, record, index) => {
        return (
          <span className={`${index === 0 ? 'font-bold' : ''}`}>
            {localeValueFormatter(value)}
          </span>
        );
      },
    },
    {
      title: '처리 상태',
      dataIndex: 'status',
      key: 'status',
      className: 'text-center',
    },
    {
      title: '선정산 일시',
      dataIndex: 'preFundDate',
      key: 'preFundDate',
      className: 'text-center',
    },
    {
      title: '전일 카드 매출',
      dataIndex: 'preSalesPrice',
      key: 'preSalesPrice',
      className: 'text-right',
      render: (value, record, index) => {
        return (
          <span className={`${index === 0 ? 'font-bold' : ''}`}>
            {localeValueFormatter(value)}
          </span>
        );
      },
    },
    {
      title: '전일 카드사 수수료',
      dataIndex: 'preCardCommission',
      key: 'preCardCommission',
      className: 'text-right text-blue-600',
      render: localeValueFormatter,
    },
    {
      title: '서비스 수수료',
      dataIndex: 'serviceCommission',
      key: 'serviceCommission',
      className: 'text-right text-blue-600',
      render: localeValueFormatter,
    },
    {
      title: '과정산 금액',
      dataIndex: 'setoff',
      key: 'setoff',
      className: 'text-right text-blue-600',
      render: localeValueFormatter,
    },
  ];

  const data: TodayPreFundDto[] = details || [];
  return (
    <div className='mt-[90px]'>
      <div className='text-XL/Bold'>상세 내역</div>
      <Wrapper className='gm-h-full mt-[10px]'>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#bfbfbf',
                headerColor: 'white',
                headerBorderRadius: 0,
                colorText: '#595959',
              },
            },
          }}
        >
          <Table
            loading={isLoading}
            columns={listColumn}
            dataSource={data}
            pagination={false}
            bordered
            scroll={{ y: 240 }}
          ></Table>
        </ConfigProvider>
      </Wrapper>
    </div>
  );
};
