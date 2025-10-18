import { apiClient } from '~/services';

export type FileUploadResponse = {
  filePath: string;
};

export const FilesApi = {
  upload(data: FormData) {
    return apiClient.post<FileUploadResponse>('/files', {
      payload: data,
    });
  },
};
