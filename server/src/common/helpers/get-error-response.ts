import { STATUS_CODES } from 'http';
import { ResponseCode } from '../enums';

const getErrorResponse = (code: ResponseCode, message: string) => {
  return {
    error: STATUS_CODES[code],
    message,
    statusCode: code,
  };
};

export { getErrorResponse };
