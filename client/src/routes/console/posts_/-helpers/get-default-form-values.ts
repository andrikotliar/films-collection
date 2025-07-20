import { formDefaultValues } from '@/routes/console/posts_/-configs/form-default-values';
import { Post } from '@/common';

export const getDefaultFormValues = (data: Post | null) => {
  if (data) {
    return {
      title: data.title,
      content: data.content,
      pageKey: data.pageKey,
    };
  }

  return formDefaultValues;
};
