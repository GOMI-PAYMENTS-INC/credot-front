import { ReactSVG } from 'react-svg';
import { openAppWithTag } from '@/utils/openBrowser';
import { CTA_LOCATION, CTA_TYPE } from '@/amplitude/amplitude.enum';
import { GlobalEnv } from '@/api/config';
import { PATH } from '@/common/constants';
import { checkUserDevice } from '@/utils/checkUserDevice';

export const KeywordContent = () => {
  const isMobile = window.innerWidth < 432;

  return (
    <section className='flex w-full justify-center bg-orange-200 from-orange-200 to-white sm:bg-gradient-to-t'>
      <div className='relative flex w-full items-center justify-center overflow-hidden'>
        <div id='frame' className='w-[1320px] lg:w-[806px] md:w-[532px] xs:w-[405px]'>
          <div
            id='cotent_box'
            className='flex items-center justify-center gap-[90px] lg:items-end lg:gap-10 sm:flex-col sm:items-center sm:gap-0'
          >
            <div
              id='text_box'
              className='flex flex-col items-start justify-center py-[50px] text-2XL/Regular text-grey-800 lg:py-9 lg:text-L/Regular md:w-[550px] sm:items-center sm:py-[30px] sm:text-XL/Medium'
            >
              <p>
                <span className='text-2XL/Bold text-orange-400 lg:text-L/Bold sm:text-XL/Bold'>
                  상품의 시장성
                </span>
                을 미리 파악하고
              </p>
              <p className='mt-2 break-all'>
                <span className='text-2XL/Bold text-orange-400 lg:text-L/Bold sm:text-XL/Bold'>
                  데이터 기반의 판매 전략
                </span>
                을 수립하세요.
              </p>
              <button
                id='movedToSolution'
                className='button-filled-normal-large-primary-false-false-true relative mt-[47px] flex justify-center rounded-lg bg-orange-400 px-6 py-[14px] lg:mt-6 lg:w-[115px] lg:py-2 lg:px-0 sm:w-auto sm:p-4'
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
                <p className='text-center text-XL/Bold text-white lg:text-M/Bold sm:text-L/Bold'>
                  무료 시작하기
                </p>
                <ReactSVG
                  src='/assets/icons/Union.svg'
                  className='absolute bottom-[-20px] right-[0px] cursor-auto self-end'
                  beforeInjection={(svg) => svg.setAttribute('class', 'lg:h-8')}
                />
              </button>
            </div>

            <div id='img_box' className='relative flex sm:mt-[3px]'>
              {isMobile === false && (
                <div className='md:rounded-668px absolute left-0 h-[1150px] w-[1300px] self-center rounded-[1300px] bg-gradient-to-r from-orange-300 to-orange-200 md:h-[673px] md:w-[668px]' />
              )}
              <img
                src={
                  isMobile
                    ? '/assets/images/MobileBanner.png'
                    : '/assets/images/Banner.png'
                }
                className='z-20 mt-[35px] ml-[60px] h-[307px] self-end lg:mt-0 lg:h-[178px] md:self-center sm:ml-0 sm:h-[256px] xs:w-[360px]'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
