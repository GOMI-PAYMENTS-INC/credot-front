import { Fragment, ReactNode } from 'react';
import { PATH } from '@/types/enum.code';
import { Link } from 'react-router-dom';
import { RecommendationChart } from '@/pages/report/RecommendationChart';
import { getParameter } from '@/utils/getParameter';

interface IBlindReportProps {
  isUser: boolean;
  children?: ReactNode;
}
export const BlindReportDetail = ({ children, isUser }: IBlindReportProps) => {
  if (isUser) {
    return <Fragment>{children}</Fragment>;
  } else {
    const dummy: TGetRelationReportDataType = {
      id: 168,
      text: 'stickers',
      avgPrice: 1.8,
      batchStatus: 'DONE',
      competitionProductCount: 714429,
      competitionRate: 17.23,
      cpcPrice: 3,
      cpcRate: 166.66667,
      createdAt: new Date('2023-05-03T07:31:24.364+00:00'),
      evaluateStatus: 'AEE',
      searchCount: 41456,
    };
    return (
      <Fragment>
        <div>
          <div className='space-y-[72px]'>
            {children}
            <RecommendationChart
              relation={[dummy]}
              _dispatch={null}
              spinnerEvent={false}
              toggleEvent={[{ id: 168, isOpen: true }]}
              country={null}
              basePrice={968.92}
              currencyUnit={1}
            />
          </div>
          <div className='relative'>
            <div className='absolute top-[-300px] block h-[300px] w-full bg-gradient-to-t from-white to-transparent'></div>
          </div>
        </div>
        <div className='relative mt-8 text-center'>
          <div>
            <p className='text-XL/Medium'>리포트의 다음 내용이 궁금하신가요?</p>
            <p className='mt-[9px] text-XL/Bold'>
              1분 회원가입 후 모든 내용을 확인하세요!
            </p>
          </div>
          <div className='mt-[44px]'>
            <Link
              to={`${PATH.SIGN_IN}?return_url=${encodeURIComponent(
                window.location.href,
              )}`}
            >
              <button className='button-filled-normal-xLarge-red-false-false-true min-w-[600px]'>
                회원가입 하고 리포트 전체 내용 열람하기
              </button>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
};
