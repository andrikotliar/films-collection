import type { ErrorParams } from '~/shared/types/index.js';

export class UnauthorizedException extends Error {
  public code: ErrorParams['code'];
  public statusCode: number;

  constructor({ code = 'UNAUTHENTICATED', message = 'Unauthorized' }: ErrorParams = {}) {
    super(message);

    this.code = code;
    this.statusCode = 401;
  }
}
