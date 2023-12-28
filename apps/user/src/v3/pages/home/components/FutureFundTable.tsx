import { Col, Divider, Row } from 'antd';
import { isMobile } from 'react-device-detect';

import { equal, plus, subtract } from '@/v3/pages/home/assets';
import { useTodayFutureFundHook } from '@/v3/pages/home/hooks/future-fund.hook';
import { localeString, number } from '@/v3/util';

export type FutureFundTableType = {
  futureFundPrice: number;
  applyPrice: number;
  repaymentPrice: number;
  accrualFees: number;
  accumulatedFees: number;
  repaymentFees: number;
};

export const MFutureFundTable = ({
  futureFundPrice,
  applyPrice,
  repaymentPrice,
  accrualFees,
  accumulatedFees,
  repaymentFees,
}: FutureFundTableType) => {
  return (
    <>
      <Row className='rounded-[8px] border border-grey-200'>
        <Col
          span={12}
          className='rounded-bl-[8px] rounded-tl-[8px] bg-[#F2F2FF] py-[16px] text-center'
        >
          사용중 금액
        </Col>
        <Col span={4} className='py-[16px] text-center' />
        <Col
          span={8}
          className='rounded-br-[8px] rounded-tr-[8px] py-[16px] pr-[16px] text-right'
        >
          {localeString(futureFundPrice)}원
        </Col>
      </Row>

      <Row className='mt-[12px] rounded-[8px] border border-grey-200'>
        <Col
          span={12}
          className='rounded-bl-[8px] rounded-tl-[8px] bg-[#F2F2FF] py-[16px] text-center'
        >
          신청 금액
        </Col>
        <Col span={4} className='py-[16px] text-center'>
          <img src={plus} alt='+' className='mx-auto' />
        </Col>
        <Col
          span={8}
          className='rounded-br-[8px] rounded-tr-[8px] py-[16px] pr-[16px] text-right'
        >
          {localeString(applyPrice)}원
        </Col>
      </Row>

      <Row className='mt-[12px] rounded-[8px] border border-grey-200'>
        <Col
          span={12}
          className='rounded-bl-[8px] rounded-tl-[8px] bg-[#F2F2FF] py-[16px] text-center'
        >
          상환 금액
        </Col>
        <Col span={4} className='py-[16px] text-center'>
          <img src={subtract} alt='-' className='mx-auto' />
        </Col>
        <Col
          span={8}
          className='rounded-br-[8px] rounded-tr-[8px] py-[16px] pr-[16px] text-right'
        >
          {localeString(repaymentPrice)}원
        </Col>
      </Row>

      <Row className='mt-[12px] rounded-[8px] border border-grey-200'>
        <Col
          span={12}
          className='rounded-bl-[8px] rounded-tl-[8px] bg-[#F2F2FF] py-[16px] text-center'
        >
          상환 후 금액
        </Col>
        <Col span={4} className='py-[16px] text-center'>
          <img src={equal} alt='=' className='mx-auto' />
        </Col>
        <Col
          span={8}
          className='rounded-br-[8px] rounded-tr-[8px] py-[16px] pr-[16px] text-right'
        >
          {localeString(futureFundPrice + applyPrice + repaymentPrice)}원
        </Col>
      </Row>

      <Divider />

      <Row className='mt-[12px] rounded-[8px] border border-grey-200'>
        <Col
          span={12}
          className='rounded-bl-[8px] rounded-tl-[8px] bg-[#F2F2FF] py-[16px] text-center'
        >
          미납 수수료
        </Col>
        <Col span={4} className='py-[16px] text-center'></Col>
        <Col
          span={8}
          className='rounded-br-[8px] rounded-tr-[8px] py-[16px] pr-[16px] text-right'
        >
          {localeString(accumulatedFees - accrualFees)}원
        </Col>
      </Row>

      <Row className='mt-[12px] rounded-[8px] border border-grey-200'>
        <Col
          span={12}
          className='rounded-bl-[8px] rounded-tl-[8px] bg-[#F2F2FF] py-[16px] text-center'
        >
          발생 수수료
        </Col>
        <Col span={4} className='py-[16px] text-center'>
          <img src={plus} alt='+' className='mx-auto' />
        </Col>
        <Col
          span={8}
          className='rounded-br-[8px] rounded-tr-[8px] py-[16px] pr-[16px] text-right'
        >
          {localeString(accrualFees)}원
        </Col>
      </Row>

      <Row className='mt-[12px] rounded-[8px] border border-grey-200'>
        <Col
          span={12}
          className='rounded-bl-[8px] rounded-tl-[8px] bg-[#F2F2FF] py-[16px] text-center'
        >
          납부한 수수료
        </Col>
        <Col span={4} className='py-[16px] text-center'>
          <img src={subtract} alt='-' className='mx-auto' />
        </Col>
        <Col
          span={8}
          className='rounded-br-[8px] rounded-tr-[8px] py-[16px] pr-[16px] text-right'
        >
          {localeString(repaymentFees)}원
        </Col>
      </Row>

      <Row className='mt-[12px] rounded-[8px] border border-grey-200'>
        <Col
          span={12}
          className='rounded-bl-[8px] rounded-tl-[8px] bg-[#F2F2FF] py-[16px] text-center'
        >
          납부할 수수료
        </Col>
        <Col span={4} className='py-[16px] text-center'>
          <img src={equal} alt='=' className='mx-auto' />
        </Col>
        <Col
          span={8}
          className='rounded-br-[8px] rounded-tr-[8px] py-[16px] pr-[16px] text-right'
        >
          {localeString(accumulatedFees + repaymentFees)}원
        </Col>
      </Row>
    </>
  );
};

