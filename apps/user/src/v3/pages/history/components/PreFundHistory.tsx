import { FileSearchOutlined } from '@ant-design/icons';
import { ConfigProvider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { isMobile } from 'react-device-detect';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { SearchDetailItemDto2 } from '@/generated-rest/api/front';
import { useSearchPeriodPrefundDetailHook } from '@/v3/pages/history/hooks';
import { HistoryDatePickerAtom } from '@/v3/pages/history/store/date.atom';

const Wrapper = styled.div`
  .ant-table-thead .ant-table-cell:nth-child(6),
  .ant-table-thead .ant-table-cell:nth-child(9) {
    background-color: #f6ecff !important;
    color: #595959;
  }

  .ant-table-tbody .ant-table-cell:nth-child(6),
  .ant-table-tbody .ant-table-cell:nth-child(9) {
    background-color: #fcf8ff !important;
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
  const [dates] = useRecoilState(HistoryDatePickerAtom);
  const { data: result, isLoading } = useSearchPeriodPrefundDetailHook({
    startAt: dates[0].format('YYYY-MM-DD'),
    endAt: dates[1].format('YYYY-MM-DD'),
  });
  const listColumn: ColumnsType<SearchDetailItemDto2> = [
    {
      title: '',
      width: 133,
      dataIndex: 'prefundGroupAt',
      key: 'prefundGroupAt',
      className: 'text-center',
      render: (value: string) => dayjs(value).format('YYYY.MM.DD'),
    },
    {
      title: '전일 매출',
      width: 133,
      dataIndex: 'salesPrice',
      key: 'salesPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '카드사 수수료',
      width: 133,
      dataIndex: 'cardCommission',
      key: 'cardCommission',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '서비스 수수료',
      width: 133,
      dataIndex: 'serviceCommission',
      key: 'serviceCommission',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '과정산 금액',
      width: 133,
      dataIndex: 'setoff',
      key: 'setoff',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '선정산금',
      width: 133,
      dataIndex: 'prefundPrice',
      key: 'prefundPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '미래정산 수수료',
      width: 133,
      dataIndex: 'repaymentFees',
      key: 'repaymentFees',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '미래정산 상환금',
      width: 133,
      dataIndex: 'repaymentPrice',
      key: 'repaymentPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '입금액',
      width: 133,
      dataIndex: 'depositPrice',
      key: 'depositPrice',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '미래 정산 신청',
      width: 133,
      dataIndex: 'applyFutureFund',
      key: 'applyFutureFund',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '사용중 미래 정산금',
      width: 166,
      dataIndex: 'futureFund',
      key: 'futureFund',
      className: 'text-right',
      render: localeValueFormatter,
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      className: 'text-right',
      render: (_, record) => {
        return (
          <div className='cursor-pointer rounded-[4px] border border-[#B06BE8] bg-[#FBF7FF] px-[8px] py-[4px] text-[#B06BE8]'>
            <FileSearchOutlined />
          </div>
        );
      },
    },
  ];

  const data: SearchDetailItemDto2[] = result || [];

  return (
    <div className={isMobile ? '' : 'mt-[70px]'}>
      <div className='text-L/Bold text-grey-800'>상세 내역</div>
      <Wrapper className='gm-h-full mt-[10px]'>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#F8F8F8',
                headerColor: '#595959',
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
            scroll={{
              x: 'max-content',
            }}
            loading={isLoading}
          />
        </ConfigProvider>
      </Wrapper>
    </div>
  );
};
