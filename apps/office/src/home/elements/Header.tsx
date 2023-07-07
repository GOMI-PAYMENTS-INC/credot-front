import { ReactSVG } from 'react-svg';
export const Header = () => {
  return (
    <section className='h-[560px] w-full bg-[#FAFAF9]'>
      <div className='container relative h-full'>
        <div className='relative z-10 flex h-full flex-col items-center justify-center text-center'>
          <h1 className='xs:text-2XL/Bold break-keep text-4XL/Bold sm:text-3XL/Bold'>
            <span className='gradientTitle'>데이터 기반의 판매전략 수립</span>을 위한
            <br />
            <span className='gradientTitle '>Shopee 종합 분석</span>솔루션
          </h1>
          <p className='mt-12 text-L/Medium text-grey-700'>
            동남아시아 No.1 마켓플레이스 Shopee의 상위노출 상품들을 분석하여
            <br />
            시장 정보와 최고의 판매 전략을 수립하세요!
          </p>
        </div>
        <div className='absolute left-0  top-0 h-full w-full'>
          <div className='relative left-0 top-0 h-full w-full'>
            <ReactSVG
              src='/assets/icons/Signal.svg'
              className='animation-ico absolute left-[194px] top-[43px] flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.08)]'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'w-8 h-8');
              }}
            />
            <div className='animation-ico absolute left-[38px] top-[180px]  h-3 w-3 rounded-full bg-orange-400'></div>
            <ReactSVG
              src='/assets/icons/Bulb.svg'
              className='animation-ico absolute left-[89px] bottom-[209px] flex h-12  w-12 items-center justify-center rounded-full bg-yellow-400 shadow-[0px_8px_16px_rgba(0,0,0,0.08)] sm:hidden'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'fill-white w-6 h-6');
              }}
            />
            <div className='animation-ico absolute left-[162px] bottom-[106px] h-3.5 w-3.5 rounded-full bg-grey-400'></div>
            <ReactSVG
              src='/assets/icons/Shopee.svg'
              className='animation-ico xs:hidden absolute right-[198px] top-[-10px] flex  h-16 w-16 items-center justify-center rounded-full bg-[#EA501F] shadow-[0px_8px_16px_rgba(0,0,0,0.08)]'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'fill-white w-8 h-9');
              }}
            />
            <div className='animation-ico xs:hidden absolute right-[12px] top-[200px] h-6 w-6 rounded-full bg-orange-200 sm:hidden'></div>
            <ReactSVG
              src='/assets/icons/File.svg'
              className='animation-ico absolute right-[3px] bottom-[31px] flex h-16  w-16 rotate-[-30deg] items-center justify-center rounded-full bg-grey-500 shadow-[0px_8px_16px_rgba(0,0,0,0.08)] sm:hidden'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'fill-white w-6 h-6');
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
