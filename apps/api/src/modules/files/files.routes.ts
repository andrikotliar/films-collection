import { BadRequestException, defineRoute, useRoutes } from 'src/common';
import { UploadPayload } from './types';
import { files } from 'src/modules/files/files.module';

export const filesRoutes = useRoutes('files', [
  defineRoute({
    method: 'POST',
    url: '/',
    isPrivate: true,
    handler: async ({ request }) => {
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

      const result = await files.upload(data as UploadPayload);

      return result;
    },
  }),
]);
