import { FastifyReply, FastifyRequest } from 'fastify';
import { BadRequestException, ResponseCode } from 'src/common';
import { FilesService } from './files.service';
import { UploadPayload } from './types';

export class FilesController {
  private readonly filesService!: FilesService;

  async uploadFile(request: FastifyRequest, reply: FastifyReply) {
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

    const result = await this.filesService.upload(data as UploadPayload);

    return reply.status(ResponseCode.OK).send(result);
  }
}
