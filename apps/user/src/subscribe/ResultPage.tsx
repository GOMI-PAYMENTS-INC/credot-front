import { PlanLayout as Layout } from '@/subscribe/elements/PlanLayout';

import { RESULT_OF_PAY_REQUEST } from '@/subscribe/constant';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PATH } from '@/router/routeList';
import { _getSubscription } from '@/common/container';

import { useRecoilValue } from 'recoil';
import { UserCardsAtom, SubscriptionAtom } from '@/atom';
import { insertDash, calcPrice } from '@/subscribe/container';
import { convertTime } from '@/utils/parsingTimezone';

import { isFalsy } from '@/utils/isFalsy';

export const ResultPage = () => {
  const { result } = useParams();
  const userSubscription = useRecoilValue(SubscriptionAtom);
  const [userCardsInfo] = useRecoilValue(UserCardsAtom);
  const navigator = useNavigate();
  const response: { code: number; message: string; data: TPostPaymentsResponse } =
    useLocation().state.response;

  if (isFalsy(response) || isFalsy(userCardsInfo)) {
    location.replace(PATH.SUBSCRIBE);
    return <></>;
  }

  const isAccepted = result === 'accepted';
  const { salePrice, price, name, originPrice } = calcPrice(
    response.data.payment,
    userSubscription!,
    response.data.payment.amount,
  );

  const { text, title, buttonText, billText } =
    RESULT_OF_PAY_REQUEST[result as TRequestStatus];

  return (
    <Layout useFooter={false}>
      <div
        id='frame'
        className='flex h-full flex-col items-center justify-center pt-[60px]'
      >
        <div className='w-[524px] space-y-[30px]'>
          <header>
            <div className='flex flex-col items-center'>
              <img className='h-[122px] w-[122px]' src={`/assets/images/${text}.png`} />
              <p className='pt-[30px] text-3XL/Bold'>{title}</p>
            </div>
          </header>
          <main className='h-fit'>
            {isAccepted ? (
              <div className='rounded-lg border-[1px] border-grey-300'>
                <div className='p-10'>
                  <p className='text-XL/Medium'>{billText}</p>
                  <div className='py-[14px]'>
                    <div
                      className={`flex justify-between ${
                        isAccepted ? 'border-y-[1px] py-5' : 'border-t-[1px] pt-5'
                      } border-grey-300 text-L/Regular`}
                    >
                      <div className='flex flex-col gap-5'>
                        <p>결제일시</p>
                        <p>결제카드</p>
                        <p>카드번호</p>
                        <p>구독 서비스명</p>
                        <p>서비스 금액</p>
                        <p>할인 금액</p>
                        {/* <p>결제금액</p> */}
                      </div>
                      <div className='flex flex-col gap-5 text-end'>
                        <p className='text-L/Bold'>{convertTime(null, 'YYYY.MM.DD')}</p>

                        <p className='text-L/Bold'>{response.data.payment.cardName}</p>
                        <p className='text-L/Bold'>
                          {insertDash(userCardsInfo?.cardNumber)}
                        </p>
                        <p>{`키워드 분석 / ${name}`}</p>

                        <p>{originPrice}원</p>
                        <p>{salePrice}원</p>

                        {/* <p>{price}원</p> */}
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between'>
                    <p className='text-2XL/Bold text-orange-400 '>총 결제 금액</p>
                    <p className=' text-2XL/Regular'>{price}원</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className='text-center text-red-700'>
                  결제 실패 사유 : {response.message}
                </p>
              </div>
            )}
          </main>
          <footer>
            <div className='flex gap-5'>
              {/* {isAccepted === false && (
                <button
                  className='button-filled-normal-large-grey-false-false-true min-w-[200px]'
                  onClick={() =>
                    navigator(result === 'rejected' ? PATH.UPGRADE_PLAN : PATH.SUBSCRIBE)
                  }
                >
                  이전으로
                </button>
              )} */}
              <button
                className='button-filled-normal-large-primary-false-false-true w-full'
                onClick={() =>
                  navigator(result === 'rejected' ? PATH.UPGRADE_PLAN : PATH.SUBSCRIBE, {
                    replace: true,
                  })
                }
              >
                {buttonText}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </Layout>
  );
};
