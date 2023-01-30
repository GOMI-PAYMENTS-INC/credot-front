import { Link } from 'react-router-dom';

import { Icons } from '@/components/icons';
import { PATH } from '@/router/routeList';

export interface HeaderProps {
  onLogout: () => void;
  isLogin: boolean;
}
const Header = ({ onLogout, isLogin }: HeaderProps) => (
  <header className='navbar min-h-[5rem] items-center bg-base-100'>
    <div className='flex-1'>
      <Link to={PATH.SEARCH_PRODUCTS} className='btn-ghost btn text-xl normal-case'>
        <Icons.GomiKeywordLogo className='w-44' />
      </Link>
    </div>
    <div className='flex-none'>
      <ul className='menu menu-horizontal p-0'>
        <li>
          {!isLogin ? (
            <Link to={PATH.SIGN_IN}>
              <button className='button-default'>로그인</button>
            </Link>
          ) : (
            <button className='button-default' onClick={onLogout}>
              로그아웃
            </button>
          )}
          {!isLogin && (
            <Link to={PATH.SIGN_UP}>
              <button className='button-default'>회원가입</button>
            </Link>
          )}
        </li>
      </ul>
    </div>
  </header>
);
export default Header;
