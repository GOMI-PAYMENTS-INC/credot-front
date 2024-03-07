import { Button, ConfigProvider, InputNumber, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { FutureFundFilterAtom } from '@/v2/future-fund/atom';
import { getDataTableColumns } from '@/v2/future-fund/components/DataTableColumns';
import {
  useFutureFundApply,
  useFutureFundList,
  useFutureFundRepayment,
} from '@/v2/future-fund/hooks/future-fund.hook';
import { useFutureFund } from '@/v2/prefund/hooks';

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
  const [applyPrice, setApplyPrice] = useState<number>(0);
  const [repaymentPrice, setRepaymentPrice] = useState<number>(0);
  const [repaymentFees, setRepaymentFees] = useState<number>(0);
  const [filter] = useRecoilState(FutureFundFilterAtom);
  const listColumn: ColumnsType<FutureFundRecord> = getDataTableColumns();
  const { data: todayFutureFundData } = useFutureFund(filter.userId);
  const {
    data,
    isInitialLoading: isLoading,
    refetch,
  } = useFutureFundList({
    startAt: filter.termRange[0].format('YYYY-MM-DD'),
    endAt: filter.termRange[1].format('YYYY-MM-DD'),
    userId: filter.userId,
  });
  const { refetch: refetchFutureFund } = useFutureFund(filter.userId);
  const { mutateAsync } = useFutureFundApply();
  const { mutateAsync: repaymentMutate } = useFutureFundRepayment();

  const handleApplyFutureFund = async () => {
    if (!filter.userId) {
      toast.error('신청할 업체를 선택해주세요.');
      return;
    }

    if (applyPrice <= 0 && repaymentFees <= 0 && repaymentPrice <= 0) {
      toast.error('신청할 금액을 입력하세요.');
      return;
    }

    if (applyPrice > 0) {
      if (applyPrice > (todayFutureFundData?.limit || 0)) {
        toast.error('신청 금액이 한도를 넘어갈 수 없습니다.');
        return;
      }

      const today = dayjs().format('YYYY-MM-DD');
      const res = await mutateAsync({
        date: today,
        userId: filter.userId,
        price: applyPrice,
      });
      if (res) {
        await refetch();
        await refetchFutureFund();
        setApplyPrice(0);
      }
    }

    if (repaymentFees > 0 || repaymentPrice > 0) {
      const today = dayjs().format('YYYY-MM-DD');
      const res = await repaymentMutate({
        date: today,
        userId: filter.userId,
        repaymentPrice,
        repaymentFees,
      });
      if (res) {
        await refetch();
        await refetchFutureFund();
        setRepaymentFees(0);
        setRepaymentPrice(0);
      }
    }
  };

  return (
    <>
      <div className='bg-grey-50 py-[30px]'>
        <div className='mx-auto mt-[83px] flex w-[1280px] flex-col'>
          <div className='mb-[25px] flex'>
            <div className='text-[14px] text-grey-700'>데이터 수동 입력</div>
            <div className='ml-[27px] text-S/Medium text-purple-500'>
              금일 발생한 입출금건에 대해서만 입력 가능합니다.
            </div>
          </div>
          <div className='flex'>
            <div className='mr-[12px] self-center text-S/Medium text-grey-800'>
              신청 금액
            </div>
            <div className='mr-[70px]'>
              <InputNumber
                placeholder='신청할 금액을 입력해주세요.'
                suffix='원'
                disabled={!filter.userId}
                value={applyPrice}
                onChange={(value) => setApplyPrice(value || 0)}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className='w-[260px]'
              />
            </div>
            <div className='mr-[12px] self-center text-S/Medium text-grey-800'>
              상환 금액
            </div>
            <div className='mr-[70px]'>
              <InputNumber
                placeholder='상환할 금액을 입력해주세요.'
                suffix='원'
                disabled={!filter.userId}
                value={repaymentPrice}
                onChange={(value) => setRepaymentPrice(value || 0)}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className='w-[260px]'
              />
            </div>
            <div className='mr-[12px] self-center text-S/Medium text-grey-800'>
              상환 수수료
            </div>
            <div className='mr-[70px]'>
              <InputNumber
                placeholder='상환할 수수료를 입력해주세요.'
                suffix='원'
                disabled={!filter.userId}
                value={repaymentFees}
                onChange={(value) => setRepaymentFees(value || 0)}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className='w-[260px]'
              />
            </div>
            <div>
              <Button disabled={!filter.userId} onClick={handleApplyFutureFund}>
                등록
              </Button>
            </div>
          </div>
        </div>
      </div>
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
