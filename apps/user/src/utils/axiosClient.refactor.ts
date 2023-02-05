import { GlobalEnv } from '@/utils/config';

import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

const token = localStorage.getItem(GlobalEnv.tokenKey);

export enum HTTP_METHOD_ENUM {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const defaultOptions: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: token ? `Bearer ${token}` : '',
  },
};

const Axios = axios.create({ baseURL: GlobalEnv.baseUrl });
//TODO: axios 공통 onSuccess onFailed 묶기
export const HTTP = {
  get: async <ResponseType>(
    url: string,
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> => {
    try {
      return await Axios.get(url, Object.assign({}, defaultOptions, options));
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
      console.warn(error);
      throw new Error('unknown error');
    }
  },
  post: async <ParamType, ResponseType>(
    url: string,
    param: ParamType,
  ): Promise<AxiosResponse<ResponseType>> =>
    Axios.post(url, Object.assign({}, defaultOptions, { param: param })),
  patch: async <ParamType, ResponseType>(
    url: string,
    param: ParamType,
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> =>
    Axios.patch(url, Object.assign({}, defaultOptions, options, { param: param })),
  delete: async <ResponseType>(
    url: string,
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> =>
    Axios.delete(url, Object.assign({}, defaultOptions, options)),
  put: async <ParamType, ResponseType>(
    url: string,
    param: ParamType,
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> =>
    Axios.put(url, Object.assign({}, defaultOptions, options, { param: param })),
};
