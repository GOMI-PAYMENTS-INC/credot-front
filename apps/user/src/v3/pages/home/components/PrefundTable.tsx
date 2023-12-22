import { Col, Row } from 'antd';

import { hyundaeCard } from '@/v3/pages/home/assets';

export const PrefundCard = () => {
  return (
    <Row className='mt-[14px] rounded-[8px] border border-grey-200 py-[16px]'>
      <Col span={6}>
        <img src={hyundaeCard} alt='현대카드' className='mx-auto' />
      </Col>
      <Col span={4} className='text-center text-grey-800'>
        2023.10.12
      </Col>
      <Col span={4} className='text-center text-grey-800'>
        +3일
      </Col>
      <Col span={6} className='text-center text-L/Medium'>
        999,999,999원
      </Col>
      <Col span={4} className='text-center text-purple-600'>
        선정산 완료
      </Col>
    </Row>
  );
};

export const PrefundTable = () => {
  return (
    <>
      <Row className='rounded-[8px] bg-[#F2F2FF] py-[16px]'>
        <Col span={6}></Col>
        <Col span={4} className='text-center'>
          매출 발생일
        </Col>
        <Col span={4} className='text-center'>
          정산 단축일
        </Col>
        <Col span={6} className='text-center'>
          선정산 금액
        </Col>
        <Col span={4} className='text-center'>
          상태
        </Col>
      </Row>
      <PrefundCard />
    </>
  );
};
