import type { ErrorCode } from '@films-collection/shared';

export type ErrorParams = {
  code?: ErrorCode;
  message?: string;
};
