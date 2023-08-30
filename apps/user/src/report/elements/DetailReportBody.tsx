import { ReactNode, useEffect, useState } from 'react';
import { useScroll } from '@/components/useScroll';
import { BackforwardButton } from '@/components/BackForwardButton';
import { PATH } from '@/router/routeList';
import { useNavigate, useLocation } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { HackleAtom } from '@/atom/common/hackle.atom';

interface TDetailReportContent {
  scrollEvent: scrollEventState;
  setScrollEvent: React.Dispatch<React.SetStateAction<scrollEventState>>;
  contentSection: React.RefObject<HTMLDivElement>;
  children?: ReactNode;
}

export const DetailReportBody = (props: TDetailReportContent) => {
  const [width, setWidth] = useState(0);
  const hackleState = useRecoilValue(HackleAtom);
  const { children, contentSection, setScrollEvent, scrollEvent } = props;
  const { scrollY: windowScrollY } = useScroll();
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    setScrollEvent(
      Object.assign({}, scrollEvent, {
        scrollY: windowScrollY,
      }),
    );
    if (width === 0) {
      setWidth(document.getElementById('report_grid')?.offsetLeft! - 100);
    }
  }, [scrollY]);

  return (
    <section ref={contentSection}>
      <div className='min-h-full bg-white'>
        {width !== 0 && (
          <BackforwardButton
            hidden={hackleState.hackleId === 'B'}
            originStyle={{ left: `${width}px` }}
            style={`top-[124px] sticky`}
            callback={() => {
              navigate(PATH.REPORT_LIST + (search ? search : ''));
            }}
          />
        )}
        <div className='container pt-8 pb-[200px]'>
          <div id='report_grid' className={`grid grid-cols-12 gap-x-6`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
