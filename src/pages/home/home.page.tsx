import SearchForm from '@/components/form/search.form';

const HomePage = () => (
  <div className='flex h-screen w-full items-center justify-center'>
    <div className='relative -top-20 w-[67%]'>
      <SearchForm />
    </div>
  </div>
);
export default HomePage;
