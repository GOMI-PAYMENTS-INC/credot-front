import { HTTP } from '@/api/axiosConfig';

const REPORT_URL = 'api/v1/report';

const getMainReport = async (id: string) => {
  try {
    return await HTTP.get<TGetMainReport>(`${REPORT_URL}/${id}/main`);
  } catch (error) {
    console.error(error);
  }
};

const getRelationReport = async (id: string) => {
  try {
    return await HTTP.get<TGetRelationReport>(`${REPORT_URL}/${id}/relation`);
  } catch (error) {
    console.error(error);
  }
};

const getReportList = async (queryString: TReportListParamsType) => {
  try {
    return await HTTP.get<TReportListResponse>(REPORT_URL, { params: queryString });
  } catch (error) {
    console.error(error);
  }
};

export { getMainReport, getRelationReport, getReportList };
