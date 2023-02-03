import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {axiosClient} from "@/utils/axiosClient";
import {GlobalEnv} from "@/utils/config";
import {camelize, snakeize} from "casing";

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

export interface GetReportListParamsType {
  lastId?: number; // 페이징용 리포트id
  limit?: number; // 페이징용 리스트 사이즈
}

const GET_LIST_URL = "api/v1/report"

export const ReportContainer = () => {

  const [searchParams] = useSearchParams();
  const [isSearchQuery, SetIsSearchQuery] = useState<boolean>(true);
  const keywordParam = searchParams.get('keyword') ? searchParams.get('keyword') : '';

  const getList = async (lastId: number | undefined, limit: number | undefined): Promise<IReportItem[]> => {
    axiosClient.interceptors.request.use((config) => {
      const token = localStorage.getItem(GlobalEnv.tokenKey);
      // eslint-disable-next-line no-param-reassign
      config.headers = { Authorization: token ? `Bearer ${token}` : '' };

      return config;
    });
    // @ts-ignore
    const params: GetReportListParamsType = {
      lastId: lastId,
      limit: limit,
    }

    const { request, status, statusText, data } = await axiosClient.get(GET_LIST_URL, { params: snakeize(params)})
    console.log(GET_LIST_URL, status, statusText);
    return data;
  }

  return {
    keywordParam,
    getList
  };
};
