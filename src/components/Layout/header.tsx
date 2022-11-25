import { Icons } from '@/components/icons';
import { JoinModalComponent } from '@/components/Modal/join-modal';
import LoginModalComponent from '@/components/Modal/login-modal';
import { useModalStatus } from '@/components/Modal/useModalStatus';

const Header = () => {
  const [isLoginModalVisible, toggleLoginModal] = useModalStatus();
  const [isJoinModalVisible, toggleJoinModal] = useModalStatus();

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
              <button className='button-default' onClick={toggleLoginModal}>
                로그인
              </button>
              <button className='button-default' onClick={toggleJoinModal}>
                회원가입
              </button>
              <LoginModalComponent
                isModalVisible={isLoginModalVisible}
                hide={toggleLoginModal}
              />
              <JoinModalComponent
                isModalVisible={isJoinModalVisible}
                hide={toggleJoinModal}
              />
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};
export default Header;
