import { Col, Row } from 'antd';
import { isMobile } from 'react-device-detect';

import { abstract, equal } from '@/v3/pages/home/assets';
import { useTodayFutureFundHook } from '@/v3/pages/home/hooks/future-fund.hook';
import { useTodayPrefundHook } from '@/v3/pages/home/hooks/prefund.hook';
import { localeString, number } from '@/v3/util';

export const PrefundSummaryItem = ({ name, price }: { name: string; price: number }) => {
  return (
    <Row className='border-r border-l border-[#F5F5F5] bg-white px-[20px] py-[16px]'>
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
    <Row gutter={[30, 30]}>
      <Col className='flex w-full flex-col'>
        <Row
          className={`mt-[14px] w-full  rounded-tr-[8px] rounded-tl-[8px] border-[1px] border-grey-300  bg-grey-100 ${
            isMobile ? 'py-[18px]' : 'py-[22px]'
          } pl-[26px] pr-[42px]`}
        >
          <Col
            span={6}
            className={`${isMobile ? 'text-M/Medium' : 'text-L/Medium'} text-grey-800`}
          >
            전일 매출
          </Col>
          <Col
            span={18}
            className={`${
              isMobile ? 'text-M/Bold' : 'text-L/Bold'
            } text-right text-grey-800`}
          >
            {localeString(number(prefund?.preSalesPrice))}원
          </Col>
        </Row>
        <Row
          className={`mt-[-1px] w-full rounded-br-[8px] rounded-bl-[8px] border-[1px] border-grey-300 bg-white py-[20px] ${
            isMobile ? 'px-[30px]' : 'px-[42px]'
          }`}
        >
          <Col className={`w-full ${isMobile ? 'text-S/Medium' : 'text-M/Medium'}`}>
            <div className='mb-[14px] flex w-full justify-between'>
              <div className={`min-w-[120px] text-grey-700`}>카드사 수수료</div>
              <div className='h-[1px] w-[205px] self-center border-b-[1px] border-dashed border-grey-300'></div>
              <div className='min-w-[120px] text-right text-grey-800'>
                {localeString(number(prefund?.preCardCommission))}원
              </div>
            </div>
            <div className='mb-[14px] flex w-full justify-between'>
              <div className='min-w-[120px] text-grey-700'>선정산 수수료</div>
              <div className='h-[1px] w-[205px] self-center border-b-[1px] border-dashed border-grey-300'></div>
              <div className='min-w-[120px] text-right  text-grey-800'>
                {localeString(number(prefund?.serviceCommission))}원
              </div>
            </div>
            <div className='flex w-full justify-between'>
              <div className='min-w-[120px] text-grey-700'>과정산 금액</div>
              <div className='h-[1px] w-[205px] self-center border-b-[1px] border-dashed border-grey-300'></div>
              <div className='min-w-[120px] text-right text-grey-800'>
                {localeString(number(prefund?.setoff))}원
              </div>
            </div>
          </Col>
        </Row>

        <Row
          className={`mt-[22px] w-full rounded-tr-[8px] rounded-tl-[8px] border-[1px] border-grey-300  bg-grey-100 ${
            isMobile ? 'py-[18px]' : 'py-[22px]'
          } pl-[26px] pr-[42px]`}
        >
          <Col
            span={6}
            className={`${isMobile ? 'text-M/Medium' : 'text-L/Medium'} text-grey-800`}
          >
            선정산금
          </Col>
          <Col
            span={18}
            className={`${
              isMobile ? 'text-M/Bold' : 'text-L/Bold'
            } text-right text-grey-800`}
          >
            {localeString(number(prefund?.prefund))}원
          </Col>
        </Row>
        <Row
          className={`mt-[-1px] w-full rounded-br-[8px] rounded-bl-[8px] border-[1px] border-grey-300 bg-white py-[20px] ${
            isMobile ? 'px-[30px]' : 'px-[42px]'
          }`}
        >
          <Col className={`w-full ${isMobile ? 'text-S/Medium' : 'text-M/Medium'}`}>
            <div className='mb-[14px] flex w-full justify-between'>
              <div className='min-w-[120px] text-grey-700'>미래정산 수수료</div>
              <div className='h-[1px] w-[205px] self-center border-b-[1px] border-dashed border-grey-300'></div>
              <div className='min-w-[120px] text-right text-grey-800'>
                {localeString(
                  number(futureFund?.readyRepaymentFees) +
                    number(futureFund?.repaymentFees),
                )}
                원
              </div>
            </div>
            <div className='flex w-full justify-between'>
              <div className='min-w-[120px] text-grey-700'>미래정산금 상환</div>
              <div className='h-[1px] w-[205px] self-center border-b-[1px] border-dashed border-grey-300'></div>
              <div className='min-w-[120px] text-right text-grey-800'>
                {localeString(
                  number(futureFund?.readyRepaymentPrice) +
                    number(futureFund?.repaymentPrice),
                )}
                원
              </div>
            </div>
          </Col>
        </Row>

        <Row className='mt-[22px] w-full px-[30px] text-right'>
          <Col className='w-full'>
            <div
              className={`${isMobile ? 'text-M/Medium' : 'text-L/Medium'} text-[#595959]`}
            >
              입금 예정액
            </div>
            <div
              className={`my-[7px] ${
                isMobile ? 'text-2XL/Bold' : 'text-3XL/Bold'
              } text-purple-800`}
            >
              {localeString(
                number(prefund?.prefund) +
                  (number(futureFund?.readyRepaymentPrice) +
                    number(futureFund?.repaymentPrice)) +
                  (number(futureFund?.readyRepaymentFees) +
                    number(futureFund?.repaymentFees)),
              )}
              원
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
