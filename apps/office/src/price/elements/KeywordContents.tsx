import { ReactSVG } from 'react-svg';
import { openAppWithTag } from '@/utils/openBrowser';
import { CTA_LOCATION, CTA_TYPE } from '@/amplitude/amplitude.enum';
import { GlobalEnv } from '@/api/config';
import { PATH } from '@/router';

export const KeywordContents = () => {
  return (
    <section>
      <div className='flex flex-col items-center'>
        <div className='lg:w-[806px] md:w-[532px] xs:w-[405px]'>
          <div className='flex lg:justify-center'>
            <div className='flex w-[1320px] justify-around rounded-[50px] bg-gradient-to-r from-orange-500 to-orange-300 lg:flex-col md:max-w-[712px] md:px-[81px] sm:max-w-[530px] sm:px-0 xs:max-w-[405px] xs:items-center'>
              <div className='flex flex-col items-start py-[50px] text-2XL/Bold text-grey-100 lg:my-[86px] lg:items-center lg:text-3XL/Bold md:w-[550px] sm:text-2XL/Bold'>
                <p>국가별 Shopee 시장을 미리 분석하고</p>
                <p className='mt-2'>데이터를 기반의 판매 전략을 수립하세요</p>
                <button
                  id='movedToSolution'
                  className='button-filled-normal-large-primary-false-false-true relative mt-[47px] flex w-[204px] justify-center bg-grey-100'
                  onClick={(event) =>
                    openAppWithTag({
                      url: GlobalEnv.serviceUrl,
                      path: PATH.PRICE,
                      type: CTA_TYPE.BUTTON,
                      location: CTA_LOCATION.MIDDLE_OF_CONTENT,
                      event: event,
                    })
                  }
                >
                  <p className=' text-center text-XL/Bold text-orange-400'>
                    무료 시작하기
                  </p>
                  <ReactSVG
                    src='assets/icons/Union.svg'
                    className='absolute bottom-[-20px] right-[30px] cursor-auto self-end'
                  />
                </button>
              </div>
              <ReactSVG
                className='self-end md:self-center'
                src='/assets/icons/ReportsL.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'md:w-[488px] h-[254px] xs:w-[360px]');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
