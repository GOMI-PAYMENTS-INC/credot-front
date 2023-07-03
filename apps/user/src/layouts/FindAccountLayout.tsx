import React, { ReactNode, useEffect, useState } from 'react';

import { Common1Section } from '@/layouts/Common1Section';
import { PATH } from '@/types/enum.code';
import { Link, useLocation } from 'react-router-dom';

export interface IFindAccountLayoutProps {
  children?: ReactNode;
}

export const FindAccountLayout = ({ children }: IFindAccountLayoutProps) => {
  const { pathname } = useLocation();
  const [activeToggle, setToggle] = useState<string>('id');

  useEffect((): void => {
    setToggle(pathname);
  }, []);

  const changeActiveToggle = (e: React.MouseEvent<HTMLAnchorElement>, state: string) => {
    activeToggle !== state ? setToggle(state) : e.preventDefault();
  };

  return (
    <Common1Section>
      <div className='flex h-full flex-col space-y-8'>
        <ul className='grid grid-cols-2 rounded-lg bg-grey-200 p-1 text-center text-L/Medium text-grey-700'>
          <li>
            <Link
              to={PATH.FIND_ID}
              className={`${
                activeToggle === PATH.FIND_ID &&
                ' bg-white font-bold text-grey-900 shadow-[0_0_3px_0_rgba(0,0,0,0.08)]'
              } block rounded-lg py-3`}
              onClick={(event) => {
                changeActiveToggle(event, PATH.FIND_ID);
              }}
            >
              아이디 찾기
            </Link>
          </li>
          <li>
            <Link
              to={PATH.FIND_PASSWORD}
              className={`${
                activeToggle === PATH.FIND_PASSWORD &&
                ' bg-white font-bold text-grey-900 shadow-[0_0_3px_0_rgba(0,0,0,0.08)]'
              } block rounded-lg py-3`}
              onClick={(event) => {
                changeActiveToggle(event, PATH.FIND_PASSWORD);
              }}
            >
              비밀번호 찾기
            </Link>
          </li>
        </ul>
        <div className='flex h-full flex-col justify-between'>{children}</div>
      </div>
    </Common1Section>
  );
};
