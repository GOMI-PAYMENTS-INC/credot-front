import { useMemo } from 'react';
import { GRADE, PLANS } from '@/price/constans';
import { openAppWithTag } from '@/utils/openBrowser';
import { planConvertor, CTA_TYPE } from '@/amplitude/amplitude.enum';
import { GlobalEnv } from '@/api/config';
import { PATH } from '@/router';

export const Plan = () => {
  const PriceCard = useMemo(() => {
    return PLANS.map((plan, index) => {
      const btnStyle =
        plan.grade === GRADE.FREE
          ? 'button-filled-normal-large-grey-false-false-true'
          : 'button-outlined-normal-large-primary-false-false-true bg-orange-100';

      return (
        <div id='cardLayout' className='flex flex-col' key={`plan_${index}`}>
          <div
            id='cardFrame'
            className={`max-w-[278px] rounded-[20px] border shadow-[0_4px_19px_0_rgba(0,0,0,0.06)]`}
          >
            <div id='card' className='flex flex-col justify-start py-6 px-[18px]'>
              <div id='cardHeader' className='w-[240px]'>
                <div className='flex'>
                  <p className='text-XL/Bold text-grey-900'>{plan.grade}</p>
                  {plan.grade === GRADE.STARTER && (
                    <div className='ml-2.5 w-fit rounded-[42px] bg-orange-400 px-[17px] py-[3px] text-M/Bold text-white'>
                      best
                    </div>
                  )}
                </div>

                <p className='mt-3 border-b-[1px] border-b-grey-600 pb-6 text-XL/Regular text-grey-800'>
                  {plan.subscribe}
                </p>
              </div>
              <div id='cardBody' className='mt-6 w-[240px]'>
                <div className='my-3 flex h-[133px] flex-col items-end justify-end'>
                  <div className='flex gap-2.5 pb-2'>
                    <p className='text-L/Regular text-grey-500 line-through'>
                      {plan.price.origin}
                    </p>
                    <div className='rounded-[50px] bg-orange-100 px-2.5 text-M/Bold text-orange-400'>
                      {plan.price.sale}
                    </div>
                  </div>
                  <p className='text-3XL/Bold'>
                    {plan.price.MONTH}
                    <span className='ml-2 text-XL/Regular text-grey-800'>/30일</span>
                  </p>
                </div>
              </div>
              <div id='cardBottom' className='my-6 flex w-[240px] justify-center'>
                <button
                  className={`${btnStyle} w-full rounded-md px-3 py-3`}
                  id='movedToSolution'
                  onClick={(event) => {
                    const planConverted = planConvertor(plan.grade);
                    console.log(planConverted, 'plan');
                    openAppWithTag({
                      url: 'http://localhost:5173/subscribe',
                      // url: `${GlobalEnv.serviceUrl}/subscribe`,
                      path: PATH.PRICE,
                      type: CTA_TYPE.BUTTON,
                      location: planConverted,
                      event: event,
                    });
                  }}
                >
                  {plan.button}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, []);

  return (
    <section className='flex flex-col items-center  bg-grey-50'>
      <div className='flex flex-col items-center justify-center lg:w-[580px] sm:w-[277px]'>
        <p className='mt-10 text-3XL/Bold'>
          Plan <span className='text-2XL/Medium'>(VAT 포함)</span>
        </p>

        <div className='mb-[77px] mt-[50px] flex w-full justify-start gap-[60px] lg:flex-wrap lg:gap-6'>
          {PriceCard}
        </div>
      </div>
    </section>
  );
};
