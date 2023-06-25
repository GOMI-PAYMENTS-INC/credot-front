import { ReactSVG } from 'react-svg';
import { Dispatch, RefObject, SetStateAction, useEffect, useMemo } from 'react';
import {
  onScrollDetail,
  scrollToTop,
  switchContents,
} from '@/containers/report/report.container';
import { STYLE_ENUM, TITLE } from '@/types/enum.code';
import { convertTitle } from '@/utils/convertEnum';

interface IDetailReportRightQuickBarProps {
  isUser: boolean;
  contentSection?: RefObject<HTMLDivElement>;
  scrollController?: RefObject<HTMLTableSectionElement>;
  scrollEvent: TScrollEvent;
  setScrollEvent: Dispatch<SetStateAction<TScrollEvent>>;
  title: string | undefined;
}

export const DetailReportRightQuickBar = (props: IDetailReportRightQuickBarProps) => {
  const { isUser, contentSection, scrollController, scrollEvent, setScrollEvent, title } =
    props;
  const { scrollY, isOpen, current } = scrollEvent;

  useEffect(() => {
    let name = scrollY > 100 ? title : '';

    onScrollDetail(isUser, scrollEvent, setScrollEvent, name);
  }, [scrollY]);

  const quickBarTopStyle = useMemo(() => {
    const paddingTop = STYLE_ENUM.REPORT_DETAIL_BODY_PADDING_TOP;
    const headerHeight = STYLE_ENUM.REPORT_DETAIL_HEADER_HEIGHT;
    return isUser ? { top: paddingTop + headerHeight } : { top: paddingTop };
  }, [isUser]);

  return (
    <aside style={quickBarTopStyle} className={`sticky col-span-2 h-fit w-[180px]`}>
      <ul>
        <li>
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
        </li>
        <li>
          <ul>
            {isOpen &&
              Object.values(TITLE)
                .filter((title) => title !== TITLE.REPORT)
                .map((id, idx) => {
                  return (
                    <li
                      key={`menu-items-${id}`}
                      className={`flex h-9 cursor-pointer items-center hover:bg-grey-100 ${
                        idx === 0 && 'mt-1'
                      }`}
                    >
                      <a href={`#${id}`} className='flex-auto'>
                        <h1
                          className={`ml-6 py-1 text-S/Regular ${
                            id === current ? 'text-orange-500' : 'text-grey-700'
                          }`}
                        >
                          {convertTitle(id)}
                        </h1>
                      </a>
                    </li>
                  );
                })}
          </ul>
        </li>
      </ul>

      <button
        className='fixed right-[60px] bottom-[100px] flex h-11 w-11 items-center justify-center rounded-md border-[1px] bg-white'
        onClick={() => {
          scrollToTop(setScrollEvent, contentSection!);
          scrollToTop(setScrollEvent, scrollController!);
        }}
      >
        <ReactSVG src='/assets/icons/outlined/ToTop.svg' />
      </button>
    </aside>
  );
};
