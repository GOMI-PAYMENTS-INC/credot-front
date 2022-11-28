import { Icons } from '@/components/icons';
import LoginModalComponent from '@/components/Modal/login-modal';
import { useModalStatus } from '@/components/Modal/useModalStatus';

const Header = () => {
  const { isModalVisible, toggle } = useModalStatus();
  return (
    <>
      <header className='navbar min-h-[5rem] items-center bg-base-100'>
        <div className='flex-1'>
          <a className='btn-ghost btn text-xl normal-case'>
            <Icons.GomiKeywordLogo className='w-44' />
          </a>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal p-0'>
            <li>
              <button className='button-default' onClick={toggle}>
                로그인
              </button>
              <LoginModalComponent isModalVisible={isModalVisible} hide={toggle} />
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};
export default Header;
