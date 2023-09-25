import { PlanLayout as Layout } from '@/subscribe/elements/PlanLayout';
import { BackforwardButton } from '@/components/BackForwardButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CACHING_KEY, PATH } from '@/types/enum.code';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { formatNumber } from '@/utils/formatNumber';

export const DownGrade = () => {
  const navigator = useNavigate();
  const [width, setWidth] = useState(0);
  const starterPlan = useSessionStorage
    .getItem(CACHING_KEY.PLANS)
    .find((plan: TPlans) => plan.uniqueKey === 'KEYWORD ANALYSIS_STARTER');

  useEffect(() => {
    window.scroll(0, 0);
    if (width === 0 && document.getElementById('plan_width') !== null) {
      setWidth(document.getElementById('plan_width')!.offsetLeft - 100);
    }
  }, [document.getElementById('plan_width')]);

  return (
    <Layout useFooter={false} useHeightFull={false}>
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
            <p className='text-4XL/Bold'>업그레이드 하기</p>
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
              <p className='mb-5 text-XL/Medium'>적용 플랜</p>
              <div>
                <div className='flex justify-between rounded-lg border-[1px] px-5 py-[14px]'>
                  <div className='flex'>
                    <div className='flex flex-col gap-1'>
                      <p className='text-2XL/Bold'>{starterPlan.name}</p>
                      <p className='text-M/Medium'>{starterPlan.description}</p>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <p className='text-2XL/Bold'>
                      {formatNumber(starterPlan.price)}원
                      <span className='pl-1 text-M/Medium'>
                        / {starterPlan.subscribeCycle}일
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id='bill'>
              <p className='text-XL/Medium'>결제정보</p>
              <div className='mt-[14px] w-[608px] border-y-[1px]'>
                <div className='my-[22px] flex justify-between border-grey-200 text-L/Regular'>
                  <div className='flex flex-col gap-5'>
                    <p>구독 서비스명</p>
                    <p>리포트 발행 가능 수</p>
                    <p>서비스 금액</p>
                    <p>할인 금액</p>
                  </div>

                  <div className='flex flex-col gap-5 text-end'>
                    <p className='text-L/Bold'>{`키워드 분석 / ${starterPlan.name}`}</p>
                    <p className='text-L/Bold'>{`${starterPlan.count}`}회</p>
                    <p>{formatNumber(starterPlan.originPrice)}원</p>
                    <p>- 원</p>
                  </div>
                </div>
              </div>
              <div className='mt-[18px] flex justify-between'>
                <p className='text-2XL/Bold '>결제 금액</p>
                <p className='text-2XL/Regular'>{formatNumber(starterPlan.price)}원</p>
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
                  <p className='list-none pb-2.5 text-L/Bold'>플랜 변경 시 유의사항</p>
                  <li>
                    하위 플랜으로 변경 시 사용할 수 있는 서비스 이용량이 제한되어요.
                  </li>
                  <li>변경된 플랜은 다음 정기 결제일부터 적용되어요.</li>
                </ul>
              </div>
            </div>

            <div className='mt-[14px] flex items-center self-start'>
              <input
                id='remember_me'
                name='remember_me'
                type='checkbox'
                className='checkboxCustom peer'
              />
              <label
                htmlFor='remember_me'
                className='checkboxCustom-label bg-[length:24px_24px] bg-[left_top_50%] pl-[30px] text-L/Regular'
              >
                플랜 변경에 따른 유의 사항을 이해했습니다.
              </label>
            </div>
            <button
              className='button-filled-normal-large-grey-false-false-true mt-10 w-full'
              onClick={() => {}}
            >
              플랜 변경하기
            </button>
          </div>
        </div>
      </footer>
    </Layout>
  );
};
