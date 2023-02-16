import { Dispatch } from 'react';
import { getMainReport, getRelationReport } from './report.api';
import { REPORT_ACTION, TReportAction } from '@/containers/report/report.reducer';

export const openBrowser = (url: string) => {
  window.open(url);
};

export const _getMainReport = async (id: string, _dispatch: Dispatch<TReportAction>) => {
  try {
    const response = await getMainReport(id);
    if (response?.data) {
      const { data } = response.data;
      _dispatch({
        type: REPORT_ACTION.INITIALIZE_DATA,
        payload: { type: 'main', data: data },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const convertToDesc = () => {};

export const convertExachangeRate = (vnd: number, krw: number) => {
  return Math.floor((vnd / 100) * krw);
};
