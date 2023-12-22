import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

import { hyundaeCard } from '@/v3/pages/home/assets';

export const PrefundCard = () => {
  const [open, setOpen] = useState<boolean>(false);
  if (isMobile) {
    return (
      <>
        <Row
          className={`mx-[20px] mt-[14px]  border border-grey-200 bg-white py-[16px] ${
            open ? 'rounded-tl-[8px] rounded-tr-[8px] bg-grey-200' : 'rounded-[8px]'
          } overflow-hidden transition-all delay-150 duration-300`}
        >
          <Col span={10}>
            <img src={hyundaeCard} alt='현대카드' className='mx-auto' />
          </Col>
          <Col span={10} className='text-center text-M/Medium'>
            999,999,999원
          </Col>
          <Col span={4} className='text-center text-grey-500'>
            {!open ? (
              <DownOutlined className='cursor-pointer' onClick={() => setOpen(true)} />
            ) : (
              <UpOutlined className='cursor-pointer' onClick={() => setOpen(false)} />
            )}
          </Col>
        </Row>
        <div
          className={`mx-[20px] mt-[-1px] rounded-bl-[8px] rounded-br-[8px] border-grey-200 px-[16px] ${
            open ? 'h-[156px] border-l border-r border-b py-[16px]' : 'h-0 border-0'
          } overflow-hidden transition-all delay-150 duration-300`}
        >
          <div className='flex justify-between'>
            <div className='text-left text-S/Medium text-[#787884]'>매출 발생일</div>
            <div className='text-right text-S/Medium text-grey-900'>2023.10.12</div>
          </div>
          <Divider className='my-[16px]' />
          <div className='flex justify-between'>
            <div className='text-left text-S/Medium text-[#787884]'>정산 단축일</div>
            <div className='text-right text-S/Medium text-grey-900'>+3일</div>
          </div>
          <Divider className='my-[16px]' />
          <div className='flex justify-between'>
            <div className='text-left text-S/Medium text-[#787884]'>상태</div>
            <div className='text-right text-S/Medium text-purple-600'>선정산 완료</div>
          </div>
        </div>
      </>
    );
  }

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
      {!isMobile && (
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
      )}
      <PrefundCard />
      <PrefundCard />
      <PrefundCard />
      <PrefundCard />
      <PrefundCard />
    </>
  );
};
