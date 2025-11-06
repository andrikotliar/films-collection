import { APP_TITLE } from '~/lib';
import { useEffect } from 'react';

export const getTitle = (pageTitle?: string) => {
  if (pageTitle) {
    return `${pageTitle} - ${APP_TITLE}`;
  }

  return APP_TITLE;
};

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = getTitle(title);
  }, [title]);
};
