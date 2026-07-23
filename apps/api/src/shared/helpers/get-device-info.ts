import { UAParser } from 'ua-parser-js';

export const getDeviceInfo = (userAgent?: string) => {
  const parser = new UAParser(userAgent);

  return parser.getResult();
};
