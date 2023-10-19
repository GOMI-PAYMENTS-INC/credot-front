import { useState } from 'react';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useRecoilValue } from 'recoil';

import {
  _amplitudeMovedToUserGuide,
} from '@/amplitude/amplitude.service';
import { UserAtom } from '@/atom';
import { signInApi } from '@/auth/signIn/api';
import { PATH } from '@/common/constants';
import { MENU_DATA } from '@/common/layouts/sidebar/constants';
import UseCustomTooltip from '@/components/UseCustomTooltip';
import { routeList } from '@/router/routeList';
import { isIncluded } from '@/utils/isIncluded';
import { openBrowser } from '@/utils/openBrowser';
import { replaceOverLength } from '@/utils/replaceOverLength';

const GNB = () => {
  const { onLogout } = signInApi();
  const userAccount = useRecoilValue(UserAtom)?.me.email;
  const [MENU] = MENU_DATA;
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
              ? 'text-orange-500 bg-orange-100 text-S/Bold'
              : 'text-S/Regular text-grey-800';
            return (
              <li
                key={menu.key}
                className={`py-2.5 px-5  text-S/Medium ${highLightEffect} cursor-pointer rounded-lg`}
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
        <div className='flex gap-[30px] border-r-[1px] border-grey-300 pr-[30px]'>
          <UseCustomTooltip
            component={
              <button
                onClick={() => {
                  openBrowser(
                    'https://capable-soy-f58.notion.site/6c820f6f0afe4b959b0bf307156dac5c?pvs=4',
                  );
                  _amplitudeMovedToUserGuide('lnb');
                }}
              >
                <ReactSVG
                  src='/assets/icons/outlined/QuestionCircle.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute(
                      'class',
                      `w-[26px] h-[26px] fill-grey-800  hover:fill-orange-400`,
                    );
                  }}
                />
              </button>
            }
            content={<p className='text-M/Medium'>사용자 가이드</p>}
          />
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
