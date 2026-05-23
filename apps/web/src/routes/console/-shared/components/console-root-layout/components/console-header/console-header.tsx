import styles from './console-header.module.css';
import { ArrowLeftIcon, LayoutGridIcon } from 'lucide-react';
import clsx from 'clsx';
import {
  Button,
  consoleMenuConfig,
  defineCssProperties,
  IconLink,
  PageTitle,
  PopupMenu,
  useSearchContext,
} from '~/shared';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useMatches } from '@tanstack/react-router';

const menuItems = Object.values(consoleMenuConfig);

export const ConsoleHeader = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const matches = useMatches();
  const { getSearchValue } = useSearchContext();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const routeMatch = matches.at(-1);

  return (
    <div className={styles.console_header}>
      <div className={styles.title_column}>
        {routeMatch?.staticData.backPath && (
          <IconLink
            icon={<ArrowLeftIcon />}
            to={routeMatch.staticData.backPath}
            search={getSearchValue(routeMatch.staticData.backPath)}
          />
        )}
        <PageTitle>{routeMatch?.staticData.title ?? 'Console'}</PageTitle>
      </div>
      {location.pathname !== '/console' && (
        <Button
          icon={
            <LayoutGridIcon
              className={clsx(styles.menu_icon, {
                [styles.menu_icon_collapsed]: !isMenuOpen,
              })}
              size={20}
            />
          }
          variant="ghost"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          ref={buttonRef}
        />
      )}
      <PopupMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={buttonRef}
        menuMargin={20}
        positionState="fixed"
      >
        <div className={styles.console_menu}>
          {menuItems.map((item) => {
            if (item.type === 'button') {
              return (
                <button
                  className={styles.console_link}
                  style={defineCssProperties({
                    '--console-float-menu-color': `var(--${item.color})`,
                  })}
                  onClick={item.action}
                  key={item.id}
                >
                  {item.icon}
                  {item.title}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.route}
                className={styles.console_link}
                style={defineCssProperties({
                  '--console-float-menu-color': `var(--${item.color})`,
                })}
                search={'search' in item ? item.search : undefined}
              >
                {item.icon}
                {item.title}
              </Link>
            );
          })}
        </div>
      </PopupMenu>
    </div>
  );
};
