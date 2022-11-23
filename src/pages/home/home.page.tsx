import { Icons } from '@/components/icons';
import Header from '@/components/Layout/header';

const HomePage = () => (
  <div>
    {/* 공통 - 헤더 시작 */}
    <Header />
    {/* 공통 - 헤더 끝 */}
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='relative -top-20 w-[67%]'>
        {/* 공통 - 검색 영역 시작 */}
        <div className='flex w-full min-w-[40rem] gap-2 '>
          <div className='h-[4.5rem] w-[10.5rem] shrink-0'>
            <select className='h-full w-full rounded border border-grey-400 px-3'>
              <option>베트남</option>
            </select>
          </div>
          <div className='h-[4.5rem] w-[10.5rem] shrink-0'>
            <select className='h-full w-full rounded border border-grey-400 px-3'>
              <option>쇼피</option>
            </select>
          </div>
          <div className='h-[4.5rem] w-full'>
            <input
              className='h-full w-full rounded border border-grey-400 px-3'
              placeholder='비타민'
            />
          </div>
        </div>
        {/* 공통 - 검색 영역 끝 */}
      </div>
    </div>
  </div>
);

export default HomePage;
