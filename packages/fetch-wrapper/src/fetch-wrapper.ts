import { HttpError } from './http-error';

type FetchOptions = {
  queryParams?: Record<string, any>;
  input?: Record<string, any>;
  params?: Record<string, any>;
};

type FetchWrapperOptions = {
  baseUrl: string;
  onError?: <T>(error: any, originalRequest: () => Promise<T>) => Promise<T>;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const parseQueryParams = (path: string, queryParams: FetchOptions['queryParams']) => {
  if (!queryParams) {
    return path;
  }

  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        params.append(key, item);
      });
    } else {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();

  return `${path}?${queryString}`;
};

const parseRouteParams = (path: string, params: FetchOptions['params']) => {
  if (!params) {
    return path;
  }

  return path.replace(/:([a-zA-Z]+)/g, (_, key) => {
    if (key in params) {
      return params[key].toString();
    }

    throw new Error(`Missing value for parameter: ${key}`);
  });
};

const setHeaders = (options?: FetchOptions) => {
  if (!options?.input || options.input instanceof FormData) {
    return undefined;
  }

  return {
    'Content-Type': 'application/json',
  };
};

const getBody = (options: FetchOptions) => {
  if (!options.input) {
    return undefined;
  }

  if (options.input instanceof FormData) {
    return options.input;
  }

  return JSON.stringify(options.input);
};

export const createFetchWrapper = (wrapperOptions: FetchWrapperOptions) => {
  const fetchWrapper = async <T>(
    method: HttpMethod,
    path: string,
    options?: FetchOptions,
  ): Promise<T> => {
    try {
      const requestOptions: RequestInit = {
        method,
        credentials: 'include',
      };

      requestOptions.headers = setHeaders(options);

      if (options?.input) {
        requestOptions.body = getBody(options);
      }

      const pathWithParams = parseRouteParams(path, options?.params);

      const parsedPath = parseQueryParams(pathWithParams, options?.queryParams);

      const response = await fetch(`${wrapperOptions.baseUrl}${parsedPath}`, requestOptions);
      const result = await response.json();

      if (!response.ok) {
        throw new HttpError(response.status, response.statusText, result);
      }

      return result as Promise<T>;
    } catch (error: any) {
      if (wrapperOptions.onError) {
        return wrapperOptions.onError(error, () => fetchWrapper(method, path, options));
      }

      throw new HttpError(
        error.response?.statusCode,
        error.response?.message ?? 'Unknown error',
        error.response,
      );
    }
  };

  return fetchWrapper;
};
