import sanitize from 'sanitize-html';
import { listResponse, throwIfNotFound, type Deps } from '~/shared/index.js';
import {
  SANITIZE_CONFIG,
  PAGE_LIMITS,
  type CreateArticleInput,
  type ArticlesListQueries,
  type UpdateArticleInput,
} from '@films-collection/shared';

const MAX_WORDS_LIMIT = 30;

export class ArticlesService {
  constructor(private readonly deps: Deps<'articlesRepository'>) {}

  get(id: number) {
    return throwIfNotFound(this.deps.articlesRepository.get(id));
  }

  getBySlug(key: string) {
    return throwIfNotFound(this.deps.articlesRepository.getBySlug(key));
  }

  create(input: CreateArticleInput) {
    const sanitizedContent = sanitize(input.content, SANITIZE_CONFIG);

    return throwIfNotFound(
      this.deps.articlesRepository.create({
        ...input,
        content: sanitizedContent,
      }),
    );
  }

  update(id: number, input: UpdateArticleInput) {
    if (input.content) {
      const sanitizedContent = sanitize(input.content, SANITIZE_CONFIG);

      return throwIfNotFound(
        this.deps.articlesRepository.update(id, {
          ...input,
          content: sanitizedContent,
        }),
      );
    }

    return throwIfNotFound(this.deps.articlesRepository.update(id, input));
  }

  async getList(queries: ArticlesListQueries) {
    const data = await this.deps.articlesRepository.list(queries);

    if (!data.list.length) {
      return listResponse({ list: [], total: 0, pageLimit: PAGE_LIMITS.default });
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

    return listResponse({ list: mappedList, total: data.total, pageLimit: PAGE_LIMITS.default });
  }

  async delete(id: number) {
    await this.deps.articlesRepository.delete(id);
  }
}
