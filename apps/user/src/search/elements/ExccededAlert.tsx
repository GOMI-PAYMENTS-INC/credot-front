import { ModalComponent } from '@/components/modals/ModalComponent';
import { useNavigate } from 'react-router-dom';
import { _getSubscription } from '@/common/container';

import { formatNumber } from '@/utils/formatNumber';
import { convertPlan } from '@/common/container';
import { PATH } from '@/router/routeList';
import type { Dispatch, SetStateAction } from 'react';

interface IExccededAlertModal {
  subscription: TGetSubscriptionResponse;
  plans: TPlans[];
  setIsExceeded: Dispatch<SetStateAction<boolean>>;
  isExceeded: boolean;
}

export const ExccededAlertModal = ({
  subscription,
  plans,
  setIsExceeded,
  isExceeded,
}: IExccededAlertModal) => {
  const navigator = useNavigate();

  return (
    <ModalComponent isOpen={isExceeded}>
      <div className='flex w-[606px] flex-col rounded-lg bg-white p-[50px] xs:w-[320px] xs:px-5 xs:py-[30px]'>
        <div className='flex flex-col gap-2.5'>
          <p className='text-2XL/Bold xs:text-XL/Bold'>
            <span className='text-orange-400'>리포트 발행 제한 수</span>에 도달했어요!
          </p>
          <p className='text-L/Medium text-grey-800 xs:text-S/Medium'>
            더 많은 키워드 분석을 위해
            <span className='hidden xs:contents'>
              <br />
              PC환경에서
            </span>{' '}
            플랜을 변경해주세요.
          </p>
          <p className='mt-2.5 text-M/Regular text-grey-600 xs:mt-0'>
            현재 사용중인 플랜 : {convertPlan(subscription.productUniqueKey!)}
          </p>
        </div>
        <div className='mt-10 xs:mt-5'>
          {plans
            .filter((plan) => plan.priority > subscription.productPriority)
            .map((plan, index) => {
              const count = plan.name === 'Starter' ? '50회' : '120회';
              const bottomStyle = index !== 0 ? 'mt-2.5' : '';
              return (
                <li
                  key={`${plan}_${index}`}
                  className={`flex justify-between rounded-lg border-[1px] bg-grey-50 px-5 py-[14px] xs:flex-col xs:justify-start xs:gap-[26px] ${bottomStyle}`}
                >
                  <div className='flex'>
                    <div className='flex flex-col gap-1 text-start'>
                      <p className='text-2XL/Bold xs:text-XL/Bold'>{plan.name}</p>
                      <p className='text-M/Medium xs:text-S/Medium'>
                        키워드 분석 최대 <span className='text-orange-400'>{count}</span>
                      </p>
                    </div>
                  </div>

                  <div className='flex w-[294px] items-center justify-end xs:w-full xs:flex-col'>
                    <div className='flex xs:w-full xs:items-center xs:justify-end'>
                      <div className='flex h-6 rounded-[100px] bg-gradient-to-b from-[#FF7500] to-[#FC5000]'>
                        <p className='self-center px-2.5 text-M/Bold text-white xs:text-S/Bold'>
                          {(plan.price / plan.originPrice) * 100}%
                        </p>
                      </div>
                      <p className='pl-[12px] text-M/Regular text-grey-500 line-through xs:text-S/Medium'>
                        {formatNumber(plan.originPrice)}원
                      </p>
                    </div>
                    <p className='pl-3 text-2XL/Bold xs:mt-2.5 xs:flex xs:w-full xs:items-end xs:justify-end xs:text-L/Bold'>
                      {formatNumber(plan.price)}원
                      <span className='text-M/Medium xs:ml-1 xs:text-S/Regular xs:text-grey-700'>
                        / {plan.subscribeCycle}일
                      </span>
                    </p>
                  </div>
                </li>
              );
            })}
        </div>
        <div className='mt-[50px] flex h-12 gap-[14px] text-center xs:mt-5'>
          <button
            className='button-filled-normal-large-grey-false-false-true w-[163px] py-0 text-M/Bold xs:w-full'
            onClick={() => {
              setIsExceeded(false);
            }}
          >
            닫기
          </button>
          <button
            className='button-filled-normal-large-primary-false-false-true w-[320px] border-r-[1px] bg-orange-400 text-M/Bold xs:hidden'
            onClick={() => {
              navigator(PATH.SUBSCRIBE);
              setIsExceeded(false);
            }}
          >
            플랜 업그레이드 하기
          </button>
        </div>
      </div>
    </ModalComponent>
  );
};
