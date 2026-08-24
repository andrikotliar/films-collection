import {
  getSkipValue,
  PAGE_LIMITS,
  type CreateArticleInput,
  type ArticlesListQueries,
  type UpdateArticleInput,
} from '@films-collection/shared';
import { articles } from '~/database/schema.js';
import { count, desc, eq } from 'drizzle-orm';
import type { Deps } from '~/shared/types/dependencies.js';
import { getFirstValue } from '~/shared/helpers/get-first-value.js';

export class ArticlesRepository {
  constructor(private readonly deps: Deps<'Database'>) {}

  get(id: number) {
    return getFirstValue(
      this.deps.Database.select({
        id: articles.id,
        title: articles.title,
        content: articles.content,
        slug: articles.slug,
      })
        .from(articles)
        .where(eq(articles.id, id)),
    );
  }

  async list({ pageIndex }: ArticlesListQueries) {
    const list = await this.deps.Database.select({
      id: articles.id,
      title: articles.title,
      content: articles.content,
      slug: articles.slug,
    })
      .from(articles)
      .orderBy(desc(articles.updatedAt))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', pageIndex));

    const countResult = await getFirstValue(
      this.deps.Database.select({ count: count() }).from(articles),
    );

    return {
      list,
      total: countResult?.count ?? 0,
    };
  }

  getBySlug(slug: string) {
    return getFirstValue(
      this.deps.Database.select({
        id: articles.id,
        title: articles.title,
        content: articles.content,
      })
        .from(articles)
        .where(eq(articles.slug, slug)),
    );
  }

  create(input: CreateArticleInput) {
    return getFirstValue(this.deps.Database.insert(articles).values(input).returning());
  }

  update(id: number, input: UpdateArticleInput) {
    return getFirstValue(
      this.deps.Database.update(articles).set(input).where(eq(articles.id, id)).returning(),
    );
  }

  async delete(id: number) {
    await this.deps.Database.delete(articles).where(eq(articles.id, id));
  }
}