export const PCFutureFundTable = ({
  futureFundPrice,
  applyPrice,
  repaymentPrice,
  accrualFees,
  accumulatedFees,
  repaymentFees,
}: FutureFundTableType) => {
  return (
    <>
      <Row className='rounded-[8px] bg-[#F2F2FF] py-[16px]'>
        <Col span={5} className='text-center'>
          사용중 금액
        </Col>
        <Col span={1} className='text-center' />
        <Col span={6} className='text-center'>
          신청 금액
        </Col>
        <Col span={1} className='text-center' />
        <Col span={5} className='text-center'>
          상환 금액
        </Col>
        <Col span={1} className='text-center' />
        <Col span={5} className='text-center'>
          상환 후 금액
        </Col>
      </Row>
      <Row className='mt-[14px] rounded-[8px] border border-grey-200 py-[16px]'>
        <Col span={5} className='text-center'>
          {localeString(futureFundPrice)}원
        </Col>
        <Col span={1} className='self-center text-center'>
          <img src={plus} alt='+' />
        </Col>
        <Col span={6} className='text-center text-L/Medium'>
          {localeString(applyPrice)}원
        </Col>
        <Col span={1} className='self-center text-center'>
          <img src={subtract} alt='-' />
        </Col>
        <Col span={5} className='text-center'>
          {localeString(repaymentPrice)}원
        </Col>
        <Col span={1} className='self-center text-center'>
          <img src={equal} alt='=' />
        </Col>
        <Col span={5} className='text-center'>
          {localeString(futureFundPrice + applyPrice + repaymentPrice)}원
        </Col>
      </Row>
      <Row className='mt-[14px] rounded-[8px] bg-[#F2F2FF] py-[16px]'>
        <Col span={5} className='text-center'>
          미납 수수료
        </Col>
        <Col span={1} className='text-center' />
        <Col span={6} className='text-center'>
          발생 수수료
        </Col>
        <Col span={1} className='text-center' />
        <Col span={5} className='text-center'>
          납부한 수수료
        </Col>
        <Col span={1} className='text-center' />
        <Col span={5} className='text-center'>
          납부할 수수료
        </Col>
      </Row>
      <Row className='mt-[14px] rounded-[8px] border border-grey-200 py-[16px]'>
        <Col span={5} className='text-center'>
          {localeString(accumulatedFees - accrualFees)}원
        </Col>
        <Col span={1} className='self-center text-center'>
          <img src={plus} alt='+' />
        </Col>
        <Col span={6} className='text-center'>
          {localeString(accrualFees)}원
        </Col>
        <Col span={1} className='self-center text-center'>
          <img src={subtract} alt='-' />
        </Col>
        <Col span={5} className='text-center'>
          {localeString(repaymentFees)}원
        </Col>
        <Col span={1} className='self-center text-center'>
          <img src={equal} alt='=' />
        </Col>
        <Col span={5} className='text-center'>
          {localeString(accumulatedFees + repaymentFees)}원
        </Col>
      </Row>
    </>
  );
};

export const FutureFundTable = () => {
  const { data: futureFund } = useTodayFutureFundHook();
  if (!futureFund?.futureFundPrice && !futureFund?.applyPrice) {
    return (
      <>
        <Row
          className={`mt-[14px] rounded-[8px] border border-grey-200 py-[16px] text-center`}
        >
          <Col span={24}>미래 정산 데이터가 존재하지 않아요.</Col>
        </Row>
      </>
    );
  }

  return isMobile ? (
    <MFutureFundTable
      futureFundPrice={number(futureFund?.futureFundPrice)}
      applyPrice={number(futureFund?.applyPrice)}
      repaymentPrice={number(futureFund?.repaymentPrice)}
      repaymentFees={number(futureFund?.repaymentFees)}
      accumulatedFees={number(futureFund?.accumulatedFees)}
      accrualFees={number(futureFund?.accumulatedFees)}
    />
  ) : (
    <PCFutureFundTable
      futureFundPrice={number(futureFund?.futureFundPrice)}
      applyPrice={number(futureFund?.applyPrice)}
      repaymentPrice={number(futureFund?.repaymentPrice)}
      repaymentFees={number(futureFund?.repaymentFees)}
      accumulatedFees={number(futureFund?.accumulatedFees)}
      accrualFees={number(futureFund?.accumulatedFees)}
    />
  );
};
