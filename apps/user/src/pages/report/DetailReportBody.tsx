import React, {
  Fragment,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Default } from '@/components/layouts';
import { _getReportInfo, openBrowser } from '@/containers/report/report.container';
import { convertShopeeSiteUrl, convertTitle } from '@/utils/convertEnum';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { DetailReportRightQuickBar } from '@/pages/report/DetailReportRightQuickBar';
import { PATH } from '@/types/enum.code';
import { TITLE } from '@/types/enum.code';
import { isFalsy } from '@/utils/isFalsy';

import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { DetailReportSwitch } from '@/pages/report/DetailReportSwitch';
import { getParameter } from '@/utils/getParameter';
import DetailReportHeader from '@/pages/report/DetailReportHeader';

interface TDetailReportContent {
  scrollEvent: scrollEventState;
  setScrollEvent: React.Dispatch<React.SetStateAction<scrollEventState>>;
  contentSection: React.RefObject<HTMLDivElement>;
  children?: ReactNode;
}

const DetailReportBody = (props: TDetailReportContent) => {
  const { children, contentSection, setScrollEvent, scrollEvent } = props;
  return (
    <section
      className='grow overflow-y-scroll'
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
