import { PlanLayout as Layout } from '@/subscribe/elements/PlanLayout';
import { BackforwardButton } from '@/components/BackForwardButton';
import { PATH } from '@/router/routeList';
import { formatNumber } from '@/utils/formatNumber';
import { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { storePlans, switchPlans } from '@/subscribe/container';
import { RegisterCards } from '@/subscribe/elements/RegisterCards';
import { useRecoilValue } from 'recoil';
import { SubscriptionAtom, PlansAtom } from '@/atom';

export const UpgradePlan = () => {
  const navigator = useNavigate();
  const [width, setWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const plans = useRecoilValue(PlansAtom);
  const [selectedPlan, setSelectedPlan] = useState<TPlans | null>(null);

  const subscriptionPlan = useRecoilValue(SubscriptionAtom);

  useEffect(() => {
    window.scroll(0, 0);
    if (subscriptionPlan?.id) {
      storePlans(setSelectedPlan, subscriptionPlan.productUniqueKey);
    }
    if (width === 0) {
      setWidth(document.getElementById('plan_width')?.offsetLeft! - 100);
    }
  }, [subscriptionPlan?.id]);

  if (subscriptionPlan === null) {
    return (
      <div className=' scale-[0.2]'>
        <div id='loader-white' />
      </div>
    );
  }

  return (
    <Layout>
      {isOpen && (
        <Fragment>
          <div id='agreement' />
          <div hidden id='payment-widget' />
        </Fragment>
      )}

      <BackforwardButton
        style={`top-[146px] sticky`}
        originStyle={{ left: `${width}px` }}
        callback={() => {
          navigator(PATH.SUBSCRIBE);
        }}
      />
      <header className='pt-[22px]'>
        <div className='flex w-full justify-center'>
          <div id='plan_width' className='flex w-[1138px] justify-center'>
            <p className='text-4XL/Bold'>업그레이드 하기</p>
          </div>
        </div>
      </header>
      <main className='pt-[74px]'>
        <div id='subscribe_frame' className='flex justify-center'>
          <div className='flex w-[1148px] justify-between'>
            <div className='flex w-[608px] flex-col justify-around gap-12'>
              <div className='space-y-5 text-2XL/Bold'>
                <p>결제 플랜</p>
                <ul id='plan_list' className='flex flex-col gap-5'>
                  {plans &&
                    plans
                      .filter((plan) => plan.priority > subscriptionPlan?.productPriority)
                      .map((plan, index) => {
                        const isSelected = plan.name === selectedPlan?.name;
                        const selectedBorder = isSelected
                          ? 'border-orange-400 bg-orange-100'
                          : '';
                        return (
                          <li
                            key={`${plan}_${index}`}
                            className={`flex cursor-pointer justify-between rounded-lg border-[1px] px-5 py-[14px] ${selectedBorder}`}
                            onClick={() => switchPlans(plan.name, setSelectedPlan)}
                          >
                            <div className='flex'>
                              <div className='flex h-full items-center'>
                                <div
                                  className={`flex h-5 w-5 items-center justify-center rounded-full border-[2px] ${
                                    isSelected ? 'border-orange-400' : ''
                                  }`}
                                >
                                  <div
                                    className={`h-3 w-3 rounded-full bg-orange-400 p-1 ${
                                      isSelected ? '' : 'hidden'
                                    }`}
                                  />
                                </div>
                              </div>
                              <div className='ml-5 flex flex-col gap-1'>
                                <p className='text-2XL/Bold'>{plan.name}</p>
                                <p className='text-M/Medium'>{plan.description}</p>
                              </div>
                            </div>
                            <div className='flex items-center'>
                              <div className='flex h-6 rounded-[100px] bg-gradient-to-b from-[#FF7500] to-[#FC5000]'>
                                <p className='self-center px-2.5 text-S/Bold text-white'>
                                  {(plan.price / plan.originPrice) * 100}%
                                </p>
                              </div>
                              <p className='ml-[7px] text-M/Regular text-grey-500 line-through'>
                                {formatNumber(plan.originPrice)}
                              </p>
                              <p className='ml-2.5 text-2XL/Bold'>
                                {formatNumber(plan.price)}
                                <span className='text-M/Medium'>
                                  /{plan.subscribeCycle}일
                                </span>
                              </p>
                            </div>
                          </li>
                        );
                      })}
                </ul>
              </div>

              <div>
                <p className='text-2XL/Bold'>결제정보</p>
                <div className='mt-[14px] max-h-[254px] w-[608px] border-y-[1px]'>
                  <div className='my-[22px] flex justify-between border-grey-200 text-L/Regular'>
                    <div className='flex flex-col gap-5'>
                      <p>구독 서비스명</p>
                      <p>리포트 발행 가능 수</p>
                      <p>서비스 금액</p>
                      <p>할인 금액</p>
                    </div>
                    {selectedPlan && (
                      <div className='flex flex-col gap-5 text-end'>
                        <p className='text-L/Bold'>{`키워드 분석 / ${selectedPlan.name}`}</p>
                        <p className='text-L/Bold'>{`${selectedPlan.count}`}회</p>
                        <p>{formatNumber(selectedPlan.originPrice)}원</p>
                        <p>{formatNumber(selectedPlan.originPrice / 2)}원</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className='mt-[18px] flex justify-between'>
                  <p className='text-2XL/Bold text-orange-400'>총 결제 금액</p>
                  <p className='text-2XL/Regular'>
                    {formatNumber(selectedPlan?.price)}원
                  </p>
                </div>
              </div>
            </div>

            <div className='w-[444px]'>
              <RegisterCards uniqueKey={selectedPlan?.uniqueKey} />
            </div>
          </div>
        </div>
      </main>
      <footer className='pt-[74px]'>
        <div className='flex justify-center'>
          <div className='w-[1148px] rounded-lg bg-grey-100'>
            <div className='py-[30px] pl-[35px]'>
              <ul className='list-inside list-disc space-y-5 text-M/Regular'>
                <p className='list-none text-L/Bold'>구독 유의사항</p>
                <li>서비스 구독은 언제든 직접 해지할 수 있어요.</li>
                <li>
                  서비스 구독료는 매월 정기 결제일 오전 7시 정각에 자동으로 결제되어요.
                </li>
                <li>
                  플랜을 업그레이드 할 경우, 기존 플랜에서 남은 서비스 이용량만큼 할인이
                  적용되어요.
                </li>
                <li>
                  플랜을 다운그레이드할 경우, 다음 정기 결제일부터 변경된 플랜이
                  적용되어요.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};
