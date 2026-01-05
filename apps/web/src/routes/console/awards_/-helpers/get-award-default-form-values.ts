import { getEmptyFormValues, type api, type ApiResponse } from '~/shared';

export const getFormDefaultValues = (data: ApiResponse<typeof api.awards.get> | null) => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      nominations: data.nominations,
    };
  }

  return getEmptyFormValues({
    title: '',
    description: null,
    nominations: [],
  });
};
