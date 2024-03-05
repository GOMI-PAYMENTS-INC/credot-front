import { Col, Descriptions, Divider, Row } from 'antd';
import { useRecoilState } from 'recoil';

import { useUserById } from '@/hooks';
import { PrefundFilterAtom } from '@/v2/prefund/atom';
import { useFutureFund } from '@/v2/prefund/hooks';

export const UserInfoSection = () => {
  const [filter] = useRecoilState(PrefundFilterAtom);
  const { data } = useUserById(filter.userId);

  return (
    <div className='w-full py-[20px]'>
      <div className='mx-auto flex w-[1280px] flex-col justify-start'>
        <div>
          <Descriptions
            title='사업자 정보'
            bordered
            items={[
              {
                key: '1',
                label: '상호',
                children: data?.name || '-',
              },
              {
                key: '2',
                label: '담당자',
                children: data?.managerName || '-',
              },
              {
                key: '3',
                label: '담당자 연락처',
                children: data?.phoneNumber || '-',
              },
            ]}
          />
          <br />
          <Descriptions
            title='입금 계좌 정보'
            bordered
            items={[
              {
                key: '1',
                label: '은행명',
                children: data?.bankName || '-',
              },
              {
                key: '2',
                label: '예금주',
                children: data?.bankAccountHolder || '-',
              },
              {
                key: '3',
                label: '계좌번호',
                children: data?.bankAccount || '-',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
