import { Default as Layout } from '@/common/layouts';
import { TransactionHistory } from '@/subscribe/elements';
import { FAQ } from '@/subscribe/elements/FAQ';

import { SUBSCRIBE_QNA } from '@/subscribe/constant';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/router/routeList';

import { RegisterCards } from '@/subscribe/elements/RegisterCards';
import { useEffect } from 'react';
import { Footer } from '@/subscribe/elements/Footer';
import { convertPlanImg, calculatorBar } from '@/subscribe/container';

import { convertPlan } from '@/common/container';
import { useRecoilValue } from 'recoil';
import { SubscriptionAtom } from '@/atom';
import { convertTime } from '@/utils/parsingTimezone';
import { checkUserDevice } from '@/utils/checkUserDevice';
import { AccessDenied } from '@/subscribe/elements';
import {
  _keywordAnalysisPlanUpgradeStarted,
  _subscriptionPageViewed,
} from '@/amplitude/amplitude.service';

export const Subscribe = () => {
  const navigator = useNavigate();
  const subscriptionPlan = useRecoilValue(SubscriptionAtom);
  const isMobile = checkUserDevice();

  useEffect(() => {
    _subscriptionPageViewed();
    window.scroll(0, 0);
  }, []);

  if (subscriptionPlan === null) {
    return (
      <div className=' scale-[0.2]'>
        <div id='loader-white' />
      </div>
    );
  }
  const gageBar = calculatorBar(
    subscriptionPlan.count,
    subscriptionPlan.productUniqueKey,
  );

  if (isMobile) {
    return (
      <Layout useGap={true}>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout useGap={true}>
      <section className='space-y-[60px]'>
        <header className='relative bg-grey-50'>
          <div className='absolute left-0 top-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />
          <div className='absolute right-0 bottom-0 h-[130px] w-[348px] rounded-[348px] bg-orange-500 opacity-[0.2] blur-[100px]' />

          <div className='flex w-full justify-center'>
            <div className='flex w-[1148px] flex-col gap-10 py-[92px]'>
              <p className='text-4XL/Bold'>구독 및 결제</p>
            </div>
          </div>
        </header>

        <main>
          <div id='subscribe_frame' className='flex justify-center'>
            <div className='w-[1148px]'>
              <div className='flex justify-around gap-[88px]'>
                <div className='w-[608px] text-2XL/Bold'>
                  <p className='pb-5'>사용중인 플랜</p>
                  <div
                    id='subscription_plan'
                    className='flex h-[270px] overflow-hidden rounded-lg border-[1px] border-grey-300'
                  >
                    <div
                      id='subscription_plan_count'
                      className='h-full w-[263px] border-r-[1px] bg-grey-50'
                    >
                      <div className='flex h-full flex-col items-center justify-center gap-2.5'>
                        <img
                          src={`/assets/images/${convertPlanImg(
                            subscriptionPlan.productUniqueKey,
                          )}.png`}
                          className='h-[83px] w-[83px]'
                        />
                        <p className='w-[150px] border-b-[1px] border-grey-200 pb-2.5 text-center text-XL/Bold'>
                          {convertPlan(
                            subscriptionPlan.productUniqueKey as TPlanUniqueKey,
                          )}
                        </p>
                        <p className=' text-M/Medium text-grey-800'>
                          리포트 발행 수 :
                          <span className=''>{` ${subscriptionPlan.count}/${subscriptionPlan.totalCount}`}</span>
                        </p>
                        <div className='flex w-[180px] rounded bg-orange-200'>
                          <div
                            style={{ width: gageBar }}
                            className={`h-2 rounded  bg-orange-300`}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      id='subscription_plan_date'
                      className='relative flex-grow px-6 py-[35px] text-M/Regular'
                    >
                      <p className='text-M/Bold'>사용 기간</p>
                      <p>
                        {`${convertTime(subscriptionPlan.startedAt, 'YYYY.MM.DD')} ~ 
                        ${convertTime(subscriptionPlan.endedAt, 'YYYY.MM.DD')}`}
                      </p>
                      {subscriptionPlan.productUniqueKey === 'KEYWORD ANALYSIS_FREE' && (
                        <div className='flex w-full justify-end'>
                          <button
                            className='button-filled-normal-large-primary-false-false-true absolute bottom-[35px] right-6  w-[134px] bg-gradient-to-t from-orange-500 to-[#FF8C04]'
                            onClick={() => {
                              navigator(PATH.UPGRADE_PLAN);
                              _keywordAnalysisPlanUpgradeStarted();
                            }}
                          >
                            업그레이드 하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <RegisterCards />
              </div>
              <TransactionHistory />
            </div>
          </div>
        </main>

        <footer>
          <FAQ list={SUBSCRIBE_QNA} />
        </footer>
      </section>
      <Footer />
    </Layout>
  );
};
