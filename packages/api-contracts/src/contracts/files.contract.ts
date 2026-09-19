import { UploadFileResponseSchema, UploadFilePayloadSchema } from '@hobbies-collection/shared';
import { createContract } from '../helpers/index.js';

export const filesContract = {
  getUploadUrl: createContract({
    method: 'POST',
    url: 'upload/url',
    schema: {
      body: UploadFilePayloadSchema,
      response: UploadFileResponseSchema,
    },
  }),
};
