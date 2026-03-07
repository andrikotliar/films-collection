export type ErrorResult = {
  ok: false;
  error: string;
};

export type SuccessResult<T> = {
  ok: true;
  data: T;
};

export type ApiResult<T> = SuccessResult<T> | ErrorResult;
