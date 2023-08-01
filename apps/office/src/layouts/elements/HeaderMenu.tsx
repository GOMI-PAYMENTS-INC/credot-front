import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router-dom';

import { openBrowser } from '@/utils/openBrowser';
import { GNB_ROUTE } from '@/layouts/constants';
import type { Dispatch, SetStateAction } from 'react';

interface IHeaderMenu {
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
  current: string;
  setCurrent: Dispatch<SetStateAction<string>>;
}

export const HeaderMenu = ({ setIsOpenMenu, current, setCurrent }: IHeaderMenu) => {
  const navigate = useNavigate();

  return (
    <div className='hidden h-full w-full justify-start md:flex md:flex-col'>
      <div className='bg-white'>
        <div className='flex items-center justify-between p-6 xs:px-5'>
          <ReactSVG
            src='/assets/favicon.svg'
            onClick={() => {
              setIsOpenMenu(false);
              navigate('/');
              setCurrent('/');
            }}
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'h-8 w-8 xs:h-7 xs:w-[27px] cursor-pointer');
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
        <ul className='gap-y-[14px] text-L/Bold xs:text-M/Bold'>
          {GNB_ROUTE.map((route) => {
            const textColor =
              route.path === current
                ? { text: 'text-orange-500 bg-orange-100', icon: 'fill-orange-400' }
                : { text: 'text-grey-900', icon: 'fill-grey-900' };
            return (
              <li
                key={route.path}
                className={`marker:${textColor.text} ${textColor.text} flex cursor-pointer py-5 px-6`}
                onClick={() => {
                  setIsOpenMenu(false);
                  navigate(route.path);
                  setCurrent(route.path);
                }}
              >
                <ReactSVG
                  src={`/assets/icons/${route.icon}.svg`}
                  className='mr-[6px]'
                  beforeInjection={(svg) => svg.setAttribute('class', textColor.icon)}
                />

                <p>{route.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex justify-between bg-grey-200 px-6 py-5 text-L/Bold text-grey-800 xs:text-M/Bold'>
        <button
          className='flex w-full items-center justify-between'
          onClick={() =>
            openBrowser('https://gomicorp.notion.site/611d950ad238426ba16a96eb0631f739')
          }
        >
          <div className='flex'>
            <ReactSVG
              src='/assets/icons/QuestionCircle.svg'
              className='cursor-pointer '
              beforeInjection={(svg) => {
                svg.setAttribute('class', `w-6 h-6 fill-grey-800`);
              }}
            />
            <span className='ml-2 cursor-pointer'>사용자 가이드</span>
          </div>
          <ReactSVG
            src='/assets/icons/LeftArrow.svg'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'w-6 rotate-180');
            }}
          />
        </button>
      </div>
    </div>
  );
};
