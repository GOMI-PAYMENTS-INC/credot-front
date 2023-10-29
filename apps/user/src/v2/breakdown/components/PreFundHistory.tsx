import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import styled from 'styled-components';

interface IPreFundDetailItem {
  key?: number;
  date: string;
  cardCompanyName: string;
  preFundPrice: number;
  status: string;
  rowSpan?: number;
  preFundDate: string;
  approvalAmount: number;
  commission: number;
  serviceCommission: number;
  setoff: number;
  children?: IPreFundDetailItem[];
}

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
  const [expandableRows, setExpandableRows] = useState<readonly any[]>([]);
  const listColumn: ColumnsType<IPreFundDetailItem> = [
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
      onCell: (record, index) => {
        if (expandableRows.includes(record.key)) {
          return { rowSpan: record.rowSpan };
        }

        if (!record.key) {
          return {
            rowSpan: 0,
          };
        }

        return {};
      },
      className: 'bg-grey-100 align-baseline',
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
      title: '선정산 일시',
      dataIndex: 'preFundDate',
      key: 'preFundDate',
      className: 'text-center',
    },
    {
      title: '전일 카드 매출',
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
      title: '전일 카드사 수수료',
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

  const data: IPreFundDetailItem[] = [
    {
      key: 1,
      date: '2023-10-26',
      cardCompanyName: '전체',
      rowSpan: 4,
      preFundPrice: 50000000,
      status: '입금 준비중',
      preFundDate: '2023-10-24 17:23:23',
      approvalAmount: 3000000,
      commission: 3000000,
      serviceCommission: 1000000,
      setoff: 3000000,
      children: [
        {
          date: '2023-10-26',
          cardCompanyName: '현대 카드',
          preFundPrice: 50000000,
          status: '입금 준비중',
          preFundDate: '2023-10-24 17:23:23',
          approvalAmount: 3000000,
          commission: 3000000,
          serviceCommission: 1000000,
          setoff: 3000000,
        },
        {
          date: '2023-10-26',
          cardCompanyName: '현대 카드',
          preFundPrice: 50000000,
          status: '입금 준비중',
          preFundDate: '2023-10-24 17:23:23',
          approvalAmount: 3000000,
          commission: 3000000,
          serviceCommission: 1000000,
          setoff: 3000000,
        },
        {
          date: '2023-10-26',
          cardCompanyName: '현대 카드',
          preFundPrice: 50000000,
          status: '입금 준비중',
          preFundDate: '2023-10-24 17:23:23',
          approvalAmount: 3000000,
          commission: 3000000,
          serviceCommission: 1000000,
          setoff: 3000000,
        },
      ],
    },
    {
      key: 2,
      date: '2023-10-25',
      cardCompanyName: '전체',
      rowSpan: 4,
      preFundPrice: 50000000,
      status: '입금 준비중',
      preFundDate: '2023-10-24 17:23:23',
      approvalAmount: 3000000,
      commission: 3000000,
      serviceCommission: 1000000,
      setoff: 3000000,
      children: [
        {
          date: '2023-10-25',
          cardCompanyName: '현대 카드',
          preFundPrice: 50000000,
          status: '입금 준비중',
          preFundDate: '2023-10-24 17:23:23',
          approvalAmount: 3000000,
          commission: 3000000,
          serviceCommission: 1000000,
          setoff: 3000000,
        },
        {
          date: '2023-10-25',
          cardCompanyName: '현대 카드',
          preFundPrice: 50000000,
          status: '입금 준비중',
          preFundDate: '2023-10-24 17:23:23',
          approvalAmount: 3000000,
          commission: 3000000,
          serviceCommission: 1000000,
          setoff: 3000000,
        },
        {
          date: '2023-10-25',
          cardCompanyName: '현대 카드',
          preFundPrice: 50000000,
          status: '입금 준비중',
          preFundDate: '2023-10-24 17:23:23',
          approvalAmount: 3000000,
          commission: 3000000,
          serviceCommission: 1000000,
          setoff: 3000000,
        },
      ],
    },
    {
      key: 3,
      date: '2023-10-24',
      cardCompanyName: '전체',
      rowSpan: 4,
      preFundPrice: 50000000,
      status: '입금 준비중',
      preFundDate: '2023-10-24 17:23:23',
      approvalAmount: 3000000,
      commission: 3000000,
      serviceCommission: 1000000,
      setoff: 3000000,
      children: [
        {
          date: '2023-10-24',
          cardCompanyName: '현대 카드',
          preFundPrice: 50000000,
          status: '입금 준비중',
          preFundDate: '2023-10-24 17:23:23',
          approvalAmount: 3000000,
          commission: 3000000,
          serviceCommission: 1000000,
          setoff: 3000000,
        },
        {
          date: '2023-10-24',
          cardCompanyName: '현대 카드',
          preFundPrice: 50000000,
          status: '입금 준비중',
          preFundDate: '2023-10-24 17:23:23',
          approvalAmount: 3000000,
          commission: 3000000,
          serviceCommission: 1000000,
          setoff: 3000000,
        },
        {
          date: '2023-10-24',
          cardCompanyName: '현대 카드',
          preFundPrice: 50000000,
          status: '입금 준비중',
          preFundDate: '2023-10-24 17:23:23',
          approvalAmount: 3000000,
          commission: 3000000,
          serviceCommission: 1000000,
          setoff: 3000000,
        },
      ],
    },
  ];
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
            columns={listColumn}
            dataSource={data}
            pagination={false}
            bordered
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
          ></Table>
        </ConfigProvider>
      </Wrapper>
    </div>
  );
};
