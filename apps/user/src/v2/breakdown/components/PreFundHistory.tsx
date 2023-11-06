import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { SearchDetailItemDto } from '@/generated-rest/api/front';
import { useSearchPeriodPrefundDetailHook } from '@/v2/breakdown/hooks/prefund.hook';
import { BreakdownDatePickerAtom } from '@/v2/breakdown/store/date.atom';

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

export const PreFundHistory = () => {
  const [dates] = useRecoilState(BreakdownDatePickerAtom);
  const { data: result, isLoading } = useSearchPeriodPrefundDetailHook({
    startAt: dates[0].format('YYYY-MM-DD'),
    endAt: dates[1].format('YYYY-MM-DD'),
  });
  const [expandableRows, setExpandableRows] = useState<readonly any[]>([]);
  const listColumn: ColumnsType<SearchDetailItemDto> = [
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
      onCell: (record, index) => {
        if (expandableRows.includes(record.key)) {
          return { rowSpan: record.rowSpan };
        }

        if (record.key === undefined) {
          return {
            rowSpan: 0,
          };
        }

        return {};
      },
      className: 'bg-grey-100 align-baseline',
    },
    {
      title: '매출 발생일',
      dataIndex: 'salesGroupAt',
      key: 'salesGroupAt',
      className: 'bg-grey-100 align-baseline',
      onCell: (record, index) => ({
        rowSpan: record.rowSpanForSalesGroupAt,
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
      render: (value, record) => {
        return (
          <span className={`${record.cardCompanyName === '전체' ? 'font-bold' : ''}`}>
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
      title: '카드 매출',
      dataIndex: 'approvalAmount',
      key: 'approvalAmount',
      className: 'text-right',
      render: (value, record) => {
        return (
          <span className={`${record.cardCompanyName === '전체' ? 'font-bold' : ''}`}>
            {localeValueFormatter(value)}
          </span>
        );
      },
    },
    {
      title: '카드사 수수료',
      dataIndex: 'commission',
      key: 'commission',
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

  const data: SearchDetailItemDto[] = result || [];
  return (
    <div className='mt-[70px]'>
      <div className='text-L/Bold text-grey-700'>상세 내역</div>
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
            columns={listColumn}
            dataSource={data}
            pagination={false}
            bordered
            loading={isLoading}
            expandable={{
              onExpandedRowsChange: (rows) => {
                setExpandableRows(rows);
              },
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? (
                  <DownOutlined
                    onClick={(e) => onExpand(record, e)}
                    className='mr-[7px] text-[11px]'
                  />
                ) : (
                  <RightOutlined
                    onClick={(e) => onExpand(record, e)}
                    className='mr-[7px] text-[11px]'
                  />
                ),
            }}
          />
        </ConfigProvider>
      </Wrapper>
    </div>
  );
};
