import sanitize from 'sanitize-html';
import { PageContentRepository } from './page-content.repository';
import {
  CreatePageContentPayload,
  GetListQueries,
  UpdatePostPayload,
} from './schemas';
import { ALLOWED_HTML_TAGS } from 'src/common';

const MAX_WORDS_LIMIT = 30;

export class PageContentService {
  constructor(private readonly pageContentRepository: PageContentRepository) {}

  getPageContent(id: number) {
    return this.pageContentRepository.getPageContent(id);
  }

  getPageContentByKey(key: string) {
    return this.pageContentRepository.getPageContentByKey(key);
  }

  createPageContent(input: CreatePageContentPayload) {
    const sanitizedContent = sanitize(input.content, {
      allowedTags: ALLOWED_HTML_TAGS,
      allowedAttributes: {},
    });

    return this.pageContentRepository.createPageContent({
      ...input,
      content: sanitizedContent,
    });
  }

  updatePageContent(id: number, input: UpdatePostPayload) {
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

  async getList(queries: GetListQueries) {
    const data = await this.pageContentRepository.getList(queries);

    if (!data.list.length) {
      return data;
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
