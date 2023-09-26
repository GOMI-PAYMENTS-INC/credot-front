import { PlanLayout as Layout } from '@/subscribe/elements/PlanLayout';
import { BackforwardButton } from '@/components/BackForwardButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { _keywordAnalysisPlanDowngradeStarted } from '@/amplitude/amplitude.service';

import { useEffect, useState } from 'react';
import { CACHING_KEY } from '@/types/enum.code';
import { PATH } from '@/router/routeList';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { SwitchAtom } from '@/atom';
import { useRecoilState } from 'recoil';

import { formatNumber } from '@/utils/formatNumber';
import {
  agreeChangedPlan,
  getSource,
  _downGrade,
  _patchUnsubscription,
} from '@/subscribe/container';
import { convertTime } from '@/utils/parsingTimezone';
import Checkbox from '@/components/Checkbox/Checkbox';

import { ModalComponent } from '@/components/modals/ModalComponent';
import { ReactSVG } from 'react-svg';

export const DownGrade = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const {
    text,
    plan,
    modalDiscription,
    warningText,
    warningDiscription,
    options,
    planInfo,
  } = getSource(pathname);

  const [width, setWidth] = useState(0);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useRecoilState(SwitchAtom);

  const userPlan: TGetSubscriptionResponse = useSessionStorage.getItem(
    CACHING_KEY.USER_PLAN,
  );

  useEffect(() => {
    window.scroll(0, 0);
    if (width === 0 && document.getElementById('plan_width') !== null) {
      _keywordAnalysisPlanDowngradeStarted();
      setWidth(document.getElementById('plan_width')!.offsetLeft - 100);
    }

    return () => {
      setIsError(null);
      setIsOpen(false);
    };
  }, [document.getElementById('plan_width')]);

  return (
    <Layout useFooter={false} useHeightFull={false}>
      <ModalComponent isOpen={isOpen}>
        <div className='flex w-[400px] flex-col items-center overflow-hidden rounded-[10px] bg-white'>
          <div className='flex flex-col items-center justify-center px-6 py-4'>
            <ReactSVG
              src='/assets/icons/outlined/CheckCircle.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'fill-green-600 w-[34px] h-[34px]');
              }}
            />
            <h1 className='pt-2.5 text-2XL/Bold text-grey-900'>{text} 완료</h1>
            <p className='pt-6 text-L/Medium'>다음 정기 결제일부터 {modalDiscription}</p>

            <button
              className='button-filled-normal-large-grey-false-false-true mt-8 w-full'
              onClick={() => navigator(PATH.SUBSCRIBE, { replace: true })}
            >
              확인
            </button>
          </div>
        </div>
      </ModalComponent>
      <BackforwardButton
        style={`top-[146px] sticky`}
        originStyle={{ left: `${width}px` }}
        callback={() => {
          navigator(PATH.SUBSCRIBE, { replace: true });
        }}
      />
      <header className='pt-[22px]'>
        <div className='flex w-full justify-center'>
          <div id='plan_width' className='flex w-[1138px] justify-center'>
            <p className='text-4XL/Bold'>{text}하기</p>
          </div>
        </div>
      </header>

      <main className='pt-[74px]'>
        <div className='flex w-full justify-center'>
          <div
            id='subscribe_frame'
            className='flex w-[608px] flex-col justify-center gap-[50px]'
          >
            <div id='plan'>
              <p className='mb-5 text-XL/Medium'>{plan}</p>
              <div>
                <div className='flex justify-between rounded-lg border-[1px] px-5 py-[14px]'>
                  <div className='flex'>
                    <div className='flex flex-col gap-1'>
                      <p className='text-2XL/Bold'>{planInfo.name}</p>
                      <p className='text-M/Medium'>{planInfo.description}</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <p className='text-2XL/Bold'>
                      {formatNumber(planInfo.price)}원
                      <span className='pl-1 text-M/Medium'>
                        / {planInfo.subscribeCycle}일
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className='pt-10'>
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='w-[608px]'>
            <div className='rounded-lg border-[1px]'>
              <div className='p-5'>
                <ul className='list-inside list-disc space-y-2.5 text-M/Regular'>
                  <p className='list-none pb-2.5 text-L/Bold'>{text} 시 유의사항</p>
                  <li>{warningText} 시 사용할 수 있는 서비스 이용량이 제한되어요.</li>
                  <li>
                    {warningDiscription} 다음 정기 결제일인
                    {` ${convertTime(userPlan.endedAt, 'YYYY.MM.DD')}`} 부터 적용되어요.
                  </li>
                </ul>
              </div>
            </div>

            <Checkbox
              customCss='mt-[14px]'
              options={options}
              callback={(value: TCheckboxOption) => agreeChangedPlan(value, setIsError)}
            />
            {isError && (
              <p className='pt-1 text-M/Regular text-red-500'>
                {text}에 따른 유의 사항을 이해했습니다.
              </p>
            )}
            <button
              className='button-filled-normal-large-grey-false-false-true mt-10 w-full'
              onClick={() => {
                if (isError === null || isError) {
                  return setIsError(true);
                }
                pathname === PATH.UNSUBSCRIPTION
                  ? _patchUnsubscription(setIsOpen)
                  : _downGrade(setIsOpen);
              }}
            >
              {text}하기
            </button>
          </div>
        </div>
      </footer>
    </Layout>
  );
};
