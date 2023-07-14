interface IPromotion {
  imagePath: string;
}
export const Promotion = ({ imagePath }: IPromotion) => {
  return (
    <section>
      <div className='container py-[120px] md:mx-auto lg:py-[60px]'>
        <div className='mx-auto max-w-[1096px]'>
          <div className='flex items-center justify-between rounded-[49px] bg-grey-200 pl-[52px] sm:flex-wrap sm:justify-items-start sm:pb-0 md:py-10 md:pl-[33px] lg:py-[42px] '>
            <div className='break-keep'>
              <div className='mb-[13px] inline-block rounded-[33px] bg-grey-900 px-5 py-[7px]'>
                <span className='text-S/Medium text-white'>Event 2023.03~ 종료시</span>
              </div>
              {/* TODO: BM기능 들어갈 때 활성화
              <div className='mb-[20px] text-3XL/Bold'>월 무료 10회 이벤트</div>
              <div className='text-grey-700'>
                키워드 분석은 매월 10회까지 무료로 가능해요.
                <br />
                지금 바로 판매하고자 하는 상품을 분석해보세요!
              </div> */}
              <div className='mb-[20px] text-3XL/Bold'>무제한 사용 이벤트</div>
              <div className='text-grey-700'>
                고미인사이트는 현재 무료 서비스 이벤트를 진행중이에요.
                <br />
                별도의 이벤트 종료 안내까지는 무제한 리포트 조회가 가능해요!
              </div>
            </div>

            <div className='xs:mt-[33px] sm:mt-[55px]'>
              <img src={`${imagePath}/Section10/Ticket.png`} alt='' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
