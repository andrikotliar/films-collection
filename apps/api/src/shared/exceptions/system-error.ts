import type { ErrorParams } from '~/shared/types/error-params.js';

export class SystemErrorException extends Error {
  public code: ErrorParams['code'];
  public statusCode: number;

  constructor({
    code = 'INTERNAL_SERVER_ERROR',
    message = 'Something went wrong',
  }: ErrorParams = {}) {
    super(message);
    this.code = code;
    this.statusCode = 500;
  }
}
