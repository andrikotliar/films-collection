import sanitize from 'sanitize-html';
import {
  SANITIZE_CONFIG,
  PAGE_LIMITS,
  type CreateArticleInput,
  type ArticlesListQueries,
  type UpdateArticleInput,
  type ArticlesListResponse,
} from '@films-collection/shared';
import type { Deps } from '~/shared/types/deps.js';
import { throwIfNotFound } from '~/shared/helpers/throw-if-not-found.js';

const MAX_WORDS_LIMIT = 30;

export class ArticlesService {
  constructor(private readonly deps: Deps<'ArticlesRepository'>) {}

  get(id: number) {
    return throwIfNotFound(this.deps.ArticlesRepository.get(id));
  }

  getBySlug(key: string) {
    return throwIfNotFound(this.deps.ArticlesRepository.getBySlug(key));
  }

  create(input: CreateArticleInput) {
    const sanitizedContent = sanitize(input.content, SANITIZE_CONFIG);

    return throwIfNotFound(
      this.deps.ArticlesRepository.create({
        ...input,
        content: sanitizedContent,
      }),
    );
  }

  update(id: number, input: UpdateArticleInput) {
    if (input.content) {
      const sanitizedContent = sanitize(input.content, SANITIZE_CONFIG);

      return throwIfNotFound(
        this.deps.ArticlesRepository.update(id, {
          ...input,
          content: sanitizedContent,
        }),
      );
    }

    return throwIfNotFound(this.deps.ArticlesRepository.update(id, input));
  }

  async getList(queries: ArticlesListQueries): Promise<ArticlesListResponse> {
    const data = await this.deps.ArticlesRepository.list(queries);

    if (!data.list.length) {
      return { list: [], total: 0, pageLimit: PAGE_LIMITS.default };
    }

    const mappedList = data.list.map((article) => {
      const words = article.content.split(' ').slice(0, MAX_WORDS_LIMIT);
      const shouldContainDots = words.length === MAX_WORDS_LIMIT;

      if (shouldContainDots) {
        words.push('...');
      }

      return {
        ...article,
        shortContent: words.join(' '),
      };
    });

    return { list: mappedList, total: data.total, pageLimit: PAGE_LIMITS.default };
  }

  async delete(id: number) {
    await this.deps.ArticlesRepository.delete(id);
  }
}
