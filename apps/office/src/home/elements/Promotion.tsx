interface IPromotion {
  imagePath: string;
}
export const Promotion = ({ imagePath }: IPromotion) => {
  return (
    <section>
      <div className='container py-[120px] lg:py-[60px] md:mx-auto'>
        <div className='mx-auto max-w-[1096px]'>
          <div className='flex items-center justify-between rounded-[49px] bg-grey-200 px-[62px] py-10 lg:py-[42px] md:px-5 sm:flex-wrap sm:justify-items-start sm:pb-0 '>
            <div className='break-keep xs:w-full xs:justify-center xs:text-center'>
              <div className='mb-[13px] inline-block rounded-[33px] bg-grey-900 px-5 py-[7px]'>
                <span className='text-S/Medium text-white'>2023.09.18~</span>
              </div>
              <div className='mb-[20px] text-3XL/Bold'>월 무료 5회 이벤트</div>
              <div className='text-grey-700'>
                키워드 분석은 매월 5회까지 무료로 가능해요.
                <br />
                지금 바로 판매하고자 하는 상품을 분석해보세요!
              </div>
            </div>

            <div className='flex sm:mt-[55px] sm:w-full sm:flex-col sm:items-end xs:mt-[33px] xs:items-center'>
              <img
                className='w-[490px] md:w-[330px] xs:w-[385px]'
                src={`${imagePath}/Section10/Ticket.png`}
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
