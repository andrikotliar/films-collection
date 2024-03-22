import { APP_TITLE } from '@/common/constants';
import { useEffect } from 'react';

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - ${APP_TITLE}`;
    } else {
      document.title = APP_TITLE;
    }
  }, [title]);
};

export { useDocumentTitle };
