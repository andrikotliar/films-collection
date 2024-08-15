import { HttpMethod } from '@/common/enums';

const api = async <T = unknown>(
  url: string,
  config?: RequestInit,
): Promise<T> => {
  const requestConfig: RequestInit = {
    method: HttpMethod.GET,
    ...config,
  };

  try {
    const response = await fetch(url, requestConfig);
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { api };
