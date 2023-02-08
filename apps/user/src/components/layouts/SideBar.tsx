import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { AuthContainer } from '@/containers/auth/auth.container';
import { PATH } from '@/router/routeList';

const SideBar = () => {
  const { onLogout } = AuthContainer();
  const navigate = useNavigate();

  return (
    <div className='fixed left-0 top-0 h-full w-[200px] border-2 border-solid border-grey-100 bg-white'>
      <div className='flex h-20 items-center justify-evenly'>
        <ReactSVG
          src='/assets/icons/outlined/OpenMenu.svg'
          className='h-8 w-8 cursor-pointer'
        />
        <ReactSVG
          src='/assets/icons/Logo.svg'
          className='w-30 h-8 cursor-pointer'
          beforeInjection={(svg) => {
            svg.setAttribute('style', 'width: 140px');
          }}
        />
      </div>
      <ul className='cursor-pointer text-center text-M/Medium'>
        {/* <li>검색결과 분석</li> */}
        <li onClick={() => navigate(PATH.SEARCH_PRODUCTS)}>키워드 검색</li>
        <li onClick={() => navigate(PATH.GET_REPORT_LIST)}>리포트 조회</li>
      </ul>
      <div className='fixed bottom-[30px] ml-[20px]'>
        <ul className='mt-20 cursor-pointer text-S/Bold text-grey-800'>
          <li className='mb-2'>도움말</li>
          <li onClick={onLogout}>로그아웃</li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
