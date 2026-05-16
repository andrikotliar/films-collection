import type { ErrorParams } from '~/shared/types/index.js';

export class NotFoundException extends Error {
  public code: ErrorParams['code'];
  public statusCode: number;

  constructor({ code = 'NOT_FOUND', message = 'Not found' }: ErrorParams = {}) {
    super(message);
    this.code = code;
    this.statusCode = 404;
  }
}
