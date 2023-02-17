import { defaultOptions, HTTP } from '@/utils/axiosConfig';
import { CountryType } from '@/generated/graphql';
import { STATUS_CODE } from '@/types/statusCode';

const REPORT_URL = 'api/v1/report';

export enum TBatchStatusType {
  WAIT = 'WAIT', //대기
  RUN = 'RUN', //실행중
  DONE = 'DONE', //종료
  REPLICATE = 'REPLICATE', //재실행
  NONE = 'NONE',
}

const getMainReport = async (id: string) => {
  try {
    return await HTTP.get<TGetMainReport>(`${REPORT_URL}/${id}/main`, {
      ...defaultOptions(),
    });
  } catch (error) {
    console.error(error);
  }
};

const getRelationReport = async (id: string) => {
  try {
    return await HTTP.get<TGetRelationReport>(`${REPORT_URL}/${id}/relation`, {
      ...defaultOptions(),
    });
  } catch (error) {
    console.error(error);
  }
};

const getReportList = async (queryString: TReportListParamsType = {}) => {
  try {
    return await HTTP.get<{ results: TReportItem }>(REPORT_URL, {
      ...defaultOptions(),
      params: queryString,
    });
  } catch (error) {
    console.error(error);
  }
};
export { getMainReport, getRelationReport, getReportList };
