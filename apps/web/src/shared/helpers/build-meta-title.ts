import { APP_TITLE } from '~/shared/constants';

export const buildMetaTitle = (pageTitle: string) => {
  return `${pageTitle} - ${APP_TITLE}`;
};
