import crypto from 'crypto';
import type { FastifyRequest } from 'fastify';
import { UnauthorizedException } from '~/shared/exceptions';

const HEADER_SIGNATURE = 'x-signature';
const HEADER_TIMESTAMP = 'x-timestamp';
const SIGNATURE_MAX_AGE = 5 * 60 * 1000;

export const validateGetSignature = async (request: FastifyRequest): Promise<void> => {
  const signature = request.headers[HEADER_SIGNATURE] as string | undefined;
  const timestamp = request.headers[HEADER_TIMESTAMP] as string | undefined;

  if (!signature || !timestamp) {
    throw new UnauthorizedException({
      code: 'MISSING_SIGNATURE',
      message: 'Missing signature headers',
    });
  }

  const tsNumber = Number(timestamp);
  if (!Number.isFinite(tsNumber)) {
    throw new UnauthorizedException({
      code: 'INVALID_TIMESTAMP',
      message: 'Invalid timestamp',
    });
  }

  const now = Date.now();
  const diff = Math.abs(now - tsNumber);

  if (diff > SIGNATURE_MAX_AGE) {
    throw new UnauthorizedException({
      code: 'REQUEST_EXPIRED',
      message: 'Request expired',
    });
  }

  const method = request.method.toUpperCase();
  const path = request.url;

  const payload = `${method}.${path}.${timestamp}`;

  const signatureSecret = request.server.container
    .resolve('configService')
    .getKey('SIGNATURE_SECRET');

  const expectedSignature = crypto
    .createHmac('sha256', signatureSecret)
    .update(payload)
    .digest('hex');

  const valid =
    signature.length === expectedSignature.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));

  if (!valid) {
    throw new UnauthorizedException({
      code: 'INVALID_SIGNATURE',
      message: 'Invalid signature',
    });
  }
};
