interface IEcommerceMargin {
  imagePath: string;
}
export const EcommerceMargin = ({ imagePath }: IEcommerceMargin) => {
  return (
    <>
      <section>
        <div className='container py-[100px] lg:py-20 md:mx-auto xs:py-[60px]'>
          <div className='mb-20 lg:mb-[70px] xs:mb-[56px]'>
            <div className='text-center'>
              <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
                알고 계신가요?
              </div>
              <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p>Shopee 매출의 86%는</p>
                <p className='mt-2'>
                  <span className='text-orange-400'>키워드 검색</span>을 통해서 발생한다는
                  사실!
                </p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center gap-x-6 lg:flex-wrap lg:gap-x-0 lg:gap-y-6'>
            <div className='inline-block lg:block lg:basis-[470px] sm:basis-[448px]'>
              <img src={`${imagePath}/Section2/Search.png`} alt='' className='w-full' />
            </div>
            <div className='inline-block lg:block lg:basis-[470px] sm:basis-[448px]'>
              <img
                src={`${imagePath}/Section2/Firstpage.png`}
                alt=''
                className='w-full'
              />
            </div>
            <div className='inline-block lg:block lg:basis-[470px] sm:basis-[448px]'>
              <img src={`${imagePath}/Section2/Click.png`} alt='' className='w-full' />
            </div>
          </div>
        </div>
      </section>
      <section className='bg-grey-50'>
        <div className='container pt-[100px] pb-[74px] lg:py-20 md:mx-auto  md:pb-20 '>
          <div className='mb-20 lg:mb-[70px] xs:mb-[56px]'>
            <div className='text-center'>
              <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
                상위에 노출된 상품들을 분석하여
              </div>
              <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p>
                  <span className='text-orange-400'>시장 정보</span> 와
                  <span className='text-orange-400'> 상품 등록 전략</span>을 한 눈에!
                </p>
              </div>
            </div>
          </div>
          <div className='relative mx-auto mt-5 max-w-[960px] md:max-w-full sm:max-w-[446px] xs:max-w-full'>
            <div className='sm:hidden'>
              <img src={`${imagePath}/Section3/Animation-Desktop.gif`} alt='' />
              <div className='absolute right-20 bottom-10 rounded-[12px] border-[1px] border-grey-300 bg-grey-50 shadow-[0_4px_16px_0px_rgba(0,0,0,0.15)]'>
                <p className='px-[53px] py-4 text-XL/Bold text-grey-900'>브랜드 분석</p>
              </div>
            </div>
            <div className='hidden sm:block'>
              <img src={`${imagePath}/Section3/Animation-Mobile.gif`} alt='' />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
