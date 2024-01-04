import { useGoogleLogin } from '@react-oauth/google';
import { Button, Tooltip } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useRecoilState, useRecoilValue } from 'recoil';

import { GoogleAtom, UserAtom } from '@/atom';
import { PATH } from '@/common/constants';
import { useRequestGoogleToken, useValidateGoogleToken } from '@/hooks/google.hook';
import { useLogout } from '@/hooks/user.hook';
import { replaceOverLength } from '@/utils/replaceOverLength';

const GNB = () => {
  const [isGoogleAuth] = useRecoilState(GoogleAtom);
  const { logout } = useLogout();
  const userAccount = useRecoilValue(UserAtom)?.me.email;
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { mutate } = useRequestGoogleToken();

  useValidateGoogleToken();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      mutate({
        code: codeResponse.code,
      });
      console.log(codeResponse);
    },
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
  });

  return (
    <header className='fixed top-0 z-30 flex w-full justify-between border-[1px] border-grey-300 bg-white px-[40px] py-[13px]'>
      <div className='flex items-center'>
        <Link to={PATH.HOME}>
          <ReactSVG
            src='/assets/logo.svg'
            className='cursor-pointer'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'w-[138px] h-[27px]');
            }}
          />
        </Link>
      </div>

      <div className='flex h-[44px]'>
        <div className='self-center'>
          {isGoogleAuth && <Button disabled>구글 인증 완료</Button>}
          {!isGoogleAuth && (
            <Tooltip
              defaultOpen
              placement='left'
              title='이노페이 접속을 위해 인증을 부탁드려요!'
            >
              <Button onClick={() => login()}>구글 인증</Button>
            </Tooltip>
          )}
        </div>
        <div className='relative ml-2 flex items-center'>
          <div
            className='flex w-[208px] cursor-pointer items-center justify-end py-2.5 px-5  text-S/Medium text-grey-800'
            onClick={() => setIsToggleOpen(!isToggleOpen)}
          >
            {replaceOverLength(userAccount || '', 20)}
            <ReactSVG
              src='/assets/icons/outlined/Chevronup.svg'
              className={`ml-3 block`}
              beforeInjection={(svg) => {
                svg.setAttribute(
                  'class',
                  `w-3 fill-grey-800 ${isToggleOpen ? '' : 'rotate-180'}`,
                );
              }}
            />
          </div>
          {isToggleOpen && (
            <div className='absolute top-[52px] right-0 z-10 w-[208px] rounded-lg bg-white shadow-[0px_2px_41px_rgba(0,0,0,0.1)]'>
              <ul className=''>
                <li
                  className='cursor-pointer px-4 py-3 text-S/Regular text-red-700'
                  onClick={() => logout()}
                >
                  로그아웃
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default GNB;
