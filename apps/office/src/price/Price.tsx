import { Plan, KeywordContents } from '@/price/elements';
import { FAQ } from '@/common';
import { PRICE_QNA } from '@/common/constants';
import { useEffect } from 'react';
import { _introPricingPageViewed } from '@/amplitude/amplitude.service';

const Price = () => {
  useEffect(() => {
    _introPricingPageViewed();
  }, []);

  return (
    <main>
      <section className='flex h-[280px] w-full flex-col items-center justify-center'>
        <div className='absolute top-10 h-[130px] w-[348px] self-center rounded-[348px] bg-orange-500 opacity-20 blur-[132px]' />
        <p className='text-4XL/Bold xs:text-3XL/Bold'>요금 안내</p>
        <p className='pt-3 text-XL/Bold sm:text-M/Bold xs:text-S/Bold'>
          무료로 시작하고, 분석량이 많아지면 그때 업그레이드하세요.
        </p>
      </section>
      <Plan />
      <KeywordContents />
      <FAQ list={PRICE_QNA} />
    </main>
  );
};
export default Price;
