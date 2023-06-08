import { HTTP } from '@/api/axiosConfig';

const REPORT_URL = 'api/v1/report';

const postReportShareToken = async ({ id }: TPostReportShareTokenParamsType) => {
  try {
    return await HTTP.post<
      TPostReportShareTokenParamsType,
      TPostReportShareTokenResponse
    >(`${REPORT_URL}/${id}/share`, { id });
  } catch (error) {
    console.error(error);
  }
};

const getMainReport = async (id: string) => {
  try {
    return await HTTP.get<TGetMainReportResponse>(`${REPORT_URL}/${id}/main`);
  } catch (error) {
    console.error(error);
  }
};
const getMainReportByShare = async (token: string) => {
  try {
    return await HTTP.get<TGetMainReportResponse>(`${REPORT_URL}/share/${token}/main`);
  } catch (error) {
    console.error(error);
  }
};

const getRelationReport = async (id: string) => {
  try {
    return await HTTP.get<TGetRelationReportResponse>(`${REPORT_URL}/${id}/relation`);
  } catch (error) {
    console.error(error);
  }
};
const getRelationReportByShare = async (token: string) => {
  try {
    return await HTTP.get<TGetRelationReportResponse>(
      `${REPORT_URL}/share/${token}/relation`,
    );
  } catch (error) {
    console.error(error);
  }
};

const getOverseaProduct = async (id: string) => {
  try {
    return await HTTP.get<TOverseaProductResponse>(`${REPORT_URL}/${id}/oversea`);
  } catch (error) {
    console.error(error);
  }
};
const getOverseaProductByShare = async (token: string) => {
  try {
    return await HTTP.get<TOverseaProductResponse>(
      `${REPORT_URL}/share/${token}/oversea`,
    );
  } catch (error) {
    console.error(error);
  }
};

const getSalePrice = async (id: string) => {
  try {
    return await HTTP.get<TSalePriceResponse>(`${REPORT_URL}/${id}/prices`);
  } catch (error) {
    console.error(error);
  }
};
const getSalePriceByShare = async (token: string) => {
  try {
    return await HTTP.get<TSalePriceResponse>(`${REPORT_URL}/share/${token}/prices`);
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
        paramsSerializer: (paramObj) => new URLSearchParams(paramObj).toString(),
      },
    );
  } catch (error) {
    console.error(error);
  }
};

export {
  postReportShareToken,
  getMainReport,
  getMainReportByShare,
  getRelationReport,
  getRelationReportByShare,
  getSalePrice,
  getSalePriceByShare,
  getOverseaProduct,
  getOverseaProductByShare,
  getReportList,
  deleteReportList,
};
