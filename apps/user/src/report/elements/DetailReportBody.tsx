import React, { ReactNode, useEffect } from 'react';
import { useScroll } from '@/components/useScroll';

interface TDetailReportContent {
  scrollEvent: scrollEventState;
  setScrollEvent: React.Dispatch<React.SetStateAction<scrollEventState>>;
  contentSection: React.RefObject<HTMLDivElement>;
  children?: ReactNode;
}

export const DetailReportBody = (props: TDetailReportContent) => {
  const { children, contentSection, setScrollEvent, scrollEvent } = props;
  const { scrollY: windowScrollY } = useScroll();

  useEffect(() => {
    setScrollEvent(
      Object.assign({}, scrollEvent, {
        scrollY: windowScrollY,
      }),
    );
  }, [scrollY]);

  return (
    <section ref={contentSection}>
      <div className='min-h-full bg-white'>
        <div className='container pt-8 pb-[200px]'>
          <div className='grid grid-cols-12 gap-x-6'>{children}</div>
        </div>
      </div>
    </section>
  );
};
