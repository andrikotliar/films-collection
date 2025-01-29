import { FastifyServerOptions } from 'fastify';
import { env } from './env';

export const loggerOptions: FastifyServerOptions['logger'] = {
  enabled: env.NODE_ENV === 'development',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
  serializers: {
    req(request) {
      return {
        url: request.url,
        method: request.method,
        host: request.host,
      };
    },
  },
};
