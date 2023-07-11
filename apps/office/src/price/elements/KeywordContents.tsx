import { ReactSVG } from 'react-svg';
import { openAppWithTag } from '@/utils/openBrowser';
import { CTA_LOCATION, CTA_TYPE } from '@/amplitude/amplitude.enum';
import { GlobalEnv } from '@/api/config';
import { PATH } from '@/router/paths';

export const KeywordContents = () => {
  return (
    <section>
      <div className='flex flex-col items-center'>
        <div className='xs:w-[405px] md:w-[532px] lg:w-[806px]'>
          <div className='flex'>
            <div className='xs:max-w-[405px] xs:items-center flex w-[1320px] justify-around rounded-[50px] bg-gradient-to-r from-orange-500 to-orange-300 sm:max-w-[530px] sm:px-0 md:max-w-[712px] md:px-[81px] lg:flex-col'>
              <div className='flex flex-col items-start py-[50px] text-2XL/Bold text-grey-100 sm:text-2XL/Bold md:w-[550px] lg:my-[86px] lg:items-center lg:text-3XL/Bold'>
                <p>국가별 Shopee 시장을 미리 분석하고</p>
                <p className='mt-2'>데이터를 기반의 판매 전략을 수립하세요</p>
                <button
                  className='button-filled-normal-large-primary-false-false-true mt-[47px] flex justify-end bg-grey-100 text-orange-400'
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
                  고미인사이트 무료 시작하기
                  <ReactSVG
                    src='assets/icons/Union.svg'
                    className='absolute mt-6 cursor-auto'
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
