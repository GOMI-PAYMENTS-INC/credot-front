import React, { ReactNode } from 'react';

interface TDetailReportContent {
  isUser: boolean;
  scrollEvent: scrollEventState;
  setScrollEvent: React.Dispatch<React.SetStateAction<scrollEventState>>;
  contentSection: React.RefObject<HTMLDivElement>;
  children?: ReactNode;
}

const DetailReportBody = (props: TDetailReportContent) => {
  const { isUser, children, contentSection, setScrollEvent, scrollEvent } = props;
  return (
    <section
      className={`${isUser && 'overflow-y-scroll'}`}
      onScroll={(event) => {
        setScrollEvent(
          Object.assign({}, scrollEvent, {
            scrollY: (event.target as HTMLElement).scrollTop,
          }),
        );
      }}
      ref={contentSection}
    >
      <div className='min-h-full bg-white'>
        <div className='container pt-8 pb-[100px]'>
          <div className='grid grid-cols-12 gap-x-6'>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default DetailReportBody;
