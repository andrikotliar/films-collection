import { apiClient, type PageContent, type PageContentListItem } from '~/shared';

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

  create(payload: Pick<PageContent, 'title' | 'content' | 'pageKey'>) {
    return apiClient.post('/page-content', {
      payload,
    });
  },

  delete(id: number) {
    return apiClient.delete('/page-content/:id', {
      params: { id },
    });
  },

  update(id: number, payload: Partial<PageContent>) {
    return apiClient.patch('/page-content/:id', {
      payload,
      params: { id },
    });
  },
};
