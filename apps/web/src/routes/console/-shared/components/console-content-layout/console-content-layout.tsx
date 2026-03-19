import { ConsoleTitle } from '~/routes/console/-shared/components/console-content-layout/components';
import { BackLink } from '~/shared';
import type { FileRoutesByTo } from '~/routeTree.gen';
import styles from './console-content-layout.module.css';
import clsx from 'clsx';

type ConsoleContentLayoutProps = {
  title: string;
  backPath?: keyof FileRoutesByTo;
  children?: React.ReactNode;
  isFullWidth?: boolean;
};

export const ConsoleContentLayout = ({
  children,
  title,
  backPath,
  isFullWidth = false,
}: ConsoleContentLayoutProps) => {
  return (
    <div className={clsx(styles.console_content_layout, !isFullWidth && styles.container)}>
      {backPath && <BackLink path={backPath}>Back</BackLink>}
      <ConsoleTitle>{title}</ConsoleTitle>
      {children}
    </div>
  );
};
