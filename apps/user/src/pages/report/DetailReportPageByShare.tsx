import React, { Fragment, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { _getReportInfoByShare } from '@/containers/report/report.container';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { DetailReportRightQuickBar } from '@/pages/report/DetailReportRightQuickBar';
import { isFalsy } from '@/utils/isFalsy';

import { DetailReportSwitch } from '@/pages/report/DetailReportSwitch';
import DetailReportBody from '@/pages/report/DetailReportBody';
import { authTokenStorage } from '@/utils/authToken';
import { Default } from '@/components/layouts';
import DetailReportHeader from '@/pages/report/DetailReportHeader';

const DetailReportPageByShare = () => {
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

  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (isFalsy(params.id)) return;

    const isAuthenticated = authTokenStorage.getToken();
    if (isAuthenticated) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }

    if (params.id && _state.main === null) {
      void _getReportInfoByShare(params.id, !isFalsy(isAuthenticated), _dispatch);
    }
  }, []);

  const combinedComponent = useMemo(() => {
    return (
      <DetailReportSwitch
        isUser={isUser}
        _state={_state}
        _dispatch={_dispatch}
        params={params}
        scrollController={scrollController}
      ></DetailReportSwitch>
    );
  }, [main]);

  if (isFalsy(main) || main === null) {
    if (isUser) {
      return (
        <Default>
          <div className='flex h-full flex-col items-center justify-center self-center'>
            <div className='absolute scale-[0.3] pb-[84px]'>
              <div id='loader' />
            </div>
          </div>
        </Default>
      );
    } else {
      return (
        <Fragment>
          <div className='flex h-full flex-col items-center justify-center self-center'>
            <div className='absolute scale-[0.3] pb-[84px]'>
              <div id='loader' />
            </div>
          </div>
        </Fragment>
      );
    }
  }
  if (isUser) {
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
  } else {
    return (
      <Fragment>
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
      </Fragment>
    );
  }
};

export default DetailReportPageByShare;
