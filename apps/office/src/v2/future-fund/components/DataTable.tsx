import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { FutureFundFilterAtom } from '@/v2/future-fund/atom';
import { getDataTableColumns } from '@/v2/future-fund/components/DataTableColumns';
import { useFutureFundList } from '@/v2/future-fund/hooks/future-fund.hook';

const Wrapper = styled.div`
  .ant-table-thead .ant-table-cell,
  .ant-table-row .ant-table-cell {
    height: 40px;
    padding: 10px 16px;
  }

  .ant-table-thead > tr > th {
    text-align: center;
  }
`;

export type FutureFundRecord = {
  key: string;
  fundGroupAt: string;
  price: number;
  applyPrice: number;
  accrualFees: number;
  accumulatedFees: number;
  repaymentFees: number;
  repaymentPrice: number;
};

export const DataTable = () => {
  const [filter] = useRecoilState(FutureFundFilterAtom);
  const listColumn: ColumnsType<FutureFundRecord> = getDataTableColumns();

  const { data, isInitialLoading: isLoading } = useFutureFundList({
    startAt: filter.termRange[0].format('YYYY-MM-DD'),
    endAt: filter.termRange[1].format('YYYY-MM-DD'),
    userId: filter.userId,
  });

  return (
    <>
      <div className='mx-auto w-[1280px]'>
        <Wrapper className='gm-h-full mt-[10px]'>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: '#F5F5F5',
                  headerColor: '#595959',
                  headerBorderRadius: 0,
                  colorText: '#595959',
                },
              },
            }}
          >
            <Table
              loading={isLoading}
              columns={listColumn}
              dataSource={(data || []).map((item) => ({
                ...item,
                key: item.fundGroupAt,
              }))}
              scroll={{ x: 'max-content' }}
              pagination={false}
              bordered
            ></Table>
          </ConfigProvider>
        </Wrapper>
      </div>
    </>
  );
};
