import { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseCode } from 'src/common';
import { ChapterKeysService } from 'src/modules/chapter-keys/chapter-keys.service';
import { CreateChapterKeyPayload } from 'src/modules/chapter-keys/schemas';

export class ChapterKeysController {
  chapterKeysService!: ChapterKeysService;

  async findListOptions(_: FastifyRequest, reply: FastifyReply) {
    const data = await this.chapterKeysService.getListOptions();

    return reply.status(ResponseCode.OK).send(data);
  }

  async addKey(
    request: FastifyRequest<{ Body: CreateChapterKeyPayload }>,
    reply: FastifyReply,
  ) {
    const data = await this.chapterKeysService.addKey(request.body);

    return reply.status(ResponseCode.CREATED).send(data);
  }
}
