import { openAppWithTag } from '@/utils/openBrowser';
import { GlobalEnv } from '@/api/config';
import {
  CTA_LOCATION,
  CTA_TYPE,
  pageCategoryConvertor,
} from '@/amplitude/amplitude.enum';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { PATH } from '@/router/paths';
interface IInduceButton {
  className?: string;
  text?: string;
  varidation: string;
}

export const InduceButton = ({ className, text, varidation }: IInduceButton) => {
  const { pathname } = useLocation();
  if (varidation === 'A') return <Fragment />;
  const EVENT_KEY = 'sample__click_search_api_latency';
  const { deviceId } = window.hackleClient.getUser();
  const _deviceId = deviceId ? deviceId : 'Unuknown';

  return (
    <div className={className}>
      {text && <p className='text-grey-700'>{text}</p>}
      <div className='mt-3 flex gap-4'>
        <button
          id='movedToSolution'
          className='w-[127px] rounded-md bg-orange-500 p-3 text-M/Bold text-white shadow-[0_2px_6px_0_rgba(0,0,0,0.08)] xs:w-fit xs:text-S/Bold'
          onClick={(event) => {
            openAppWithTag({
              url: GlobalEnv.serviceUrl,
              path: pageCategoryConvertor(pathname),
              type: CTA_TYPE.BUTTON,
              location: CTA_LOCATION.HEADER,
              event: event,
            });
          }}
        >
          무료 시작하기
        </button>

        <button
          id='movedToSolution'
          className='rounded-md border border-grey-400 bg-white p-3 text-M/Bold text-grey-800 shadow-[0_2px_6px_0_rgba(0,0,0,0.08)]'
          onClick={(event) => {
            window.hackleClient.track(EVENT_KEY, { deviceId: _deviceId });
            openAppWithTag({
              url: GlobalEnv.serviceUrl,
              path: pageCategoryConvertor(PATH.PREVIEW),
              type: CTA_TYPE.BUTTON,
              location: CTA_LOCATION.HEADER,
              event: event,
            });
          }}
        >
          리포트 미리보기
        </button>
      </div>
    </div>
  );
};
