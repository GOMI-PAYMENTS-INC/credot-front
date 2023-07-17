import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { openBrowser } from '@/utils/openBrowser';

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

        <div className='space-x-4 sm:space-x-0 md:flex md:items-center'>
          <button
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
            className='rounded-md bg-orange-500 p-3 text-M/Bold text-white'
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
            className='xs:pl-[16px] hidden cursor-pointer sm:pl-[26px] md:inline-block md:pl-[14px]'
            onClick={() => {
              isOpenMenu ? setIsOpenMenu(false) : setIsOpenMenu(true);
            }}
          />
        </div>
        {isOpenMenu && (
          <div className='fixed top-0 right-0 hidden w-[386px] justify-start bg-white md:flex md:flex-col'>
            <div className='m-5'>
              <div className='flex justify-between'>
                <ReactSVG
                  src='/assets/favicon.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'h-8');
                  }}
                />
                <ReactSVG
                  src='/assets/icons/Close.svg'
                  className='cursor-pointer'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'h-8');
                  }}
                  onClick={() => setIsOpenMenu(false)}
                />
              </div>
              <ul className='mt-[50px] list-disc gap-y-[14px] text-XL/Medium'>
                {GNB_ROUTE.map((route) => {
                  const textColor =
                    route.path === current ? 'text-orange-500 ' : 'text-grey-900';
                  return (
                    <li
                      key={route.path}
                      className={`marker:${textColor} ${textColor} ml-6 cursor-pointer`}
                    >
                      <Link
                        to={route.path}
                        onClick={() => {
                          setIsOpenMenu(false);
                          setCurrent(route.path);
                        }}
                      >
                        <p>{route.text}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className='mt-[132px] flex justify-between text-XL/Regular text-grey-800'>
                <button
                  className='flex items-center'
                  onClick={() =>
                    openBrowser(
                      'https://gomicorp.notion.site/611d950ad238426ba16a96eb0631f739',
                    )
                  }
                >
                  <ReactSVG
                    src='/assets/icons/QuestionCircle.svg'
                    className='cursor-pointer '
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', `w-5 fill-grey-800`);
                    }}
                  />
                  <span className='ml-2 cursor-pointer'>사용자 가이드</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
