import { useState } from 'react';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useRecoilValue } from 'recoil';

import { UserAtom } from '@/atom';
import { PATH } from '@/common/constants';
import { useLogout } from '@/hooks/user.hook';
import { replaceOverLength } from '@/utils/replaceOverLength';

const GNB = () => {
  const { logout } = useLogout();
  const userAccount = useRecoilValue(UserAtom)?.me.email;
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <header className='fixed top-0 z-30 flex w-full justify-between border-[1px] border-grey-300 bg-white px-[40px] py-[13px]'>
      <div className='flex items-center'>
        <Link to={PATH.BREAKDOWN}>
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
