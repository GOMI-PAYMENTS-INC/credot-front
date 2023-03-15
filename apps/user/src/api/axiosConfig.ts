import { GlobalEnv } from '@/api/config';
import { camelize, snakeize } from 'casing';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { authTokenStorage } from '@/utils/authToken';
import { STATUS_CODE } from '@/types/enum.code';
import { PATH } from '@/types/enum.code';
import { isIncluded } from '../utils/isIncluded';

const Axios = axios.create({ baseURL: GlobalEnv.baseUrl });

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
  //로그인 상태로 24시간이 지나 토큰이 만료된 상태
  if (isIncluded(response.data.code, STATUS_CODE.INVALID_TOKEN)) {
    //저장된 토큰 삭제
    authTokenStorage.clearToken();
    //로그인 페이지로 이동
    location.replace(PATH.SIGN_IN);
  }

  if (response.data.code === STATUS_CODE.ERROR) {
    throw new Error(response.data.message);
  }

  if (response.data) {
    response.data = camelize(response.data);
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
    Axios.patch(url, Object.assign({}, options, { param: param })),
  delete: async <ParamType, ResponseType>(
    url: string,
    options: AxiosRequestConfig,
    param?: ParamType,
  ): Promise<AxiosResponse<ResponseType>> =>
    Axios.delete(url, Object.assign({}, options)),
  put: async <ParamType, ResponseType>(
    url: string,
    param: ParamType,
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> =>
    Axios.put(url, Object.assign({}, options, { param: param })),
};
