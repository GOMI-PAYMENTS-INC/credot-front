import { GlobalEnv } from '@/utils/config';
import { camelize, snakeize } from 'casing';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { authTokenStorage } from '@/utils/authToken';
import { STATUS_CODE } from '@/types/enum.code';
import { PATH } from '@/router/routeList';
import { isIncluded } from './isIncluded';

export enum HTTP_METHOD_ENUM {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const defaultOptions = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

const Axios = axios.create({ baseURL: GlobalEnv.baseUrl });
// Axios.defaults.withCredentials = true;
//TODO: axios 공통 onSuccess onFailed 묶기
Axios.interceptors.request.use((config) => {
  const token = authTokenStorage.getToken();
  const authorization = token ? `Bearer ${token}` : '';

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: authorization,
  };

  config.headers = Object.assign({}, config.headers, headers);
  if (config.params) {
    config.params = snakeize(config.params);
  }

  if (config.data) {
    config.data = snakeize(config.data);
  }
  return config;
});

Axios.interceptors.response.use((response) => {
  if (response.data) {
    response.data = camelize(response.data);
  }

  if (isIncluded(response.data.code, STATUS_CODE.INVALID_TOKEN)) {
    location.replace(PATH.SIGN_IN);
  }
  return response;
});

export const HTTP = {
  get: async <ResponseType>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> => {
    try {
      const res = await Axios.get(url, options);
      res.data = camelize(res.data);

      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error, 'error message');
        throw new Error(error.message, error);
      }
      console.error(error);
      throw new Error('unknown error');
    }
  },
  post: async <ParamType, ResponseType>(
    url: string,
    params: ParamType,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> => {
    try {
      if (params) {
        params = snakeize(params);
      }
      const res = await Axios.post(url, { ...params }, options);
      res.data = camelize(res.data);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error, 'error message');
        throw new Error(error.message, error);
      }
      console.error(error);
      throw new Error('unknown error');
    }
  },
  patch: async <ParamType, ResponseType>(
    url: string,
    param: ParamType,
    options?: AxiosRequestConfig,
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
