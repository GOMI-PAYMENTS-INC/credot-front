import ModalComponent from '@/components/Modal/modal';

interface LoginModalComponentProps {
  isModalVisible: boolean;
  hide: () => void;
}

const LoginModalComponent = ({ isModalVisible, hide }: LoginModalComponentProps) => (
  <>
    <ModalComponent isModalVisible={isModalVisible} hide={hide} title='로그인'>
      <form action=''>
        <div className='space-y-5'>
          <div className='space-y-2'>
            <input
              className=' w-full rounded-lg border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
              type='email'
              name='email'
              placeholder='이메일'
            />
            <p className='text-100-regular text-functional-error'>
              존재하지 않는 이메일 주소입니다.{' '}
            </p>
          </div>
          <div className='space-y-2'>
            <input
              className='w-full content-center rounded-lg border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
              type='password'
              name='password'
              placeholder='비밀번호'
            />
            <p className=' text-100-regular text-functional-error'>
              비밀번호가 일치하지 않습니다.{' '}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember_me'
                name='remember_me'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 bg-blue-500 focus:ring-blue-400'
              />
              <label htmlFor='remember_me' className='ml-2 block text-200-regular '>
                로그인 상태 유지
              </label>
            </div>
            <div>
              <a
                href='#'
                className='relative pr-2 text-200-regular after:absolute after:top-0 after:right-0 after:block after:h-full after:w-px after:bg-primary-black'
              >
                아이디 찾기
              </a>
              <a href='#' className='pl-2 text-200-regular '>
                비밀번호 찾기
              </a>
            </div>
          </div>
          <div className='divide-y'>
            <div className='pb-5'>
              <button
                type='submit'
                className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-500-medium text-white'
              >
                로그인
              </button>
            </div>
            <div className='pt-5'>
              <button
                type='button'
                className='text-400-regular flex w-full cursor-pointer justify-center rounded border border-[#cccccc] p-2.5 text-300-regular'
              >
                구글 로그인
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className='pt-5 text-center text-gray-400'>
        <span className='text-200-regular'>
          아직 회원이 아니세요?
          <a href='#' className='ml-2 text-200-bold text-primary-red-orange'>
            회원가입
          </a>
        </span>
      </div>
    </ModalComponent>
  </>
);

export default LoginModalComponent;
