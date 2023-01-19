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
        <button className='border-grey-400 text-M/Bold text-grey-800 rounded-md border p-3 lg:hidden'>
          로그인
        </button>
        <button className='bg-primary-red-orange text-M/Bold md:text-primary-red-orange rounded-md p-3 text-white md:bg-white'>
          무료 시작하기
        </button>
      </div>
    </div>
  </header>
);
export default Header;
