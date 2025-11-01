import { type PropsWithChildren } from 'react';
import styles from './styles.module.css';
import { ConsoleTitle } from '~/routes/console/-shared/components/console-content-layout/components';
import { BackLink } from '~/common';
import type { FileRoutesByTo } from '~/routeTree.gen';

type Props = {
  title: string;
  backPath?: keyof FileRoutesByTo;
  backPathTitle?: string;
};

const DEFAULT_BACK_LINK_TITLE = 'Back to list';

export const ConsoleContentLayout = ({
  children,
  title,
  backPath,
  backPathTitle = DEFAULT_BACK_LINK_TITLE,
}: PropsWithChildren<Props>) => {
  return (
    <div className={styles.content_layout}>
      {backPath && <BackLink path={backPath}>{backPathTitle}</BackLink>}
      <ConsoleTitle>{title}</ConsoleTitle>
      {children}
    </div>
  );
};
