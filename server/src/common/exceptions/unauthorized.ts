import { ErrorParams } from 'src/common/types';

export class UnauthorizedException extends Error {
  public code: ErrorParams['code'];
  public statusCode: number;

  constructor({
    code = 'UNAUTHENTICATED',
    message = 'Unauthorized',
  }: ErrorParams = {}) {
    super(message);

    this.code = code;
    this.statusCode = 401;
  }
}
