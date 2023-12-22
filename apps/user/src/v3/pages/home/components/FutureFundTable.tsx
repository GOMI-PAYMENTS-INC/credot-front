import { Col, Row } from 'antd';

export const FutureFundTable = () => {
  return (
    <>
      <Row className='rounded-[8px] bg-[#F2F2FF] py-[16px]'>
        <Col span={6} className='text-center'>
          사용중 금액
        </Col>
        <Col span={6} className='text-center'>
          신청 금액
        </Col>
        <Col span={6} className='text-center'>
          상환 금액
        </Col>
        <Col span={6} className='text-center'>
          상환 후 금액
        </Col>
      </Row>
      <Row className='mt-[14px] rounded-[8px] border border-grey-200 py-[16px]'>
        <Col span={6} className='text-center text-grey-800'>
          50,000,000원
        </Col>
        <Col span={6} className='text-center text-grey-800'>
          5,000,000원
        </Col>
        <Col span={6} className='text-center text-L/Medium'>
          -4,000,000원
        </Col>
        <Col span={6} className='text-center text-purple-600'>
          46,000,000원
        </Col>
      </Row>
      <Row className='mt-[14px] rounded-[8px] bg-[#F2F2FF] py-[16px]'>
        <Col span={6} className='text-center'>
          미납 수수료
        </Col>
        <Col span={6} className='text-center'>
          발생 수수료
        </Col>
        <Col span={6} className='text-center'>
          납부한 수수료
        </Col>
        <Col span={6} className='text-center'>
          납부할 수수료
        </Col>
      </Row>
      <Row className='mt-[14px] rounded-[8px] border border-grey-200 py-[16px]'>
        <Col span={6} className='text-center text-grey-800'>
          150,000원
        </Col>
        <Col span={6} className='text-center text-grey-800'>
          50,000원
        </Col>
        <Col span={6} className='text-center text-L/Medium'>
          200,000원
        </Col>
        <Col span={6} className='text-center text-purple-600'>
          0원
        </Col>
      </Row>
    </>
  );
};
