import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { IRoute, PATH, SERVICE_URL } from '@/types/paths';
import { _introPageMovedToSolution } from '@/utils/amplitude.service';
import { CTA_LOCATION, CTA_TYPE } from '@/types/enum.code';

interface HeaderProps {
  route: IRoute;
}
const Header = ({ route }: HeaderProps) => {
  return (
    <header className='fixed top-0 left-0 z-50 h-20 w-full bg-white'>
      <div className='container flex h-full items-center  justify-between px-6'>
        <div>
          <Link to={PATH.HOME}>
            <ReactSVG
              src='/assets/icons/Logo.svg'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'w-[166px] h-8');
              }}
            />
          </Link>
        </div>
        <div className='space-x-4'>
          <button
            className='rounded-md border border-grey-400 p-3 text-M/Bold text-grey-800 lg:hidden'
            onClick={(event) => {
              const eventTarget = event.target as HTMLElement;
              _introPageMovedToSolution(
                route.pageCategory,
                CTA_TYPE.BUTTON,
                CTA_LOCATION.HEADER,
                eventTarget.innerText,
                SERVICE_URL,
              );
            }}
          >
            로그인
          </button>
          <button
            className='rounded-md bg-orange-500 p-3 text-M/Bold text-white'
            onClick={(event) => {
              const eventTarget = event.target as HTMLElement;
              _introPageMovedToSolution(
                route.pageCategory,
                CTA_TYPE.BUTTON,
                CTA_LOCATION.HEADER,
                eventTarget.innerText,
                SERVICE_URL,
              );
            }}
          >
            무료 시작하기
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
