import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { AuthContainer } from '@/containers/auth/auth.container';
import { PATH } from '@/router/routeList';
import * as path from 'path';

const SideBar = () => {
  const { onLogout } = AuthContainer();
  const navigation = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className='fixed left-0 top-0 h-full w-[200px] border-2 border-l-0 border-t-0 border-b-0 border-solid border-grey-100 bg-white px-2.5'>
      <div className='flex h-20 items-center'>
        <ReactSVG
          src='/assets/icons/outlined/OpenMenu.svg'
          className='cursor-pointer'
          beforeInjection={(svg) => {
            svg.setAttribute('class', 'w-8');
          }}
        />
        <ReactSVG
          src='/assets/icons/Logo.svg'
          className='cursor-pointer'
          beforeInjection={(svg) => {
            svg.setAttribute('class', 'w-[124.5px] ml-2');
          }}
        />
      </div>
      <ul>
        <li className='cursor-pointer text-S/Medium text-grey-800'>
          <div className='flex justify-between p-3'>
            <div className='flex items-center'>
              <ReactSVG
                src='/assets/icons/outlined/Target.svg'
                className='cursor-pointer '
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'w-5 fill-grey-800');
                }}
              />
              <span className='ml-2'>키워드 분석</span>
            </div>
            <ReactSVG
              src='/assets/icons/outlined/Chevronup.svg'
              className='cursor-pointer '
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'w-3 fill-grey-800');
              }}
            />
          </div>
          <ul className='mx-4'>
            <li onClick={() => navigation(PATH.SEARCH_PRODUCTS)}>
              <div
                className={`flex items-center rounded-lg py-2 pl-5 ${
                  pathname === PATH.SEARCH_PRODUCTS &&
                  'bg-orange-100 text-primary-red-orange'
                }`}
              >
                <ReactSVG
                  src='/assets/icons/outlined/Search.svg'
                  className='cursor-pointer'
                  beforeInjection={(svg) => {
                    svg.setAttribute(
                      'class',
                      `w-4 fill-grey-800 ${
                        pathname === PATH.SEARCH_PRODUCTS && 'fill-orange-500'
                      }`,
                    );
                  }}
                />
                <span className='ml-2'>키워드 검색</span>
              </div>
            </li>
            <li onClick={() => navigation(PATH.GET_REPORT_LIST)}>
              <div
                className={`flex items-center rounded-lg py-2 pl-5 ${
                  pathname === PATH.GET_REPORT_LIST &&
                  'bg-orange-100 text-primary-red-orange '
                }`}
              >
                <ReactSVG
                  src='/assets/icons/outlined/FileText.svg'
                  className='cursor-pointer'
                  beforeInjection={(svg) => {
                    svg.setAttribute(
                      'class',
                      `w-4 fill-grey-800 ${
                        pathname === PATH.GET_REPORT_LIST && 'fill-orange-500'
                      }`,
                    );
                  }}
                />
                <span className='ml-2'>리포트 조회</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div className='fixed bottom-[30px]'>
        <ul className='mt-20 cursor-pointer text-S/Bold text-grey-800'>
          <li>
            <button className='button-text-normal-small-grey-false-false-true'>
              도움말
            </button>
          </li>
          <li onClick={onLogout}>
            <button className='button-text-normal-small-grey-false-false-true'>
              로그아웃
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
