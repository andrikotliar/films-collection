import { apiClient } from '@/services';
import { Post, PostsListItem } from '@/types';

export type PostsListFilters = {
  skip: number;
};

export const PostsApi = {
  getPostById(id: number) {
    return apiClient.get<Post>('/posts/:id', { params: { id } });
  },

  getPostByKey(key: string) {
    return apiClient.get<Post>('/posts/page/:key', { params: { key } });
  },

  getList(filters: PostsListFilters) {
    return apiClient.get<PostsListItem[]>('/posts/admin', {
      queryParams: filters,
    });
  },

  createPost(payload: Pick<Post, 'title' | 'content' | 'pageKey'>) {
    return apiClient.post('/posts', {
      payload,
    });
  },

  deletePost(id: number) {
    return apiClient.delete('/posts/:id', {
      params: { id },
    });
  },

  updatePost(id: number, payload: Partial<Post>) {
    return apiClient.patch('/posts/:id', {
      payload,
      params: { id },
    });
  },
};
