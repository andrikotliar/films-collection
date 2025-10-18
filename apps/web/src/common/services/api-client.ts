import { type ApiEndpoint } from '~/common';
import { LocalStorage } from '~/common/services/local-storage';
import { redirect } from '@tanstack/react-router';

interface IFetchOptions extends RequestInit {
  queryParams?: Record<string, any>;
  payload?: Record<string, any>;
  params?: Record<string, string | number>;
}

type ApiClientOptions = {
  baseUrl: string;
};

const TOKEN_ERRORS = ['TOKEN_EXPIRED', 'TOKEN_MISSED'];

export class HttpError extends Error {
  readonly status: number;
  readonly message: string;
  readonly response: any;

  constructor(status: number, message: string, response: any) {
    super(message);

    this.status = status;
    this.message = message;
    this.response = response;
  }
}

export class ApiClient {
  private baseUrl: string;

  constructor(config: ApiClientOptions) {
    this.baseUrl = config.baseUrl;
  }

  async request<T = unknown>(path: ApiEndpoint, options?: IFetchOptions): Promise<T> {
    try {
      const internalOptions: IFetchOptions = {
        ...options,
        credentials: 'include',
      };

      internalOptions.headers = this.setHeaders(options);

      if (options?.payload) {
        internalOptions.body = this.getBody(options);
      }

      const pathWithParams = this.parseRouteParams(path, internalOptions.params);

      const parsedPath = this.parseQueryParams(pathWithParams, internalOptions.queryParams);

      const response = await fetch(`${this.baseUrl}${parsedPath}`, internalOptions);
      const result = await response.json();

      if (!response.ok) {
        throw new HttpError(response.status, response.statusText, result);
      }

      return result as Promise<T>;
    } catch (error: any) {
      if (error.response?.statusCode === 401) {
        try {
          if (!TOKEN_ERRORS.includes(error.response?.code)) {
            throw new HttpError(error.response.status, error.response.statusText, error.response);
          }

          await this.request('/auth/refresh', {
            method: 'POST',
          });

          return this.request(path, options);
        } catch (_error) {
          if (!window.location.pathname.includes('login')) {
            LocalStorage.removeItem('authenticated');
            throw redirect({ to: '/login' });
          }
        }
      }

      throw new HttpError(
        error.response?.statusCode,
        error.response?.message ?? 'Unknown error',
        error.response,
      );
    }
  }

  async get<T = unknown>(
    path: ApiEndpoint,
    options?: Pick<IFetchOptions, 'queryParams' | 'params'>,
  ) {
    return await this.request<T>(path, { method: 'GET', ...options });
  }

  async post<T = unknown>(
    path: ApiEndpoint,
    options?: Pick<IFetchOptions, 'payload' | 'queryParams' | 'params'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: 'POST',
    });
  }

  async patch<T = unknown>(
    path: ApiEndpoint,
    options?: Pick<IFetchOptions, 'payload' | 'queryParams' | 'params'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: 'PATCH',
    });
  }

  async put<T = unknown>(
    path: ApiEndpoint,
    options?: Pick<IFetchOptions, 'payload' | 'queryParams' | 'params'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: 'PUT',
    });
  }

  async delete<T = unknown>(
    path: ApiEndpoint,
    options?: Pick<IFetchOptions, 'payload' | 'queryParams' | 'params'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: 'DELETE',
    });
  }

  private parseQueryParams(path: string, queryParams: IFetchOptions['queryParams']) {
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
  }

  private parseRouteParams(path: string, params: IFetchOptions['params']) {
    if (!params) {
      return path;
    }

    return path.replace(/:([a-zA-Z]+)/g, (_, key) => {
      if (key in params) {
        return params[key].toString();
      }

      throw new Error(`Missing value for parameter: ${key}`);
    });
  }

  private setHeaders(options?: Pick<IFetchOptions, 'payload' | 'queryParams' | 'params'>) {
    if (!options?.payload || options.payload instanceof FormData) {
      return undefined;
    }

    return {
      'Content-Type': 'application/json',
    };
  }

  private getBody(options: IFetchOptions) {
    if (!options.payload) {
      return undefined;
    }

    if (options.payload instanceof FormData) {
      return options.payload;
    }

    return JSON.stringify(options.payload);
  }
}

export const apiClient = new ApiClient({
  baseUrl: '/api',
});
