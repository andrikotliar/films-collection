import { ErrorParams } from '~/common/types';

export class BadRequestException extends Error {
  public code: ErrorParams['code'];
  public statusCode: number;

  constructor({ code = 'BAD_REQUEST', message = 'Bad Request' }: ErrorParams = {}) {
    super(message);
    this.code = code;
    this.statusCode = 400;
  }
}
