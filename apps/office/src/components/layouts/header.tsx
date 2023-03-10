import SvgIcon from '@/util/SvgIcon';
import {PATH, SERVICE_INFO} from "@/router/paths";
import {Link} from "react-router-dom";

const Header = () => {
  return (
  <header className='fixed top-0 left-0 z-50 h-20 w-full bg-white'>
    <div className='container flex h-full items-center  justify-between px-6'>
      <div>
        <Link to={PATH.HOME}>
        <SvgIcon
          iconName='Logo'
          svgProp={{
            width: 166,
            height: 32,
          }}
        />
        </Link>
      </div>
      <div className='space-x-4'>
        <button className='rounded-md border border-grey-400 p-3 text-M/Bold text-grey-800 lg:hidden' onClick={() => window.open(`${SERVICE_INFO}`, "_blank")}>
          로그인
        </button>
        <button className='rounded-md bg-orange-500 p-3 text-M/Bold text-white md:bg-white md:text-orange-500' onClick={() => window.open(`${SERVICE_INFO}`, "_blank")}>
          무료 시작하기
        </button>
      </div>
    </div>
  </header>
)};
export default Header;
