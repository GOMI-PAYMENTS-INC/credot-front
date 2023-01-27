import { Fragment } from 'react';

import { AuthContainer } from '@/containers/auth/auth.container';

const SideBar = () => {
  const { onLogout } = AuthContainer();

  return (
    <Fragment>
      <div className='block h-full w-1/6 border-2 border-solid border-sky-500'>
        <div className='block h-5/6 border-2 border-solid border-sky-500'>
          <p>검색결과 분석</p>
          <p>검색결과 분석</p>
        </div>
        <div className='ml-5 block h-1/6 border-2 border-solid border-sky-500'>
          <ul className='mt-20 cursor-pointer text-S/Bold text-grey-800'>
            <li className='mb-2'>도움말</li>
            <li onClick={onLogout}>로그아웃</li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
export default SideBar;
