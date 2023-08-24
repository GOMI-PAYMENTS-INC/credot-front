import { Fragment, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { _getReportInfoByShare } from '@/report/container';
import { reportInitialState, reportReducer } from '@/report/reducer';
import { isFalsy } from '@/utils/isFalsy';

import {
  DetailReportBody,
  DetailReportSwitch,
  DetailReportRightQuickBar,
} from '@/report/elements';
import { authTokenStorage } from '@/utils/authToken';
import { Default } from '@/common/layouts';

import { _amplitudeSharedKeywordReportViewed } from '@/amplitude/amplitude.service';
import { useRecoilValue } from 'recoil';
import { HackleId } from '@/atom/common/hackle.atom';

const DetailReportPageByShare = () => {
  const params = useParams();
  const hackleId = useRecoilValue(HackleId);
  const scrollEventState: scrollEventState = {
    scrollY: 0,
    title: 'Report',
    isOpen: true,
    current: 'Report',
  };
  const [_state, _dispatch] = useReducer(reportReducer, reportInitialState);
  const [scrollEvent, setScrollEvent] = useState(scrollEventState);

  const { main } = _state;
  const contentSection = useRef<HTMLDivElement>(null);
  // const scrollController = useRef<HTMLTableSectionElement>(null);

  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (isFalsy(params.id)) return;

    const isAuthenticated = authTokenStorage.getToken();
    if (isAuthenticated) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
    if (params.id && main === null)
      _getReportInfoByShare(params.id, isAuthenticated, _dispatch);
  }, []);

  useEffect(() => {
    if (main) {
      _amplitudeSharedKeywordReportViewed(main.id, main.country, main.sorted, main.text);
    }
  }, [main?.id]);

  const amplitudeData: TAmplitudeDetailData = {
    param: params.id ? params.id : '',
    keyword: main?.text ? main.text : '',
  };

  const combinedComponent = useMemo(() => {
    return (
      <DetailReportSwitch
        isUser={isUser}
        _state={_state}
        _dispatch={_dispatch}
        params={params}
      ></DetailReportSwitch>
    );
  }, [main]);

  const LoadingSpinner = useMemo(
    () => (
      <div className='flex h-full flex-col items-center justify-center self-center'>
        <div className='absolute scale-[0.3] pb-[84px]'>
          <div id='loader' />
        </div>
      </div>
    ),
    [],
  );

  if (isUser) {
    return (
      <Default>
        {isFalsy(main) ? (
          LoadingSpinner
        ) : (
          <Fragment>
            <DetailReportBody
              contentSection={contentSection}
              setScrollEvent={setScrollEvent}
              scrollEvent={scrollEvent}
            >
              {combinedComponent}
              <DetailReportRightQuickBar
                isUser={isUser}
                title={main?.text}
                scrollEvent={scrollEvent}
                setScrollEvent={setScrollEvent}
                test={
                  hackleId === 'B'
                    ? { _dispatch, keywordInfo: main!, amplitudeData: amplitudeData }
                    : undefined
                }
              />
            </DetailReportBody>
          </Fragment>
        )}
      </Default>
    );
  }

  return (
    <Fragment>
      {isFalsy(main) ? (
        LoadingSpinner
      ) : (
        <DetailReportBody
          contentSection={contentSection}
          setScrollEvent={setScrollEvent}
          scrollEvent={scrollEvent}
        >
          {combinedComponent}
          <DetailReportRightQuickBar
            isUser={isUser}
            title={main?.text}
            scrollEvent={scrollEvent}
            setScrollEvent={setScrollEvent}
            test={
              hackleId
                ? { _dispatch, keywordInfo: main!, amplitudeData: amplitudeData }
                : undefined
            }
          />
        </DetailReportBody>
      )}
    </Fragment>
  );
};

export default DetailReportPageByShare;
