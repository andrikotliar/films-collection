import { PrismaClient } from '@prisma/client';
import { DEFAULT_PAGINATION_LIMIT } from 'src/common';
import {
  CreatePageContentPayload,
  GetListQueries,
  UpdatePostPayload,
} from 'src/modules/page-content/schemas';

export class PageContentRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  getPageContent(id: number) {
    return this.databaseClient.pageContent.findUnique({
      select: {
        id: true,
        title: true,
        content: true,
        pageUrl: true,
      },
      where: {
        id,
      },
    });
  }

  async getList({ skip }: GetListQueries) {
    const list = await this.databaseClient.pageContent.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        pageUrl: true,
      },
      take: DEFAULT_PAGINATION_LIMIT,
      skip,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const count = await this.databaseClient.pageContent.count();

    return {
      list,
      count,
    };
  }

  getPageContentByPageUrl(url: string) {
    return this.databaseClient.pageContent.findFirst({
      select: {
        id: true,
        content: true,
        title: true,
      },
      where: {
        pageUrl: url,
      },
    });
  }

  createPageContent(input: CreatePageContentPayload) {
    return this.databaseClient.pageContent.create({
      data: input,
    });
  }

  updatePageContent(id: number, input: UpdatePostPayload) {
    return this.databaseClient.pageContent.update({
      where: {
        id,
      },
      data: input,
    });
  }

  deletePageContent(id: number) {
    return this.databaseClient.pageContent.delete({
      where: { id },
    });
  }
}
