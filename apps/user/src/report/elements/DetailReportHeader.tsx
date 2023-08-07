import { useMemo, useState } from 'react';
import { Params, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { openBrowser } from '@/utils/openBrowser';
import { convertShopeeSiteUrl, convertTitle } from '@/utils/convertEnum';
import { PATH, STYLE_ENUM } from '@/types/enum.code';
import { TITLE } from '@/types/enum.code';
import { replaceOverLength } from '@/utils/replaceOverLength';
import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { getParameter } from '@/utils/getParameter';

interface TDetailReport {
  params: Params<string>;
  main: (TGetMainReportDataType & TKeywordInfo & TMarketSize & TRecommendKeyword) | null;
  scrollEvent: scrollEventState;
}

export const DetailReportHeader = (props: TDetailReport) => {
  const { params, main, scrollEvent } = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigation = useNavigate();

  const listUrlMake = () => {
    const limit = getParameter('limit');
    const page = getParameter('page');
    if (limit && page) {
      return `${PATH.REPORT_LIST}?limit=${limit}&page=${page}`;
    } else {
      return `${PATH.REPORT_LIST}`;
    }
  };

  const headerHeightStyle = useMemo(() => {
    if (window.innerWidth < 431) return;
    return { height: STYLE_ENUM.REPORT_DETAIL_HEADER_HEIGHT };
  }, []);

  return (
    <header className='sticky top-0 z-40 border-b-[1px] border-b-grey-200 bg-white xs:top-[65px]'>
      <div className='container'>
        <div
          style={headerHeightStyle}
          className='flex items-center xs:h-[64px] xs:justify-between xs:p-5'
        >
          <div className='flex w-full items-center'>
            <div className='flex items-center'>
              <button
                className='h-5 w-5 cursor-pointer pl-[7px]'
                onClick={() => navigation(listUrlMake())}
              >
                <ReactSVG src='/assets/icons/outlined/LeftArrow.svg' />
              </button>
              <div className='ml-[19px] text-2XL/Bold text-grey-900 xs:flex xs:w-full xs:items-end xs:text-XL/Medium'>
                <ReactSVG
                  className='hidden pr-2 xs:block xs:self-center xs:pl-0'
                  src={`/assets/icons/country/${main?.country}.svg`}
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', `xs:w-5 xs:h-5`);
                  }}
                />
                <p className='w-max xs:mb-[3px]'>
                  {innerWidth < 431
                    ? replaceOverLength(main?.text!, 17)
                    : replaceOverLength(convertTitle(scrollEvent.title), 17)}
                </p>
              </div>
            </div>

            <button
              className='hidden h-5 w-5 cursor-pointer items-center pl-3 xs:flex xs:w-full xs:justify-end xs:self-center'
              onClick={() => {
                openBrowser(
                  `${convertShopeeSiteUrl(main!.country)}/search?keyword=${main!.text}`,
                  main?.sorted,
                );
                _amplitudeMovedToSERP(params.id, main!.text, null);
              }}
            >
              <ReactSVG
                src='/assets/icons/outlined/Linkout.svg'
                beforeInjection={(svg) =>
                  svg.setAttribute(
                    'class',
                    'xs:w-[18px] xs:h-[18px] xs:fill-grey-700 fill-grey-900',
                  )
                }
              />
            </button>

            {scrollEvent.title !== TITLE.REPORT && (
              <button
                className='flex h-5 w-5 cursor-pointer items-center pl-3 xs:hidden'
                onClick={() => {
                  openBrowser(
                    `${convertShopeeSiteUrl(main!.country)}/search?keyword=${main!.text}`,
                    main?.sorted,
                  );
                  _amplitudeMovedToSERP(params.id, main!.text, null);
                }}
              >
                <ReactSVG
                  src='/assets/icons/outlined/Linkout.svg'
                  beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-900')}
                />
              </button>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='hidden items-center justify-between bg-orange-400 text-start xs:flex '>
          <div className='z-10 flex h-[44px] w-[80px] items-center bg-orange-400 text-center'>
            <p className='ml-5 bg-orange-400 text-M/Bold text-white'>PC 환경</p>
          </div>

          <p
            id='moving-letter'
            className='absolute w-[400px] pl-1 text-M/Medium text-white'
          >
            으로 접속 시 더욱 자세한 내용을 확인할 수 있어요!
          </p>

          <ReactSVG
            onClick={() => setIsOpen(false)}
            src='/assets/icons/outlined/Close.svg'
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
