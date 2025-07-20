import { apiClient } from '@/services';
import type { PageContent, PageContentListItem } from '@/common';

export type PageContentListFilters = {
  skip: number;
};

export type PageContentListResponse = {
  list: PageContentListItem[];
  count: number;
};

export const PageContentApi = {
  getPageContentById(id: number) {
    return apiClient.get<PageContent>('/page-content/:id', { params: { id } });
  },

  getPageContentByKey(key: string) {
    return apiClient.get<PageContent>('/page-content/page/:key', {
      params: { key },
    });
  },

  getList(filters: PageContentListFilters) {
    return apiClient.get<PageContentListResponse>('/page-content/admin', {
      queryParams: filters,
    });
  },

  createPageContent(
    payload: Pick<PageContent, 'title' | 'content' | 'pageKey'>,
  ) {
    return apiClient.post('/page-content', {
      payload,
    });
  },

  deletePageContent(id: number) {
    return apiClient.delete('/page-content/:id', {
      params: { id },
    });
  },

  updatePageContent(id: number, payload: Partial<PageContent>) {
    return apiClient.patch('/page-content/:id', {
      payload,
      params: { id },
    });
  },
};
