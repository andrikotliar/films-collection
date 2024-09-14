import { APP_TITLE } from '@/constants';
import { useEffect } from 'react';

const getTitle = (pageTitle?: string) => {
  const prefix = import.meta.env.VITE_APP_TITLE_PREFIX;

  if (import.meta.env.VITE_APP_TITLE_PREFIX) {
    return `${prefix} - ${APP_TITLE}`;
  }

  if (pageTitle) {
    return `${pageTitle} - ${APP_TITLE}`;
  }

  return APP_TITLE;
};

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = getTitle(title);
  }, [title]);
};

export { useDocumentTitle };
