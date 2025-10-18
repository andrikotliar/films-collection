import { ErrorParams } from '~/common';

export class JwtInstanceException extends Error {
  public code: ErrorParams['code'];
  public statusCode: number;

  constructor() {
    super('JWT instance is not defined');

    this.code = 'INTERNAL_SERVER_ERROR';
    this.statusCode = 500;
  }
}
