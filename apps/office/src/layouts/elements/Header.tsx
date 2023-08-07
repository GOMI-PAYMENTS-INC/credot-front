import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderMenu } from '@/layouts/elements/HeaderMenu';
import { PATH } from '@/router/paths';
import {
  CTA_LOCATION,
  CTA_TYPE,
  pageCategoryConvertor,
} from '@/amplitude/amplitude.enum';

import { GlobalEnv } from '@/api/config';
import { openAppWithTag } from '@/utils/openBrowser';
import { GNB_ROUTE } from '@/layouts/constants';

export const Header = () => {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState(pathname || PATH.HOME);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    if (pathname !== current) setCurrent(pathname || PATH.HOME);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b-[1px] border-grey-400 bg-white  ${
        isOpenMenu ? 'h-full' : 'h-20'
      }`}
    >
      {isOpenMenu ? (
        <HeaderMenu
          setIsOpenMenu={setIsOpenMenu}
          current={current}
          setCurrent={setCurrent}
        />
      ) : (
        <div className='container flex h-full items-center  justify-between'>
          <div className='flex items-center'>
            <Link to={PATH.HOME}>
              <ReactSVG
                src='/assets/icons/Logo.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'w-[166px] h-8 xs:w-[140px]');
                }}
              />
            </Link>

            <div className=' ml-[58px] flex items-center justify-center gap-x-[25px] text-center text-M/Medium md:hidden'>
              {GNB_ROUTE.map((route) => {
                const underLine =
                  route.path === current ? 'border-b-orange-500 ' : 'border-b-white';
                return (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setCurrent(route.path)}
                  >
                    <p
                      key={route.path}
                      className={`w-[110px] cursor-pointer border-b-[2px] pt-[14px] pb-3 ${underLine}`}
                    >
                      {route.text}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className='space-x-4 md:flex md:items-center sm:space-x-0'>
            <button
              id='movedToSolution'
              className='rounded-md border border-grey-400 p-3 text-M/Bold text-grey-800 sm:hidden'
              onClick={(event) => {
                openAppWithTag({
                  url: GlobalEnv.serviceUrl,
                  path: pageCategoryConvertor(pathname),
                  type: CTA_TYPE.BUTTON,
                  location: CTA_LOCATION.HEADER,
                  event: event,
                });
              }}
            >
              로그인
            </button>
            <button
              id='movedToSolution'
              className='rounded-md bg-orange-500 p-3 text-M/Bold text-white xs:text-S/Bold'
              onClick={(event) => {
                openAppWithTag({
                  url: GlobalEnv.serviceUrl,
                  path: pageCategoryConvertor(pathname),
                  type: CTA_TYPE.BUTTON,
                  location: CTA_LOCATION.HEADER,
                  event: event,
                });
              }}
            >
              무료 시작하기
            </button>
            <ReactSVG
              src='/assets/icons/Menu.svg'
              className='hidden cursor-pointer md:inline-block md:pl-[14px] sm:pl-[26px] xs:pl-[16px]'
              onClick={() => {
                isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};
