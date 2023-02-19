import { Dispatch } from 'react';
import { TReportAction, REPORT_ACTION } from '@/containers/report/report.reducer';

export const scrollToTop = (_dispatch: Dispatch<TReportAction>) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  _dispatch({ type: REPORT_ACTION.INITIALIZE_SCROLL_EVENT });
};
