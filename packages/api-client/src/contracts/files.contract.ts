import { UploadFileResponseSchema, UploadFilePayloadSchema } from '@films-collection/shared';
import { defineContracts } from '~/helpers/index.js';

export const filesContract = defineContracts('files', {
  getUploadUrl: {
    method: 'POST',
    url: 'upload/url',
    schema: {
      body: UploadFilePayloadSchema,
      response: UploadFileResponseSchema,
    },
  },
});
