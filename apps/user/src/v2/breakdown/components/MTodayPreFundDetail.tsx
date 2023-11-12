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

export const MTodayPreFundDetail = () => {
  const { data: details, isLoading } = useTodayPrefundDetailHook();
  const listColumn: ColumnsType<TodayPreFundDto> = [
    {
      title: '매출 발생일',
      dataIndex: 'salesGroupAt',
      width: 171,
      key: 'salesGroupAt',
      className: 'bg-grey-100 align-baseline',
      onCell: (record, index) => ({
        rowSpan: record.rowSpanForSalesGroupAt,
      }),
    },
    {
      title: '카드사',
      dataIndex: 'cardCompanyName',
      width: 150,
      key: 'cardCompanyName',
      className: 'bg-grey-100 text-center',
    },
    {
      title: '선정산 금액',
      width: 150,
      dataIndex: 'preFundPrice',
      key: 'preFundPrice',
      className: 'text-right text-red-600',
      render: localeValueFormatter,
    },
    {
      title: '처리 상태',
      width: 150,
      dataIndex: 'status',
      key: 'status',
      className: 'text-center',
    },
    {
      title: '카드 매출',
      width: 150,
      dataIndex: 'preSalesPrice',
      key: 'preSalesPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '카드사 수수료',
      width: 150,
      dataIndex: 'preCardCommission',
      key: 'preCardCommission',
      className: 'text-right text-blue-600',
      render: localeValueFormatter,
    },
    {
      title: '서비스 수수료',
      width: 150,
      dataIndex: 'serviceCommission',
      key: 'serviceCommission',
      className: 'text-right text-blue-600',
      render: localeValueFormatter,
    },
    {
      title: '과정산 금액',
      width: 150,
      dataIndex: 'setoff',
      key: 'setoff',
      className: 'text-right text-blue-600',
      render: localeValueFormatter,
    },
  ];

  const data: TodayPreFundDto[] = details || [];
  return (
    <div className='mt-[50px] px-[20px]'>
      <div className='text-M/Bold text-grey-700'>상세 내역</div>
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
            scroll={{
              x: 'max-content',
            }}
            pagination={false}
            bordered
          ></Table>
        </ConfigProvider>
      </Wrapper>
    </div>
  );
};
