import { env, APP_TITLE } from '@/common';
import { useEffect } from 'react';

export const getTitle = (pageTitle?: string) => {
  if (env.titlePrefix) {
    return `${env.titlePrefix} - ${APP_TITLE}`;
  }

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
