import { Fragment, Dispatch, SetStateAction } from 'react';
import { FindAccountTittle } from '@/pages/auth/FindAccountTittle';
import { AUTH_RESPONSE_TYPE, PATH } from '@/types/enum.code';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { isTruthy } from '@/utils/isTruthy';
import { initializeAuteState } from '@/containers/auth/auth.container.refac';
interface IFindIdResultProps {
  isExistedAccount: null | keyof typeof AUTH_RESPONSE_TYPE;
  userAccounts?: Array<{
    email: string;
    isSocialLogin: boolean;
    socialProvider?: string | null;
  }>;
  setIsVerification: Dispatch<SetStateAction<TVerifyButtonState>>;
}
export const FindIdResult = (props: IFindIdResultProps) => {
  const { isExistedAccount, userAccounts, setIsVerification } = props;
  return (
    <Fragment>
      {isExistedAccount === AUTH_RESPONSE_TYPE.FILLED && isTruthy(userAccounts) ? (
        <div className='space-y-8'>
          <FindAccountTittle
            title={`<span class='text-orange-500'>${userAccounts?.length}개</span>의 아이디를 찾았어요!`}
          />

          <ul className='space-y-6'>
            {userAccounts!.map((account, index) => (
              <li
                className='flex cursor-pointer items-center justify-between rounded-lg border border-grey-300 px-5 py-3 text-orange-500'
                key={index}
                onClick={() => copyToClipboard('아이디를 복사했어요.', account.email)}
              >
                <div>{account.email}</div>

                <ReactSVG
                  src='/assets/icons/outlined/Copy.svg'
                  className='cursor-pointer'
                  beforeInjection={(svg) => {
                    svg.setAttribute('style', 'width: 20px; fill: #595959');
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='space-y-8'>
          <FindAccountTittle
            title='아이디를 찾을 수 없어요.'
            subTitle='입력하신 휴대폰 번호로 가입한 계정이 존재하지 않아요.'
          />
          <div className='space-y-3'>
            <div>
              <Link to={PATH.SIGN_UP}>
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full min-w-[102px]'
                >
                  회원가입 하기
                </button>
              </Link>
            </div>
            <div>
              <Link to={PATH.FIND_ID}>
                <button
                  onClick={() => initializeAuteState(setIsVerification)}
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full min-w-[102px] bg-white text-grey-700'
                >
                  다시 아이디 찾기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
