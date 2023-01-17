import { Link } from 'react-router-dom';

import { Icons } from '@/components/icons';
import { Paths } from '@/router/paths';
import SvgIcon from '@/util/SvgIcon';

const Header = () => (
  <header className='fixed top-0 left-0 z-50 h-20 w-full bg-white'>
    <div className='container flex h-full items-center  justify-between px-6'>
      <div>
        <SvgIcon
          iconName='Logo'
          svgProp={{
            width: 166,
            height: 32,
          }}
        />
      </div>
      <div className='space-x-4'>
        <button className='rounded-md border border-grey-400 p-3 text-M/Bold text-grey-800 lg:hidden'>
          로그인
        </button>
        <button className='rounded-md bg-primary-red-orange p-3 text-M/Bold text-white md:bg-white md:text-primary-red-orange'>
          무료 시작하기
        </button>
      </div>
    </div>
  </header>
);
export default Header;
