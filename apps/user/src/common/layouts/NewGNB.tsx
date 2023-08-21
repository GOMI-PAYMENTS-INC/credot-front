import { ReactSVG } from 'react-svg';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';

import { routeList } from '@/router/routeList';

import { menuData } from '@/common/layouts/sidebar/constants';
import { PATH } from '@/router/routeList';
import { openBrowser } from '@/utils/openBrowser';
import { _amplitudeMovedToUserGuide } from '@/amplitude/amplitude.service';

import { useRecoilValue } from 'recoil';
import { UserAtom } from '@/atom/auth/auth-atom';

const GNB = () => {
  const userAccount = useRecoilValue(UserAtom)?.me.email;
  const [MENU] = menuData;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ route }] = matchRoutes(routeList, pathname) || [];

  return (
    <header className='fixed top-0 z-30 flex w-full justify-between border-[1px] border-grey-300 bg-white px-6 py-[18px]'>
      <div className='flex items-center'>
        <Link to={PATH.SEARCH_PRODUCTS}>
          <ReactSVG
            src='/assets/icons/Logo.svg'
            className='cursor-pointer'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'w-[166px]');
            }}
          />
        </Link>
        <ul className='ml-[58px] flex gap-2.5'>
          {MENU.children.map((menu) => {
            const highLightEffect =
              route.path === menu.path
                ? 'text-orange-500 bg-orange-100'
                : 'text-S/Regular text-grey-800';
            return (
              <li
                key={menu.key}
                className={`py-3 px-5 text-S/Medium ${highLightEffect} cursor-pointer rounded-lg`}
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
          className='flex items-center justify-center rounded-lg border-[1px] border-grey-500 px-5'
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
          <p className='ml-2 text-S/Medium text-grey-800'>사용자 가이드</p>
        </button>

        <div className='ml-2.5 flex items-center'>
          <div className='my-3 mx-5 flex w-[120px] cursor-pointer items-center text-S/Medium text-grey-800'>
            {userAccount}
            <ReactSVG
              src='/assets/icons/outlined/Chevronup.svg'
              className={`ml-3 block`}
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'w-3 fill-grey-800');
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GNB;
