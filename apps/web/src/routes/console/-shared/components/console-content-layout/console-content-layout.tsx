import { type PropsWithChildren } from 'react';
import styles from './console-content-layout.module.css';
import { ConsoleTitle } from '~/routes/console/-shared/components/console-content-layout/components';
import { BackLink } from '~/shared';
import type { FileRoutesByTo } from '~/routeTree.gen';

type ConsoleContentLayoutProps = {
  title: string;
  backPath?: keyof FileRoutesByTo;
};

export const ConsoleContentLayout = ({
  children,
  title,
  backPath,
}: PropsWithChildren<ConsoleContentLayoutProps>) => {
  return (
    <div className={styles.content_layout}>
      {backPath && <BackLink path={backPath}>Back</BackLink>}
      <ConsoleTitle>{title}</ConsoleTitle>
      {children}
    </div>
  );
};
