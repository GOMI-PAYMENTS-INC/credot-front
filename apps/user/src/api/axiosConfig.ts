import { GlobalEnv } from '@/api/config';
import { camelize, snakeize } from 'casing';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { authTokenStorage } from '@/utils/authToken';
import { STATUS_CODE } from '@/types/enum.code';
import { PATH } from '@/types/enum.code';
import { isIncluded } from '../utils/isIncluded';

const Axios = axios.create({ baseURL: GlobalEnv.restUrl });

Axios.interceptors.request.use((config) => {
  const token = authTokenStorage.getToken();
  const authorization = token ? `Bearer ${token}` : '';

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: authorization,
  };
  config.headers = Object.assign({}, config.headers, headers);

  config.data = snakeize(config.data);
  if (config.params) {
    config.params = snakeize(config.params);
  }
  return config;
});

Axios.interceptors.response.use((response) => {
  if (isIncluded(response.data.code, STATUS_CODE.INVALID_TOKEN)) {
    authTokenStorage.clearToken();
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
      const res = await Axios.post(url, { ...params }, options);

      return res;
    } catch (error) {
      const err = error as CommonErrorType;
      if (error instanceof AxiosError) {
        console.error(error, 'error message');
        throw new Error(error.message, error);
      }
      throw new Error(err.response.message);
    }
  },
  patch: async <ParamType, ResponseType>(
    url: string,
    param: ParamType,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> => {
    try {
      return await Axios.patch(url, Object.assign({}, options, { param: param }));
    } catch (error) {
      const err = error as CommonErrorType;
      if (error instanceof AxiosError) {
        console.error(error, 'error message');
        throw new Error(error.message, error);
      }
      throw new Error(err.response.message);
    }
  },
  delete: async <ParamType, ResponseType>(
    url: string,
    options: AxiosRequestConfig,
    param?: ParamType,
  ): Promise<AxiosResponse<ResponseType>> => {
    try {
      return await Axios.delete(url, Object.assign({}, options));
    } catch (error) {
      const err = error as CommonErrorType;
      if (error instanceof AxiosError) {
        console.error(error, 'error message');
        throw new Error(error.message, error);
      }
      throw new Error(err.response.message);
    }
  },

  put: async <ParamType, ResponseType>(
    url: string,
    param: ParamType,
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> => {
    try {
      return await Axios.put(url, Object.assign({}, options, { param: param }));
    } catch (error) {
      const err = error as CommonErrorType;
      if (error instanceof AxiosError) {
        console.error(error, 'error message');
        throw new Error(error.message, error);
      }
      throw new Error(err.response.message);
    }
  },
};
