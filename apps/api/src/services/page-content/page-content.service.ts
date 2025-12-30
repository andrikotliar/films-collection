import sanitize from 'sanitize-html';
import type { PageContentRepository } from './page-content.repository';
import { type Deps } from '~/shared';
import {
  ALLOWED_HTML_TAGS,
  type CreatePageContentInput,
  type GetPageContentListQueries,
  type UpdatePageContentInput,
} from '@films-collection/shared';

const MAX_WORDS_LIMIT = 30;

export class PageContentService {
  private readonly pageContentRepository: PageContentRepository;

  constructor(deps: Deps<'pageContentRepository'>) {
    this.pageContentRepository = deps.pageContentRepository;
  }

  getPageContent(id: number) {
    return this.pageContentRepository.getPageContent(id);
  }

  getPageContentByKey(key: string) {
    return this.pageContentRepository.getPageContentByKey(key);
  }

  createPageContent(input: CreatePageContentInput) {
    const sanitizedContent = sanitize(input.content, {
      allowedTags: ALLOWED_HTML_TAGS,
      allowedAttributes: {},
    });

    return this.pageContentRepository.createPageContent({
      ...input,
      content: sanitizedContent,
    });
  }

  updatePageContent(id: number, input: UpdatePageContentInput) {
    if (input.content) {
      const sanitizedContent = sanitize(input.content, {
        allowedTags: ALLOWED_HTML_TAGS,
        allowedAttributes: {},
      });

      return this.pageContentRepository.updatePageContent(id, {
        ...input,
        content: sanitizedContent,
      });
    }

    return this.pageContentRepository.updatePageContent(id, input);
  }

  async getList(queries: GetPageContentListQueries) {
    const data = await this.pageContentRepository.getList(queries);

    if (!data.list.length) {
      return {
        list: [],
        count: 0,
      };
    }

    const mappedList = data.list.map((pageContent) => {
      const words = pageContent.content.split(' ').slice(0, MAX_WORDS_LIMIT);
      const shouldContainDots = words.length === MAX_WORDS_LIMIT;

      if (shouldContainDots) {
        words.push('...');
      }

      return {
        ...pageContent,
        shortContent: words.join(' '),
      };
    });

    return {
      list: mappedList,
      count: data.count,
    };
  }

  deletePageContent(id: number) {
    return this.pageContentRepository.deletePageContent(id);
  }
}
