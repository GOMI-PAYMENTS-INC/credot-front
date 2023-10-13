import { ReactSVG } from 'react-svg';
import { openAppWithTag } from '@/utils/openBrowser';
import { CTA_LOCATION, CTA_TYPE } from '@/amplitude/amplitude.enum';
import { GlobalEnv } from '@/api/config';
import { PATH } from '@/router';

export const KeywordContent = () => {
  //bg-gradient-to-r from-orange-500 to-orange-300
  return (
    <section className='flex w-full justify-center bg-orange-200'>
      <div className='relative flex w-full items-center justify-center overflow-hidden'>
        <div className='absolute right-0 h-[1150px] w-[1150px]  rounded-[1150px] bg-gradient-to-r from-orange-300 to-orange-200' />
        <div className='w-[1320px] lg:w-[806px] md:w-[532px] xs:w-[405px]'>
          <div className='flex justify-center gap-[90px]'>
            {/* <div className='flex w-[1320px] justify-around rounded-[50px]  lg:flex-col md:max-w-[712px] md:px-[81px] sm:max-w-[530px] sm:px-0 xs:max-w-[405px] xs:items-center'> */}
            <div className='flex flex-col items-start justify-center py-[50px] text-2XL/Regular text-grey-800 lg:my-[86px] lg:items-center lg:text-3XL/Bold md:w-[550px] sm:text-2XL/Bold'>
              <p>
                <span className='text-2XL/Bold text-orange-400'>상품의 시장성</span>을
                미리 파악하고
              </p>
              <p className='mt-2'>
                <span className='text-2XL/Bold text-orange-400'>
                  데이터 기반의 판매 전략
                </span>
                을 수립하세요.
              </p>
              <button
                id='movedToSolution'
                className='button-filled-normal-large-primary-false-false-true relative mt-[47px] flex justify-center rounded-lg bg-orange-400 px-6 py-[14px]'
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
                <p className=' text-center text-XL/Bold text-white'>무료 시작하기</p>
                <ReactSVG
                  src='assets/icons/Union.svg'
                  className='absolute bottom-[-20px] right-[0px] cursor-auto self-end'
                />
              </button>
            </div>

            <img
              src='/assets/images/Banner.png'
              className='z-20 mt-[35px] h-[307px] self-end md:w-[488px] md:self-center xs:w-[360px]'
            />
          </div>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};
