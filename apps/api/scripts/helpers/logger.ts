import { styleText } from 'node:util';

const loggerWrapper = (
  type: 'log' | 'error',
  message: string,
  color: Parameters<typeof styleText>[0],
) => {
  // eslint-disable-next-line
  console[type](styleText(color, message));
};

export const logger = {
  info: (message: string) => loggerWrapper('log', message, 'cyan'),
  error: (message: string) => loggerWrapper('error', message, 'redBright'),
  success: (message: string) => loggerWrapper('log', message, 'greenBright'),
};
