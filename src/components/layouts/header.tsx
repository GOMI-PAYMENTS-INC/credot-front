import { Link } from 'react-router-dom';

import { Icons } from '@/components/icons';
import { Paths } from '@/router/paths';

const Header = () => (
  <header className='navbar min-h-[5rem] items-center bg-base-100'>
    <div className='flex-1'>
      <Link to={Paths.home} className='btn-ghost btn text-xl normal-case'>
        <Icons.GomiKeywordLogo className='w-44' />
      </Link>
    </div>
    <div className='flex-none'>
      <ul className='menu menu-horizontal p-0'>
        <li>
          <Link to={Paths.signIn}>
            <button className='button-default'>로그인</button>
          </Link>
          <Link to={Paths.signUp}>
            <button className='button-default'>회원가입</button>
          </Link>
        </li>
      </ul>
    </div>
  </header>
);
export default Header;
