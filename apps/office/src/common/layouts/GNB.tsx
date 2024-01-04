import { DownOutlined } from '@ant-design/icons';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Dropdown, Space, Tooltip } from 'antd';
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
    <div className='fixed top-0 z-30 flex w-full justify-between border-[1px] border-grey-300 bg-white px-[30px] py-[13px]'>
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
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <a href='#' onClick={logout}>
                      로그아웃
                    </a>
                  ),
                  key: '0',
                },
              ],
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()} className='cursor-pointer'>
              <Space className='flex items-center py-2.5 px-5 text-S/Medium text-grey-800'>
                {replaceOverLength(userAccount || '', 20)}
                <ReactSVG
                  src='/assets/icons/outlined/Chevronup.svg'
                  className={`block`}
                  beforeInjection={(svg) => {
                    svg.setAttribute(
                      'class',
                      `w-3 fill-grey-800 ${isToggleOpen ? '' : 'rotate-180'}`,
                    );
                  }}
                />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default GNB;
