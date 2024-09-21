import { HttpMethod } from '@/enums';

interface IFetchOptions extends RequestInit {
  queryParams?: {
    [key: string]: any;
  };
}

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

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
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
      throw new Error(error);
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
    options?: Pick<IFetchOptions, 'body' | 'queryParams'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: HttpMethod.POST,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
  }

  async patch<T = unknown>(
    path: string,
    options?: Pick<IFetchOptions, 'body' | 'queryParams'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: HttpMethod.PATCH,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
  }

  async put<T = unknown>(
    path: string,
    options?: Pick<IFetchOptions, 'body' | 'queryParams'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: HttpMethod.PUT,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
  }

  async delete<T = unknown>(
    path: string,
    options?: Pick<IFetchOptions, 'body' | 'queryParams'>,
  ) {
    return await this.request<T>(path, {
      ...options,
      method: HttpMethod.DELETE,
      body: options?.body ? JSON.stringify(options.body) : undefined,
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

    console.log(queryString);

    return `${path}?${queryString}`;
  }
}

const apiClient = new ApiClient('/api');

export { apiClient };
