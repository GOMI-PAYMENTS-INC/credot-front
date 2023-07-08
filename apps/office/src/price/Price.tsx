import { Plan, KeywordContents } from '@/price/elements';
import { FAQ } from '@/common';

const Price = () => {
  return (
    <main>
      <section className='flex h-[280px] w-full flex-col items-center justify-center'>
        <div className='absolute top-10 h-[130px] w-[348px] self-center rounded-[348px] bg-orange-500 opacity-20 blur-[132px]' />
        <p className='text-4XL/Bold'>고미인사이트 요금 안내</p>
        <p className='pt-3 text-XL/Bold'>
          나에게 필요한 리포트 분석양에 따라 합리적인 플랜을 선택하세요.
        </p>
      </section>
      <Plan />
      <section>
        <div className='ralative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden'>
          <div className='absolute mb-[200px] h-[130px] w-[348px] self-center rounded-[348px] bg-orange-500 opacity-20 blur-[132px]' />
          <p className='text-4XL/Bold'>키워드 리포트 콘텐츠</p>
        </div>
      </section>
      <KeywordContents />
      <FAQ />
    </main>
  );
};
export default Price;
