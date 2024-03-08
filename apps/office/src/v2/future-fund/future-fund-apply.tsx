import { Button, ConfigProvider, Table, Tabs } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

import { Default } from '@/common/layouts';
import { FutureFundApplyDto, FutureFundStatus } from '@/generated-rest/api/front';
import { getApplyColumns } from '@/v2/future-fund/components/ApplyColumns';
import { Header } from '@/v2/future-fund/components/header';
import {
  useFutureFundApplyList,
  useUpdateFutureFundApplyStatus,
} from '@/v2/future-fund/hooks/future-fund.hook';

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

export type FutureFundApplyRecord = FutureFundApplyDto & { key: number };

export const FutureFundApply = () => {
  const [selectedRows, setSelectedRows] = useState<FutureFundApplyRecord[]>([]);
  const [tab, setTab] = useState<string>('READY');
  /* 신청 내역 가져오기 */
  const { data, isLoading, refetch } = useFutureFundApplyList(tab);
  /* 신청 내역 가져오기 */

  /* 신청 상태 변경하기 */
  const { mutateAsync: updateStatus, isLoading: isUpdateLoading } =
    useUpdateFutureFundApplyStatus();
  /* 신청 상태 변경하기 */

  const amount = selectedRows.reduce((acc, cur) => acc + cur.applyPrice, 0);
  return (
    <Default useGap>
      <div className='mx-auto w-[1280px]'>
        <Header title='승인 내역' />
        <Tabs
          className='mt-6'
          activeKey={tab}
          onChange={(key) => setTab(key)}
          type='card'
          items={[
            {
              label: `승인 대기`,
              key: 'READY',
            },
            {
              label: `승인 완료`,
              key: 'DONE',
            },
            {
              label: `승인 거절`,
              key: 'REJECT',
            },
            {
              label: `요청 취소`,
              key: 'CANCEL',
            },
          ]}
        />

        {tab === 'READY' && (
          <div className='flex justify-between'>
            <div className='flex'>
              <div className='flex items-center'>
                <div className='mr-[20px] text-S/Regular text-grey-700'>
                  신청 금액 합계
                </div>
                <div className='text-XL/Bold text-purple-500'>
                  {amount.toLocaleString()}원
                </div>
              </div>
            </div>
            <div className='flex'>
              <Button
                disabled={!selectedRows.length}
                loading={isUpdateLoading}
                className='mr-1'
                onClick={async () => {
                  await updateStatus({
                    ids: selectedRows.map((item) => item.id),
                    status: FutureFundStatus.DONE,
                  });
                  setSelectedRows([]);
                  await refetch();
                }}
              >
                승인 완료
              </Button>
              <Button
                disabled={!selectedRows.length}
                loading={isUpdateLoading}
                onClick={async () => {
                  await updateStatus({
                    ids: selectedRows.map((item) => item.id),
                    status: FutureFundStatus.REJECT,
                  });
                  setSelectedRows([]);
                  await refetch();
                }}
              >
                거절
              </Button>
            </div>
          </div>
        )}

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
                columns={getApplyColumns()}
                rowSelection={{
                  type: 'checkbox',
                  selectedRowKeys: selectedRows.map((row) => row.key),
                  onChange: (
                    selectedRowKeys: React.Key[],
                    selectedRows: FutureFundApplyRecord[],
                  ) => {
                    setSelectedRows(selectedRows);
                  },
                }}
                dataSource={
                  data?.map((item) => ({
                    ...item,
                    key: item.id,
                  })) || []
                }
                scroll={{ x: 'max-content' }}
                pagination={false}
                bordered
              ></Table>
            </ConfigProvider>
          </Wrapper>
        </div>
      </div>
    </Default>
  );
};
