import { HTTP } from '@/api/axiosConfig';
import { authTokenStorage } from '@/utils/authToken';

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

const deleteReportList = async (queryString: TDeleteReportListParamsType) => {
  try {
    return await HTTP.delete<TDeleteReportListParamsType, TDeleteReportListResponse>(
      REPORT_URL,
      {
        params: queryString,
      },
    );
  } catch (error) {
    console.error(error);
  }
};

export { getMainReport, getRelationReport, getReportList, deleteReportList };
