import { Col, Row } from 'antd';
import { isMobile } from 'react-device-detect';

import { abstract, equal } from '@/v3/pages/home/assets';
import { useTodayFutureFundHook } from '@/v3/pages/home/hooks/future-fund.hook';
import { useTodayPrefundHook } from '@/v3/pages/home/hooks/prefund.hook';
import { localeString, number } from '@/v3/util';

export const PrefundSummaryItem = ({ name, price }: { name: string; price: number }) => {
  return (
    <Row className='bg-white px-[20px] py-[16px]'>
      <Col
        span={14}
        className={`${
          isMobile ? 'text-S/Medium' : 'text-M/Regular'
        } flex pl-[16px] text-grey-700`}
      >
        <div className='mr-[10px] self-center'>
          <img src={abstract} width={20} />
        </div>
        <div>{name}</div>
      </Col>
      <Col
        span={10}
        className={`${
          isMobile ? 'text-S/Regular' : 'text-M/Medium'
        } text-right text-grey-800`}
      >
        {localeString(price)}원
      </Col>
    </Row>
  );
};

export const PrefundSummary = () => {
  const { data: prefund } = useTodayPrefundHook();
  const { data: futureFund } = useTodayFutureFundHook();

  return (
    <>
      <Row
        className={`${
          isMobile ? '' : 'rounded-tr-[8px] rounded-tl-[8px]'
        } mt-[43px]  bg-grey-200 py-[16px] px-[20px]`}
      >
        <Col
          span={6}
          className={`${isMobile ? 'text-M/Medium' : 'text-L/Medium'} text-grey-800`}
        >
          전일매출
        </Col>
        <Col
          span={18}
          className={`${
            isMobile ? 'text-S/Bold' : 'text-L/Bold'
          } text-right text-grey-800`}
        >
          {localeString(number(prefund?.preSalesPrice))}원
        </Col>
      </Row>
      <PrefundSummaryItem
        name='카드사 수수료'
        price={number(prefund?.preCardCommission)}
      />
      <PrefundSummaryItem
        name='선정산 수수료'
        price={number(prefund?.serviceCommission)}
      />
      <PrefundSummaryItem name='과정산 금액' price={number(prefund?.setoff)} />
      <Row className='border-y border-grey-200 bg-grey-100 px-[20px] py-[20px]'>
        <Col
          span={12}
          className={`${
            isMobile ? 'text-S/Medium' : 'text-M/Regular'
          } flex text-grey-800`}
        >
          <div className='mr-[10px] self-center'>
            <img src={equal} width={20} />
          </div>
          <div className='self-center'>선정산 금액</div>
        </Col>
        <Col
          span={12}
          className={`${
            isMobile ? 'text-S/Regular' : 'text-M/Medium'
          } text-right text-grey-800`}
        >
          {localeString(number(prefund?.prefund))}원
        </Col>
      </Row>
      <PrefundSummaryItem
        name='미래 정산금 상환'
        price={number(futureFund?.repaymentPrice)}
      />
      <PrefundSummaryItem
        name='미래 정산 수수료'
        price={number(futureFund?.repaymentFees)}
      />
      <Row
        className={`${
          isMobile ? '' : 'rounded-br-[8px] rounded-bl-[8px]'
        } bg-[#B36DEE] py-[16px] px-[20px]`}
      >
        <Col span={7} className='self-center text-L/Medium text-white'>
          입금 예정액
        </Col>
        <Col span={17} className='text-right text-2XL/Bold text-white'>
          {localeString(
            number(prefund?.prefund) +
              number(futureFund?.repaymentPrice) +
              number(futureFund?.repaymentFees),
          )}
          원
        </Col>
      </Row>
    </>
  );
};
