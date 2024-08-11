import { HttpMethod } from '@/common/enums';
import axios, { AxiosRequestConfig } from 'axios';

const config = {
  baseUrl: '',
};

const instance = axios.create({
  baseURL: config.baseUrl,
});

const api = async <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  const requestConfig: AxiosRequestConfig = {
    method: HttpMethod.GET,
    ...config,
  };

  try {
    const response = await instance<T>(requestConfig);

    return await response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export { api };
