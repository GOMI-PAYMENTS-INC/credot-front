import { Col, Row } from 'antd';
import { useRecoilState } from 'recoil';

import { useUserById } from '@/hooks';
import { PrefundFilterAtom } from '@/v2/prefund/atom';
import { useFutureFund } from '@/v2/prefund/hooks';

export const UserInfoSection = () => {
  const [filter] = useRecoilState(PrefundFilterAtom);
  const { data } = useUserById(filter.userId);
  const { data: futureFundData } = useFutureFund(filter.userId);

  return (
    <div className='w-full bg-grey-100 py-[20px]'>
      <div className='mx-auto flex w-[1280px] flex-col justify-start'>
        <div className='mb-[22px] text-M/Bold text-grey-800'>
          {data?.name || '업체를 선택해주세요.'}
        </div>
        <div className='ml-[46px]'>
          <Row className='mb-[27px]'>
            <Col className='' span={3}>
              <div className='w-[120px] text-right text-grey-800'>은행정보</div>
            </Col>
            <Col className=' flex' span={4}>
              <div className='mr-[26px] w-[80px] text-right text-S/Medium text-grey-800'>
                은행명
              </div>
              <div className='text-S/Regular text-grey-800'>{data?.bankName || '-'}</div>
            </Col>
            <Col className='flex' span={4}>
              <div className='mr-[26px] w-[80px] text-right text-S/Medium text-grey-800'>
                예금주
              </div>
              <div className='text-S/Regular text-grey-800'>
                {data?.bankAccountHolder || '-'}
              </div>
            </Col>
            <Col className='flex' span={4}>
              <div className='mr-[26px] w-[80px] text-right text-S/Medium text-grey-800'>
                계좌번호
              </div>
              <div className='text-S/Regular text-grey-800'>
                {data?.bankAccount || '-'}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className='' span={3}>
              <div className='w-[120px] text-right text-grey-800'>미래정산 이용 정보</div>
            </Col>
            <Col className=' flex' span={4}>
              <div className='mr-[26px] w-[80px] text-right text-S/Medium text-grey-800'>
                사용중 금액
              </div>
              <div className='text-S/Regular text-grey-800'>
                {(futureFundData?.futureFundPrice || 0).toLocaleString()}
              </div>
            </Col>
            <Col className='flex' span={4}>
              <div className='mr-[26px] w-[80px] text-right text-S/Medium text-grey-800'>
                누적 수수료
              </div>
              <div className='text-S/Regular text-grey-800'>
                {(futureFundData?.accumulatedFees || 0).toLocaleString()}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
