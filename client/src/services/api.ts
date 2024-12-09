import { HttpMethod, LocalStorageKey } from '@/enums';
import { redirect } from '@tanstack/react-router';

interface IFetchOptions extends RequestInit {
  queryParams?: {
    [key: string]: any;
  };
  payload?: {
    [key: string]: any;
  };
}

type ApiClientOptions = {
  baseUrl: string;
  onErrorCallback?: (error: HttpError) => void;
};

class HttpError extends Error {
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

class ApiClient {
  #baseUrl: string;
  #onErrorCallback: ApiClientOptions['onErrorCallback'];

  constructor(config: ApiClientOptions) {
    this.#baseUrl = config.baseUrl;
    this.#onErrorCallback = config.onErrorCallback;
  }

  async request<T = unknown>(
    path: string,
    options?: IFetchOptions,
  ): Promise<T> {
    try {
      const internalOptions: IFetchOptions = {
        ...options,
        headers: {
          ...options?.headers,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      };

      const parsedPath = this.#parseQueryParams(
        path,
        internalOptions.queryParams,
      );
      const response = await fetch(
        `${this.#baseUrl}${parsedPath}`,
        internalOptions,
      );
      const result = await response.json();

      if (!response.ok) {
        throw new HttpError(response.status, response.statusText, result);
      }

      return result as Promise<T>;
    } catch (error: any) {
      if (this.#onErrorCallback) {
        this.#onErrorCallback(error);
      }

      throw error;
    }
  }

  async get<T = unknown>(
    path: string,
    queryParams?: IFetchOptions['queryParams'],
  ) {
    return await this.request<T>(path, { method: HttpMethod.GET, queryParams });
  }

  async post<T = unknown>(
    path: string,
    options?: Pick<IFetchOptions, 'payload' | 'queryParams'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: HttpMethod.POST,
      body: options?.payload ? JSON.stringify(options.payload) : undefined,
    });
  }

  async patch<T = unknown>(
    path: string,
    options?: Pick<IFetchOptions, 'payload' | 'queryParams'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: HttpMethod.PATCH,
      body: options?.payload ? JSON.stringify(options.payload) : undefined,
    });
  }

  async put<T = unknown>(
    path: string,
    options?: Pick<IFetchOptions, 'payload' | 'queryParams'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: HttpMethod.PUT,
      body: options?.payload ? JSON.stringify(options.payload) : undefined,
    });
  }

  async delete<T = unknown>(
    path: string,
    options?: Pick<IFetchOptions, 'payload' | 'queryParams'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: HttpMethod.DELETE,
      body: options?.payload ? JSON.stringify(options.payload) : undefined,
    });
  }

  #parseQueryParams(path: string, queryParams: IFetchOptions['queryParams']) {
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
}

const apiClient = new ApiClient({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  onErrorCallback: (error) => {
    if (error?.response?.statusCode === 401) {
      localStorage.removeItem(LocalStorageKey.IS_AUTHENTICATED);
      throw redirect({ to: '/login' });
    }
  },
});

export { apiClient, HttpError };
