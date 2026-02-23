import { getFirstValue, type Deps } from '~/shared';
import {
  getSkipValue,
  PAGE_LIMITS,
  type CreatePageContentInput,
  type GetPageContentListQueries,
  type UpdatePageContentInput,
} from '@films-collection/shared';
import { pageContent } from '~/database/schema';
import { count, desc, eq } from 'drizzle-orm';

export class PageContentRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  getPageContent(id: number) {
    return getFirstValue(
      this.deps.db
        .select({
          id: pageContent.id,
          title: pageContent.title,
          content: pageContent.content,
          pageKey: pageContent.pageKey,
        })
        .from(pageContent)
        .where(eq(pageContent.id, id)),
    );
  }

  async getList({ pageIndex }: GetPageContentListQueries) {
    const list = await this.deps.db
      .select({
        id: pageContent.id,
        title: pageContent.title,
        content: pageContent.content,
        pageKey: pageContent.pageKey,
      })
      .from(pageContent)
      .orderBy(desc(pageContent.updatedAt))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', pageIndex));

    const countResult = await getFirstValue(
      this.deps.db.select({ count: count() }).from(pageContent),
    );

    return {
      list,
      count: countResult?.count ?? 0,
    };
  }

  getPageContentByKey(key: string) {
    return getFirstValue(
      this.deps.db
        .select({
          id: pageContent.id,
          title: pageContent.title,
          content: pageContent.content,
        })
        .from(pageContent)
        .where(eq(pageContent.pageKey, key)),
    );
  }

  createPageContent(input: CreatePageContentInput) {
    return getFirstValue(this.deps.db.insert(pageContent).values(input).returning());
  }

  updatePageContent(id: number, input: UpdatePageContentInput) {
    return getFirstValue(
      this.deps.db.update(pageContent).set(input).where(eq(pageContent.id, id)).returning(),
    );
  }

  async deletePageContent(id: number) {
    await this.deps.db.delete(pageContent).where(eq(pageContent.id, id));
  }
}
