import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { openBrowser } from '@/utils/openBrowser';
import { convertShopeeSiteUrl } from '@/preview/container';
import { CountryType } from '@/preview/elements/keyword/constant';
import { replaceOverLength } from '@/utils/replaceOverLength';

export const PreviewHeader = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <header className='sticky top-20 z-40 hidden border-b-[1px] border-b-grey-200 bg-white xs:block'>
      <div className='container'>
        <div className='flex h-[64px] justify-between py-6'>
          <div className='flex w-full'>
            <div className='flex items-center'>
              <div className='text-2XL/Bold text-grey-900 xs:flex xs:w-full xs:items-end xs:text-XL/Medium'>
                <ReactSVG
                  className='hidden pr-2 xs:block xs:self-center xs:pl-0'
                  src={`/assets/country/SG.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', `xs:w-5 xs:h-5`);
                  }}
                />
                <p className='w-max xs:mb-[3px]'>{replaceOverLength('foundation', 17)}</p>
              </div>
            </div>

            <button
              className='hidden h-5 w-5 cursor-pointer items-center pl-3 xs:flex xs:w-full xs:justify-end xs:self-center'
              onClick={() => {
                openBrowser(
                  `${convertShopeeSiteUrl(CountryType.Sg)}/search?keyword=foundation`,
                );
              }}
            >
              <ReactSVG
                src='/assets/icons/Linkout.svg'
                beforeInjection={(svg) =>
                  svg.setAttribute(
                    'class',
                    'xs:w-[18px] xs:h-[18px] xs:fill-grey-700 fill-grey-900',
                  )
                }
              />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='hidden items-center justify-between bg-orange-400 text-start xs:flex '>
          <div className='z-10 flex h-[44px] w-[80px] items-center bg-orange-400 text-center'>
            <p className='ml-5 bg-orange-400 text-M/Bold text-white'>PC 환경</p>
          </div>

          <p id='moving-letter' className='absolute pl-1 text-M/Medium text-white'>
            으로 접속 시 더욱 자세한 내용을 확인할 수 있어요!
          </p>

          <ReactSVG
            onClick={() => setIsOpen(false)}
            src='/assets/icons/Close.svg'
            className='z-10 bg-orange-400'
            beforeInjection={(svg) =>
              svg.setAttribute('class', 'fill-white w-7 h-7 ml-1 pr-[2px] cursor-pointer')
            }
          />
        </div>
      )}
    </header>
  );
};
