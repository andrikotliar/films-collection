import { apiClient } from '@/services';

export const FilesApi = {
  upload(data: FormData) {
    return apiClient.post('/files', {
      payload: data,
    });
  },
};
