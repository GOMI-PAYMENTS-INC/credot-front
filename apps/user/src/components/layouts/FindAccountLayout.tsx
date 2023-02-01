import { ReactNode } from 'react';

import { ReactSVG } from 'react-svg';
import { Common1Section } from '@/components/layouts/Common1Section';
import { PATH } from '@/router/routeList';
import { Link } from 'react-router-dom';

export interface IFindAccountLayoutProps {
  children?: ReactNode;
}
export const FindAccountLayout = ({ children }: IFindAccountLayoutProps) => (
  <Common1Section>
    <div className='flex h-full flex-col space-y-8'>
      {/*TODO 아이디찾기/ 비밀번호 찾기 공통 영역 시작*/}
      <div>
        <ul className='grid grid-cols-2 rounded-lg bg-grey-200 p-1 text-center text-L/Medium text-grey-700'>
          <li className='rounded-lg bg-white py-3 font-bold text-grey-900 shadow-[0_0_3px_0_rgba(0,0,0,0.08)]'>
            <Link to={PATH.FIND_ID}>아이디 찾기</Link>
          </li>
          <li className='rounded-lg py-3'>
            <Link to={PATH.FIND_PASSWORD}>비밀번호 찾기</Link>
          </li>
        </ul>
      </div>
      {/*끝*/}

      {children}
    </div>
  </Common1Section>
);
