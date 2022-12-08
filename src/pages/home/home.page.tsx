import SearchForm from '@/components/form/search.form';
import Header from '@/components/layouts/header';

const HomePage = () => (
  <div>
    {/* 공통 - 헤더 시작 */}
    <Header />
    {/* 공통 - 헤더 끝 */}
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='relative -top-20 w-[67%]'>
        {/* 공통 - 검색 영역 시작 */}
        <SearchForm />
        {/* 공통 - 검색 영역 끝 */}
      </div>
    </div>
  </div>
);
export default HomePage;
