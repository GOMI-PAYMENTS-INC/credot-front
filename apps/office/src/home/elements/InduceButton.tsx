import { openAppWithTag } from '@/utils/openBrowser';
import { useNavigate } from 'react-router-dom';
// import { _keywordReportPreviewed } from '@/amplitude/amplitude.service';
import { GlobalEnv } from '@/api/config';
import { CTA_LOCATION, CTA_TYPE } from '@/amplitude/amplitude.enum';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { PATH } from '@/router';
interface IInduceButton {
  className?: string;
  text?: string;
  varidation: string;
}

export const InduceButton = ({ className, text, varidation }: IInduceButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (varidation === 'A') return <Fragment />;

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
              path: pathname,
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
          onClick={() => {
            // _keywordReportPreviewed();
            navigate(PATH.PREVIEW);
          }}
        >
          리포트 미리보기
        </button>
      </div>
    </div>
  );
};
