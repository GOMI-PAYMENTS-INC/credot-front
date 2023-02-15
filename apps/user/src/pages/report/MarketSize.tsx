import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';

export const MartketSize = () => {
  return (
    <section className='col-span-full w-[980px]'>
      <h1 className='text-XL/Bold text-black'>
        시장 규모
        <ReactSVG
          id='anchor-market-size'
          src='/assets/icons/outlined/QuestionCircle.svg'
          className='inline-block pl-[7px]'
        />
        <Tooltip
          anchorId='anchor-market-size'
          html='리포트 생성일 기준, 최근 30일간 상위 30개 상품들이 판매된 매출과 판매량 정보에요.'
          place='right'
          className='text-XS/Regular text-grey-800' // FIXME: tooltip에는 className 속성 어떻게 적용할지 생각
        />
      </h1>
      <div className='pt-6'>
        <div className='border-grey-30 flex w-full border-t-[1px] border-b-[1px] '>
          <div className='w-1/2'>
            <div className='h-10 w-full bg-grey-100 pl-5 text-left '>
              <h1 className='pt-2.5 text-S/Medium text-grey-900'>매출</h1>
            </div>
            <div className='my-7 flex'>
              <div className='ml-5 w-1/2'>
                <p className='text-S/Medium text-grey-800'>매출 합계</p>
                <div className='mt-2 flex items-center '>
                  <span className='mr-1 text-2XL/Bold text-grey-900'>100,000</span>
                  <span className='text-L/Medium text-grey-800'>원</span>
                </div>
              </div>
              <div className='w-1/2 border-l-[1px] border-dashed pl-5'>
                <p className='text-S/Medium text-grey-800'>평균 매출</p>
                <div className='mt-2 flex items-center '>
                  <span className='mr-1 text-2XL/Regular text-grey-900'>973,200</span>
                  <span className='text-L/Medium text-grey-800'>원</span>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/2 border-l-[1px]'>
            <div className='h-10 w-full bg-grey-100 text-left'>
              <h1 className='pt-2.5 pl-5 text-S/Medium text-grey-900'>판매량</h1>
            </div>
            <div className='my-7 flex'>
              <div className='ml-5 w-1/2'>
                <p className='text-S/Medium text-grey-800'>판매량 합계</p>
                <div className='mt-2 flex items-center '>
                  <span className='mr-1 text-2XL/Regular text-grey-900'>73,200</span>
                  <span className='text-L/Medium text-grey-800'>개</span>
                </div>
              </div>
              <div className='w-1/2 border-l-[1px] border-dashed pl-5'>
                <p className='text-S/Medium text-grey-800'>평균 판매량</p>
                <div className='mt-2 flex items-center '>
                  <span className='mr-1 text-2XL/Regular text-grey-900'>973,200</span>
                  <span className='text-L/Medium text-grey-800'>개</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
