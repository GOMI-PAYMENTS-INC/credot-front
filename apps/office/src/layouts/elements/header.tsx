import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { IRoute, PATH } from '@/router/paths';
import { _introPageMovedToSolution } from '@/amplitude/amplitude.service';
import { CTA_LOCATION, CTA_TYPE } from '@/amplitude/amplitude.enum';
import { GlobalEnv } from '@/api/config';
import { openBrowser } from '@/utils/openBrowser';
import { GNB_ROUTE } from '@/layouts/constants';

interface HeaderProps {
  route: IRoute;
}
const Header = ({ route }: HeaderProps) => {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState(pathname || PATH.HOME);

  useEffect(() => {
    if (pathname !== current) setCurrent(pathname || PATH.HOME);
  }, [pathname]);

  return (
    <header className='fixed top-0 left-0 z-50 h-20 w-full bg-white'>
      <div className='container flex h-full items-center  justify-between px-6'>
        <div className='flex items-center'>
          <Link to={PATH.HOME}>
            <ReactSVG
              src='/assets/icons/Logo.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'w-[166px] h-8');
              }}
            />
          </Link>

          {/* <div className='ml-[58px] flex items-center justify-center gap-x-[50px] text-center text-M/Medium sm:hidden'>
            {GNB_ROUTE.map((route) => {
              const underLine =
                route.path === current ? 'border-b-orange-500 ' : 'border-b-white';
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  onClick={() => {
                    setCurrent(route.path);
                  }}
                >
                  <p
                    key={route.path}
                    className={`w-20 cursor-pointer border-b-[2px] pt-[14px] pb-3 ${underLine}`}
                  >
                    {route.text}
                  </p>
                </Link>
              );
            })}
          </div> */}
        </div>

        <div className='space-x-4'>
          <button
            className='rounded-md border border-grey-400 p-3 text-M/Bold text-grey-800 md:hidden'
            onClick={(event) => {
              openBrowser(GlobalEnv.serviceUrl);

              const eventTarget = event.target as HTMLElement;
              _introPageMovedToSolution(
                route.pageCategory,
                CTA_TYPE.BUTTON,
                CTA_LOCATION.HEADER,
                eventTarget.innerText,
              );
            }}
          >
            로그인
          </button>
          <button
            className='rounded-md bg-orange-500 p-3 text-M/Bold text-white'
            onClick={(event) => {
              openBrowser(GlobalEnv.serviceUrl);

              const eventTarget = event.target as HTMLElement;
              _introPageMovedToSolution(
                route.pageCategory,
                CTA_TYPE.BUTTON,
                CTA_LOCATION.HEADER,
                eventTarget.innerText,
              );
            }}
          >
            무료 시작하기
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
