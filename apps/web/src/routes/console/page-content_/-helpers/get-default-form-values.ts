import { formDefaultValues } from '../-configs';
import { type PageContent } from '@/common';

export const getDefaultFormValues = (data: PageContent | null) => {
  if (data) {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      pageKey: data.pageKey,
    };
  }

  return formDefaultValues;
};
