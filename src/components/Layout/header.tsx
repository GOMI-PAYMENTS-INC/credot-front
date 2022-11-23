import { Icons } from '@/components/icons';

const Header = () => (
  <header className='navbar min-h-[5rem] items-center bg-base-100'>
    <div className='flex-1'>
      <a className='btn-ghost btn text-xl normal-case'>
        <Icons.GomiKeywordLogo className='w-44' />
      </a>
    </div>
    <div className='flex-none'>
      <ul className='menu menu-horizontal p-0'>
        <li>
          <a>로그인</a>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
