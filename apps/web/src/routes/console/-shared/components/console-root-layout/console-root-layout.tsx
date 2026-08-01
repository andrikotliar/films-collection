import styles from './console-root-layout.module.css';
import { ConsoleMenu } from './components';
import { Outlet, useLocation, useMatches } from '@tanstack/react-router';
import { IconLink, PageTitle } from '~/shared';
import { ArrowLeftIcon } from 'lucide-react';

export const ConsoleRootLayout = () => {
  const matches = useMatches();
  const location = useLocation();
  const routeMatch = matches.at(-1);

  return (
    <div className={styles.console_layout}>
      <div className={styles.console_main}>
        <div className={styles.console_header}>
          {routeMatch?.staticData.backPath && (
            <IconLink
              icon={<ArrowLeftIcon />}
              to={routeMatch.staticData.backPath}
              search={routeMatch?.staticData.preserveSearch ? location.search : undefined}
            />
          )}
          <PageTitle>{routeMatch?.staticData.title ?? 'Console'}</PageTitle>
        </div>
        <div className={styles.console_content}>
          <Outlet />
        </div>
      </div>
      {location.pathname !== '/console' && <ConsoleMenu />}
    </div>
  );
};
