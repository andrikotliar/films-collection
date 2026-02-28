import { BadRequestException, defineRoute, createRouter, validateAuth } from '~/shared';
import { CreateFileResponseSchema, type FileUploadPayload } from '@films-collection/shared';

export const filesRouter = createRouter([
  defineRoute({
    method: 'POST',
    url: '/',
    preHandler: [validateAuth],
    schema: {
      response: CreateFileResponseSchema,
    },
    handler: async ({ request, app }) => {
      if (!request.isMultipart()) {
        throw new BadRequestException({
          code: 'NOT_MULTIPART_DATA',
          message: 'Request is not multipart',
        });
      }

      const parts = request.parts();
      const data: Record<string, unknown> = {};

      for await (const part of parts) {
        if (part.type === 'file') {
          data.file = await part.toBuffer();
        } else {
          data[part.fieldname] = part.value;
        }
      }

      if (!data.destination || !data.title) {
        throw new BadRequestException({
          code: 'MISSING_PARAMS',
          message: 'Destination or title is missing',
        });
      }

      const result = await app.container
        .resolve('filesService')
        .upload(data as FileUploadPayload<Buffer>);

      return { data: result };
    },
  }),
]);
