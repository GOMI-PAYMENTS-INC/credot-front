import { Col, Descriptions, Row } from 'antd';

export const UserInfoSection = () => {
  return (
    <div className='w-full bg-grey-100 py-[20px]'>
      <div className='mx-auto flex w-[1280px] flex-col justify-start'>
        <div className='mb-[22px] text-M/Bold text-grey-800'>주식회사 고미 인사이트</div>
        <div className='ml-[46px]'>
          <Row className='mb-[27px]'>
            <Col className='' span={3}>
              <div className='w-[120px] text-right text-grey-800'>은행정보</div>
            </Col>
            <Col className=' flex' span={4}>
              <div className='mr-[26px] w-[80px] text-right text-S/Medium text-grey-800'>
                은행명
              </div>
              <div className='text-S/Regular text-grey-800'>농협은행</div>
            </Col>
            <Col className='flex' span={4}>
              <div className='mr-[26px] w-[80px] text-right text-S/Medium text-grey-800'>
                예금주
              </div>
              <div className='text-S/Regular text-grey-800'>농협은행</div>
            </Col>
            <Col className='flex' span={4}>
              <div className='mr-[26px] w-[80px] text-right text-S/Medium text-grey-800'>
                계좌번호
              </div>
              <div className='text-S/Regular text-grey-800'>농협은행</div>
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
              <div className='text-S/Regular text-grey-800'>1,000,000</div>
            </Col>
            <Col className='flex' span={4}>
              <div className='mr-[26px] w-[80px] text-right text-S/Medium text-grey-800'>
                누적 수수료
              </div>
              <div className='text-S/Regular text-grey-800'>1,000</div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
