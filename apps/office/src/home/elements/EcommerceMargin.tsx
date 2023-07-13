interface IEcommerceMargin {
  imagePath: string;
}
export const EcommerceMargin = ({ imagePath }: IEcommerceMargin) => {
  return (
    <>
      <section>
        <div className='xs:py-[60px] container py-[100px] md:mx-auto lg:py-20'>
          <div className='xs:mb-[56px] mb-20 lg:mb-[70px]'>
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
            <div className='inline-block sm:basis-[448px] lg:block lg:basis-[470px]'>
              <img src={`${imagePath}/Section2/Search.png`} alt='' className='w-full' />
            </div>
            <div className='inline-block sm:basis-[448px] lg:block lg:basis-[470px]'>
              <img
                src={`${imagePath}/Section2/Firstpage.png`}
                alt=''
                className='w-full'
              />
            </div>
            <div className='inline-block sm:basis-[448px] lg:block lg:basis-[470px]'>
              <img src={`${imagePath}/Section2/Click.png`} alt='' className='w-full' />
            </div>
          </div>
        </div>
      </section>
      <section className='bg-grey-50'>
        <div className='container pt-[100px] pb-[74px] md:mx-auto md:pb-20  lg:py-20 '>
          <div className='xs:mb-[56px] mb-20 lg:mb-[70px]'>
            <div className='text-center'>
              <div className='text-2XL/Bold text-grey-800 md:text-XL/Bold'>
                Shopee 키워드 검색결과 상위 50개 상품들을 분석하여
              </div>
              <div className='mt-6 break-keep text-3XL/Bold md:text-2XL/Bold'>
                <p>
                  <span className='text-orange-400'>시장 정보</span> 와
                  <span className='text-orange-400'> 상위 노출 노하우</span>를 한 눈에!
                </p>
              </div>
            </div>
          </div>
          <div className='xs:max-w-full mx-auto mt-5 max-w-[960px] sm:max-w-[446px] md:max-w-full'>
            <div className='sm:hidden'>
              <img src={`${imagePath}/Section3/Animation-Desktop.gif`} alt='' />
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
