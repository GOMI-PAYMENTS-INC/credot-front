import { useMemo, useState } from 'react';
import { GRADE, PLANS } from '@/price/constans';
import { openAppWithTag } from '@/utils/openBrowser';
import { CTA_LOCATION, CTA_TYPE } from '@/amplitude/amplitude.enum';
import { GlobalEnv } from '@/api/config';
import { PATH } from '@/router/paths';

export const Plan = () => {
  const [activeToggle, setActiveToggle] = useState<'MONTH' | 'YEAR'>('YEAR');
  const activeToggleCss =
    'bg-white font-bold text-orange-400 shadow-[0_0_3px_0_rgba(0,0,0,0.08)]';

  const PriceCard = useMemo(() => {
    return PLANS.map((plan, index) => {
      const starterStyle = {
        button: 'button-filled-normal-large-primary-false-false-true',
        background: 'bg-orange-50',
        border: 'border-orange-500',
        marginTop: 'mt-[18px]',
      };

      const premiumBtnStyle =
        plan.grade === GRADE.STARTER
          ? starterStyle.button
          : 'button-outlined-normal-large-primary-false-false-true';
      const btnStyle =
        plan.grade === GRADE.FREE
          ? 'button-filled-normal-large-grey-false-false-true'
          : premiumBtnStyle;
      const cardFrameStyle =
        plan.grade === GRADE.STARTER
          ? {
              cardLayout: starterStyle.marginTop,
              cardFrame: `${starterStyle.border} ${starterStyle.background}`,
            }
          : { cardLayout: 'mt-[53px]', cardFrame: 'border-grey-200 bg-grey-50' };

      return (
        <div
          id='cardLayout'
          className={`${cardFrameStyle.cardLayout} flex flex-col`}
          key={`plan_${index}`}
        >
          {plan.grade === GRADE.STARTER && (
            <div
              id='recomendationTag'
              className='relative top-[18px] flex justify-center'
            >
              <div
                style={{
                  background:
                    'linear-gradient(315deg, #FF7500 0%, #FC5000 100%), linear-gradient(109deg, #FF7500 0%, #FF9F4E 100%)',
                }}
                className='flex max-w-[138px] justify-center rounded-[33px] py-[6px] px-3 text-center'
              >
                <p className='w-[114px] text-M/Medium text-grey-100'>Best 패키지</p>
              </div>
            </div>
          )}

          <div
            id='cardFrame'
            className={`max-w-[278px] rounded-[20px] border shadow-[0_4px_19px_0_rgba(0,0,0,0.06)] ${cardFrameStyle.cardFrame}`}
          >
            <div id='card' className='flex flex-col justify-start py-6 px-[18px]'>
              <div id='cardHeader' className='w-[240px]'>
                <p className='text-XL/Bold text-grey-900'>{plan.grade}</p>
                <p className='mt-3 border-b-[1px] border-b-grey-600 pb-6 text-XL/Regular text-grey-800'>
                  {plan.subscribe}
                </p>
              </div>
              <div id='cardBody' className='mt-6 w-[240px]'>
                <div className='my-3 flex h-[133px] items-end justify-end'>
                  <p className='text-3XL/Bold'>
                    {plan.price[activeToggle]}
                    <span className='ml-2 text-XL/Regular'>/월</span>
                  </p>
                </div>
              </div>
              <div id='cardBottom' className='my-6 flex w-[240px] justify-center'>
                <button
                  className={`${btnStyle} w-full px-3 py-3`}
                  onClick={(event) =>
                    openAppWithTag({
                      url: GlobalEnv.serviceUrl,
                      path: PATH.PRICE,
                      type: CTA_TYPE.BUTTON,
                      location: CTA_LOCATION.MIDDLE_OF_CONTENT,
                      event: event,
                    })
                  }
                >
                  {plan.button}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, [activeToggle]);

  return (
    <section className='flex flex-col items-center justify-center bg-grey-50'>
      <div className='flex flex-col items-center justify-center sm:w-[277px] lg:w-[580px]'>
        <p className='mt-10 text-3XL/Bold'>Plan(VAT 포함)</p>
        <ul className='mt-[33px] flex rounded-lg bg-grey-200 p-1 text-center text-L/Medium text-grey-700'>
          <li
            className={` ${activeToggle === 'MONTH' && activeToggleCss} block rounded-lg`}
            onClick={() => setActiveToggle('MONTH')}
          >
            <p className='mx-3 my-3 w-[136px]'>월 결제</p>
          </li>
          <li
            className={` ${activeToggle === 'YEAR' && activeToggleCss} block rounded-lg`}
            onClick={() => setActiveToggle('YEAR')}
          >
            <p className='mx-3 my-3 flex w-[136px] items-center justify-center gap-1'>
              연 결제
              <span
                className={`rounded-[58px] bg-green-600 px-2 py-1 text-XS/Medium text-grey-100`}
              >
                +20%
              </span>
            </p>
          </li>
        </ul>
        <div className='mb-[77px] flex w-full justify-start gap-[23px] lg:flex-wrap'>
          {PriceCard}
        </div>
      </div>
    </section>
  );
};
