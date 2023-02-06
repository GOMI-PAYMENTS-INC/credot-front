import { axiosClient } from '@/utils/axiosClient';
import { GlobalEnv } from '@/utils/config';
import { camelize, snakeize } from 'casing';

interface IReportItem {
  id: Number;
  userId: Number;
  reportUniqueId: String;
  countryCode: String;
  channel: String;
  keyword: String;
  isMain: Boolean;
  sortBy: String;
  itemCount: Number;
  totalItemCount: Number;
  averagePrice: Number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportListParamsType {
  lastId?: number; // 페이징용 리포트id
  limit?: number; // 페이징용 리스트 사이즈
}

export interface CreateReportParamsType {
  country: string; // 국가코드
  text: string; // 키워드
}

const REPORT_URL = 'api/v1/report';

export const ReportContainer = () => {
  const setAuth = () => {
    axiosClient.interceptors.request.use((config) => {
      const token = localStorage.getItem(GlobalEnv.tokenKey);
      // eslint-disable-next-line no-param-reassign
      config.headers = { Authorization: token ? `Bearer ${token}` : '' };

      return config;
    });
  };

  const getList = async (
    lastId: number | undefined,
    limit: number | undefined,
  ): Promise<IReportItem[]> => {
    setAuth();

    const params: ReportListParamsType = {
      lastId: lastId,
      limit: limit,
    };

    const { request, status, statusText, data } = await axiosClient.get(REPORT_URL, {
      params: snakeize(params),
    });
    console.log(REPORT_URL, status, statusText);
    return data;
  };

  const create = async (country: string, text: string): Promise<any> => {
    setAuth();

    const params: CreateReportParamsType = {
      country: country,
      text: text,
    };

    const { data } = await axiosClient.post(REPORT_URL, snakeize({ report: params }));
    return camelize(data);
  };

  return {
    getList,
    create,
  };
};
