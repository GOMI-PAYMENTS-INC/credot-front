import { ReactSVG } from 'react-svg';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { onScrollDetail, switchContents } from '@/report/container';
import { STYLE_ENUM, TITLE } from '@/types/enum.code';
import { convertTitle } from '@/utils/convertEnum';
import { TReportAction } from '@/report/reducer';
import { DetailReportTest } from '@/report/elements/DetailReportTest';

interface IDetailReportRightQuickBarProps {
  isUser: boolean;
  scrollEvent: TScrollEvent;
  setScrollEvent: Dispatch<SetStateAction<TScrollEvent>>;
  title: string | undefined;
  test?: {
    _dispatch: Dispatch<TReportAction>;
    keywordInfo: TKeywordInfo;
    amplitudeData: TAmplitudeDetailData;
  };
}

export const DetailReportRightQuickBar = (props: IDetailReportRightQuickBarProps) => {
  const { isUser, scrollEvent, setScrollEvent, title, test } = props;
  const { scrollY, isOpen, current } = scrollEvent;

  useEffect(() => {
    let name = scrollY > 100 ? title : '';
    onScrollDetail(isUser, scrollEvent, setScrollEvent, name);
  }, [scrollY]);

  const quickBarTopStyle = useMemo(() => {
    const testCss = test ? 6 : 0;
    const paddingTop = STYLE_ENUM.REPORT_DETAIL_BODY_PADDING_TOP;
    const headerHeight = STYLE_ENUM.REPORT_DETAIL_HEADER_HEIGHT + testCss;
    return isUser ? { top: paddingTop + headerHeight } : { top: paddingTop };
  }, [isUser]);

  return (
    <aside
      style={quickBarTopStyle}
      className={`sticky col-span-2 h-fit w-[180px] xs:hidden`}
    >
      {test && (
        <div id='keywordInfoTest'>
          <DetailReportTest test={test} />
        </div>
      )}
      <div className={test ? 'mt-[30px]' : ''}>
        <div>
          <p
            className='flex cursor-pointer items-center text-S/Medium text-grey-700'
            onClick={() => switchContents(scrollEvent, setScrollEvent)}
          >
            <ReactSVG
              wrapper='span'
              className={`mr-2.5  ${isOpen && 'rotate-90'}`}
              src='/assets/icons/filled/CaretDown.svg'
            />
            목차
          </p>
        </div>
        <div>
          <ul>
            {isOpen &&
              Object.values(TITLE)
                .filter((keyword) => keyword !== TITLE.REPORT)
                .map((title, idx) => {
                  return (
                    <li
                      key={`menu-items-${title}`}
                      className={`flex h-9 cursor-pointer items-center hover:bg-grey-100 ${
                        idx === 0 && 'mt-1'
                      }`}
                    >
                      <a
                        href={`#${title}`}
                        className='flex-auto'
                        onClick={() =>
                          setScrollEvent({ ...scrollEvent, current: String(title) })
                        }
                      >
                        <h1
                          className={`ml-6 py-1 text-S/Regular ${
                            title === current ? 'text-orange-500' : 'text-grey-700'
                          }`}
                        >
                          {convertTitle(title)}
                        </h1>
                      </a>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>

      <button
        className='fixed right-[60px] bottom-[100px] flex h-11 w-11 items-center justify-center rounded-[40px] border-[1px] border-grey-300 bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.08)]'
        onClick={() => {
          // scrollToTop(setScrollEvent, contentSection!);
          // scrollToTop(setScrollEvent, scrollController!);
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }}
      >
        <ReactSVG src='/assets/icons/outlined/ToTop.svg' />
      </button>
    </aside>
  );
};
