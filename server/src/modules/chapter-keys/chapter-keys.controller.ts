import { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseCode } from 'src/common';
import { ChapterKeysService } from 'src/modules/chapter-keys/chapter-keys.service';

export class ChapterKeysController {
  chapterKeysService!: ChapterKeysService;

  async findListOptions(_: FastifyRequest, reply: FastifyReply) {
    const result = await this.chapterKeysService.getListOptions();

    return reply.status(ResponseCode.OK).send(result);
  }
}
