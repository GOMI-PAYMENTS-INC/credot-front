import { ReactSVG } from 'react-svg';
import { RefObject, useEffect, Dispatch, SetStateAction } from 'react';
import {
  _getReportInfo,
  onScrollDetail,
  switchContents,
  scrollToTop,
} from '@/containers/report/report.container';
import { TITLE } from '@/types/enum.code';
import { convertTitle } from '@/utils/convertEnum';

interface IDetailReportRightQuickBarProps {
  contentSection?: RefObject<HTMLDivElement>;
  scrollController?: RefObject<HTMLTableSectionElement>;
  scrollEvent: TScrollEvent;
  setScrollEvent: Dispatch<SetStateAction<TScrollEvent>>;
  title: string | undefined;
}

export const DetailReportRightQuickBar = (props: IDetailReportRightQuickBarProps) => {
  const { contentSection, scrollController, scrollEvent, setScrollEvent, title } = props;
  const { scrollY, isOpen, current } = scrollEvent;

  useEffect(() => {
    let name = scrollY > 100 ? title : '';

    onScrollDetail(scrollEvent, setScrollEvent, name);
  }, [scrollY]);

  return (
    <aside className='sticky top-8 col-span-2 h-fit w-[180px] '>
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
                        className={`ml-6 py-1 text-S/Regular  ${
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
