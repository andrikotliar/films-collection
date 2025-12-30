import type { DatabaseClient, Deps } from '~/shared';
import {
  getSkipValue,
  PAGE_LIMITS,
  type CreatePageContentInput,
  type GetPageContentListQueries,
  type UpdatePageContentInput,
} from '@films-collection/shared';

export class PageContentRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

  getPageContent(id: number) {
    return this.databaseClient.pageContent.findUnique({
      select: {
        id: true,
        title: true,
        content: true,
        pageKey: true,
      },
      where: {
        id,
      },
    });
  }

  async getList({ pageIndex }: GetPageContentListQueries) {
    const list = await this.databaseClient.pageContent.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        pageKey: true,
      },
      take: PAGE_LIMITS.default,
      skip: getSkipValue('default', pageIndex),
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

  getPageContentByKey(key: string) {
    return this.databaseClient.pageContent.findFirst({
      select: {
        id: true,
        content: true,
        title: true,
      },
      where: {
        pageKey: key,
      },
    });
  }

  createPageContent(input: CreatePageContentInput) {
    return this.databaseClient.pageContent.create({
      data: input,
    });
  }

  updatePageContent(id: number, input: UpdatePageContentInput) {
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
