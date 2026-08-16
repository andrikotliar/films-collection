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
} from '~/shared';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useMatches } from '@tanstack/react-router';
import { colors } from '~/shared/configs/css-colors';

const menuItems = Object.values(consoleMenuConfig);

export const ConsoleHeader = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const matches = useMatches();

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
            search={routeMatch?.staticData.preserveSearch ? location.search : undefined}
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
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.route}
              className={styles.console_link}
              style={defineCssProperties({
                '--console-float-menu-color': item.color
                  ? colors[item.color]
                  : colors.colorGrayPrimary,
              })}
              search={'search' in item ? item.search : undefined}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </PopupMenu>
    </div>
  );
};
