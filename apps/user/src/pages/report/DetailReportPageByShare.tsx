import React, { Fragment, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
  matchPath,
  useInRouterContext,
  useLocation,
  useMatch,
  useParams,
  useRoutes,
} from 'react-router-dom';
import { _getReportInfo, openBrowser } from '@/containers/report/report.container';
import { reportInitialState, reportReducer } from '@/containers/report/report.reducer';
import { DetailReportRightQuickBar } from '@/pages/report/DetailReportRightQuickBar';
import { isFalsy } from '@/utils/isFalsy';

import { DetailReportSwitch } from '@/pages/report/DetailReportSwitch';
import { getParameter } from '@/utils/getParameter';
import DetailReportHeader from '@/pages/report/DetailReportHeader';
import DetailReportBody from '@/pages/report/DetailReportBody';
import { DetailReportLayoutSwitch } from '@/pages/report/DetailReportLayoutSwitch';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { Default } from '@/components/layouts';

const DetailReportPageByShare = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  const shareToken = getParameter('share');

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
    const isAuthenticated = authTokenStorage.getToken();
    if (isAuthenticated) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }

    if (isFalsy(params.id)) return;
    if (params.id && _state.main === null) {
      void _getReportInfo(params.id, _dispatch);
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

  return (
    <Fragment>
      <DetailReportBody
        contentSection={contentSection}
        setScrollEvent={setScrollEvent}
        scrollEvent={scrollEvent}
      >
        {combinedComponent}
        <DetailReportRightQuickBar
          title={main?.text}
          scrollEvent={scrollEvent}
          contentSection={contentSection}
          scrollController={scrollController}
          setScrollEvent={setScrollEvent}
        />
      </DetailReportBody>
    </Fragment>
  );
};

export default DetailReportPageByShare;
