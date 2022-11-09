import { Icons } from '@/components/icons';

const HomePage = () => (
  <div className='flex h-screen w-full items-center justify-center'>
    <div className='relative -top-20 w-[67%]'>
      <div className='mb-10'>
        <Icons.GomiKeywordLogo className='w-60' />
      </div>
      <div className='flex w-full min-w-[40rem] gap-2'>
        <div className='h-[4.5rem] w-[15%]'>
          <select className='h-full w-full rounded border border-grey-400' />
        </div>
        <div className='h-[4.5rem] w-[15%]'>
          <select className='h-full w-full rounded border border-grey-400' />
        </div>
        <div className='h-[4.5rem] w-[70%]'>
          <input className='h-full w-full rounded border border-grey-400' />
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
