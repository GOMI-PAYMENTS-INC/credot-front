import { ReactSVG } from 'react-svg';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { routeList } from '@/router/routeList';

import { menuData } from '@/common/layouts/sidebar/constants';
import { PATH } from '@/router/routeList';
import { openBrowser } from '@/utils/openBrowser';
import { _amplitudeMovedToUserGuide } from '@/amplitude/amplitude.service';
import { isIncluded } from '@/utils/isIncluded';

import { useRecoilValue } from 'recoil';
import { UserAtom } from '@/atom/auth/auth-atom';
import { signInApi } from '@/auth/signIn/api';
import { replaceOverLength } from '@/utils/replaceOverLength';

const GNB = () => {
  const { onLogout } = signInApi();
  const userAccount = useRecoilValue(UserAtom)?.me.email;
  const [MENU] = menuData;
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ route }] = matchRoutes(routeList, pathname) || [];

  return (
    <header className='fixed top-0 z-30 flex w-full justify-between border-[1px] border-grey-300 bg-white px-[60px] py-[13px]'>
      <div className='flex items-center'>
        <Link to={PATH.SEARCH_PRODUCTS}>
          <ReactSVG
            src='/assets/icons/Logo.svg'
            className='cursor-pointer'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'w-[138px] h-[27px]');
            }}
          />
        </Link>
        <ul className='ml-[58px] flex gap-2.5'>
          {MENU.children.map((menu) => {
            const isFit =
              isIncluded(route.path, ...menu.activePath) || route.path === menu.path;
            const highLightEffect = isFit
              ? 'text-orange-500 bg-orange-100'
              : 'text-M/Regular text-grey-800';
            return (
              <li
                key={menu.key}
                className={`py-2.5 px-5 text-M/Medium ${highLightEffect} cursor-pointer rounded-lg`}
                onClick={() => {
                  navigate(menu.path);
                }}
              >
                {menu.title}
              </li>
            );
          })}
        </ul>
      </div>

      <div className='flex h-[44px]'>
        <button
          className='flex items-center justify-center rounded-lg border-[1px] border-grey-300 px-5'
          onClick={() => {
            openBrowser('https://gomicorp.notion.site/611d950ad238426ba16a96eb0631f739');
            _amplitudeMovedToUserGuide('lnb');
          }}
        >
          <ReactSVG
            src='/assets/icons/outlined/QuestionCircle.svg'
            beforeInjection={(svg) => {
              svg.setAttribute('class', `w-[18px] h-[18px] fill-grey-800`);
            }}
          />
          <p className='ml-2 text-M/Medium text-grey-800'>사용자 가이드</p>
        </button>

        <div className='relative ml-2.5 flex items-center'>
          <div
            className='flex w-[208px] cursor-pointer items-center justify-end py-2.5 px-5 text-M/Medium text-grey-800'
            onClick={() => setIsToggleOpen(!isToggleOpen)}
          >
            {replaceOverLength(userAccount || '', 18)}
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
                  onClick={() => onLogout()}
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
