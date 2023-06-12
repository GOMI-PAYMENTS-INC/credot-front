import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { _getReportInfo } from '@/containers/report/report.container';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { DetailReportRightQuickBar } from '@/pages/report/DetailReportRightQuickBar';
import { isFalsy } from '@/utils/isFalsy';

import { DetailReportSwitch } from '@/pages/report/DetailReportSwitch';
import DetailReportHeader from '@/pages/report/DetailReportHeader';
import DetailReportBody from '@/pages/report/DetailReportBody';
import { Default } from '@/components/layouts';

const DetailReportPage = () => {
  const params = useParams();

  const scrollEventState: scrollEventState = {
    scrollY: 0,
    title: 'Report',
    isOpen: true,
    current: 'Report',
  };
  const [_state, _dispatch] = useReducer(reportReducer, reportInitialState);
  const [scrollEvent, setScrollEvent] = useState(scrollEventState);

  const { main, relation } = _state;

  const contentSection = useRef<HTMLDivElement>(null);
  const scrollController = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (isFalsy(params.id)) return;
    if (params.id && _state.main === null) {
      void _getReportInfo(params.id, _dispatch);
    }
  }, []);

  const combinedComponent = useMemo(() => {
    return (
      <DetailReportSwitch
        isUser={true}
        _state={_state}
        _dispatch={_dispatch}
        params={params}
        scrollController={scrollController}
      ></DetailReportSwitch>
    );
  }, [main]);

  if (isFalsy(main) || main === null) {
    return (
      <Default>
        <div className='flex h-screen flex-col items-center justify-center self-center'>
          <div className='scale-[0.3]'>
            <div id='loader' />
          </div>
        </div>
      </Default>
    );
  }

  return (
    <Default>
      <DetailReportHeader main={main} params={params} scrollEvent={scrollEvent} />
      <DetailReportBody
        contentSection={contentSection}
        setScrollEvent={setScrollEvent}
        scrollEvent={scrollEvent}
      >
        {combinedComponent}
        <DetailReportRightQuickBar
          isUser={true}
          title={main?.text}
          scrollEvent={scrollEvent}
          contentSection={contentSection}
          scrollController={scrollController}
          setScrollEvent={setScrollEvent}
        />
      </DetailReportBody>
    </Default>
  );
};

export default DetailReportPage;
