import { Button, Descriptions, Divider } from 'antd';
import { useRecoilState } from 'recoil';

import { useUserById } from '@/hooks';
import { FutureFundFilterAtom } from '@/v2/future-fund/atom';
import { LimitChangeModal } from '@/v2/future-fund/components/LimitChangeModal';
import { useFutureFund } from '@/v2/prefund/hooks';

export const UserInfoSection = () => {
  const [filter] = useRecoilState(FutureFundFilterAtom);
  const { data } = useUserById(filter.userId);
  const { data: futureFundData } = useFutureFund(filter.userId);

  return (
    <div className='w-full bg-grey-100 py-[20px]'>
      <div className='mx-auto flex w-[1280px] flex-col justify-start'>
        <div className='ml-[46px]'>
          <Descriptions
            size='small'
            title='사업자 정보'
            bordered
            items={[
              {
                key: '1',
                label: '상호명',
                children: data?.name || '',
                labelStyle: { width: '120px' },
              },
              {
                key: '2',
                label: '담당자',
                children: data?.managerName || '',
                labelStyle: { width: '120px' },
              },
              {
                key: '3',
                label: '담당자 연락처',
                children: data?.phoneNumber || '',
                labelStyle: { width: '140px' },
              },
            ]}
          />

          <Divider />

          <Descriptions
            size='small'
            title='입금 계좌 정보'
            bordered
            items={[
              {
                key: '1',
                label: '은행명',
                children: data?.bankName || '',
                labelStyle: { width: '120px' },
              },
              {
                key: '2',
                label: '예금주',
                children: data?.bankAccountHolder || '',
                labelStyle: { width: '120px' },
              },
              {
                key: '3',
                label: '계좌번호',
                children: data?.bankAccount || '',
                labelStyle: { width: '140px' },
              },
            ]}
          />

          <Divider />

          <Descriptions
            size='small'
            title='미래정산 이용 정보'
            bordered
            items={[
              {
                key: '1',
                label: '가맹점 한도',
                children: (
                  <div className='flex w-full justify-between'>
                    <div>{`${data?.limitFutureFund?.toLocaleString() || 0}원`}</div>
                    <div>{data?.id && <LimitChangeModal userId={data?.id} />}</div>
                  </div>
                ),
                labelStyle: { width: '120px' },
              },
              {
                key: '2',
                label: '사용중 + 신청금액',
                children: `${(
                  (data?.limitFutureFund || 0) - (futureFundData?.limit || 0)
                ).toLocaleString()}원`,
                labelStyle: { width: '160px' },
              },
              {
                key: '3',
                label: '신청 가능 금액',
                children: `${futureFundData?.limit?.toLocaleString() || 0}원`,
                labelStyle: { width: '140px' },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
