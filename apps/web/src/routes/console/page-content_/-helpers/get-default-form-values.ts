import { getEmptyFormValues, type api, type ApiResponse } from '~/shared';

export const getDefaultFormValues = (data: ApiResponse<typeof api.pageContent.get> | null) => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      pageKey: data.pageKey,
    };
  }

  return getEmptyFormValues({
    title: '',
    pageKey: '',
    content: '',
  });
};
