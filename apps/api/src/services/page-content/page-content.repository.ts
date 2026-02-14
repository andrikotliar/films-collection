import type { Deps } from '~/shared';
import {
  getSkipValue,
  PAGE_LIMITS,
  type CreatePageContentInput,
  type GetPageContentListQueries,
  type UpdatePageContentInput,
} from '@films-collection/shared';

export class PageContentRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {}

  getPageContent(id: number) {
    return this.deps.databaseService.pageContent.findUnique({
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
    const list = await this.deps.databaseService.pageContent.findMany({
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

    const count = await this.deps.databaseService.pageContent.count();

    return {
      list,
      count,
    };
  }

  getPageContentByKey(key: string) {
    return this.deps.databaseService.pageContent.findFirst({
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
    return this.deps.databaseService.pageContent.create({
      data: input,
    });
  }

  updatePageContent(id: number, input: UpdatePageContentInput) {
    return this.deps.databaseService.pageContent.update({
      where: {
        id,
      },
      data: input,
    });
  }

  deletePageContent(id: number) {
    return this.deps.databaseService.pageContent.delete({
      where: { id },
    });
  }
}
