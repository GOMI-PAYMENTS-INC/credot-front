import { Default as Layout } from '@/common/layouts';
import { Keyword, NoneKeyword } from '@/search/newSearch/elements';

export const NSearchKeywords = () => {
  return (
    <Layout>
      <div className='flex h-full w-full flex-col items-center bg-grey-50'>
        <div className='absolute right-0 bottom-0 block '>
          <img src='/assets/images/NBackground.png' />
        </div>
        <section className='mx-[192px] h-full max-w-[1060px] overflow-hidden pt-[128px]'>
          <div className='flex flex-col rounded-[20px] border-[1px] py-4 px-[30px]'>
            검색 도구 보일 것 임
          </div>
          <div id='result' className='mt-[30px] flex w-full'>
            <NoneKeyword />
          </div>
        </section>
      </div>
    </Layout>
  );
};
