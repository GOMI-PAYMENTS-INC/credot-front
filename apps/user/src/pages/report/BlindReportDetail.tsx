import { Fragment, ReactNode } from 'react';
import { PATH } from '@/types/enum.code';
import { authReturnUrl } from '@/containers/auth/auth.container';

interface IBlindReportProps {
  isUser: boolean;
  children?: ReactNode;
}
export const BlindReportDetail = ({ children, isUser }: IBlindReportProps) => {
  if (isUser) {
    return <Fragment>{children}</Fragment>;
  } else {
    const { saveReturnUrl } = authReturnUrl();

    return (
      <Fragment>
        <div>
          <div className='space-y-[72px]'>{children}</div>
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
            <button
              className='button-filled-normal-xLarge-red-false-false-true min-w-[600px]'
              onClick={() => saveReturnUrl(window.location.href, PATH.SIGN_IN)}
            >
              회원가입 하고 리포트 전체 내용 열람하기
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
};
